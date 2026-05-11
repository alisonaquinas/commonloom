/**
 * Link extraction, wiki-link resolution, and media validation tests.
 *
 * These cases protect Commonloom's adapter boundary by exercising route
 * decisions through callbacks and validating media as local filesystem
 * references.
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';

import { z } from 'zod';
import { describe, expect, it } from 'vitest';

import {
  classifyLinkTarget,
  extractMarkdownReferences,
  resolveLinkReferences,
} from '../src/links.js';
import { validateMediaReference } from '../src/media.js';
import { parseMarkdown } from '../src/markdown.js';
import { resolveInsideRoot } from '../src/paths.js';

const frontmatterSchema = z.object({
  title: z.string(),
});

/** Build a Markdown fixture body under a stable source path for diagnostics. */
function parse(body: string) {
  return parseMarkdown({
    sourcePath: 'copy/page.md',
    markdown: ['---', 'title: Links', '---', '# Links', '', body].join('\n'),
    frontmatterSchema,
  });
}

describe('Commonloom link and media validation', () => {
  it('classifies every supported link target kind before resolution', () => {
    expect(classifyLinkTarget('https://example.com')).toEqual({
      rawTarget: 'https://example.com',
      resolvedTarget: 'https://example.com',
      kind: 'external',
    });
    expect(classifyLinkTarget('/guide/')).toEqual({
      rawTarget: '/guide/',
      resolvedTarget: '/guide/',
      kind: 'internal',
    });
    expect(classifyLinkTarget('#intro')).toEqual({
      rawTarget: '#intro',
      resolvedTarget: '#intro',
      kind: 'same-document',
    });
    expect(classifyLinkTarget('[[Quick Start|Read more]]')).toEqual({
      rawTarget: 'Quick Start',
      kind: 'wiki-link',
    });
    expect(classifyLinkTarget('mailto:hello@example.com')).toEqual({
      rawTarget: 'mailto:hello@example.com',
      kind: 'unsupported',
    });
  });

  it('extracts external links, internal links, wiki-links, and image references', () => {
    const parsed = parse(
      [
        '[Home](/)',
        '[Unified](https://unifiedjs.com/)',
        '[[Quick Start]]',
        '![Architecture diagram](diagram.png)',
      ].join('\n\n'),
    );
    const references = extractMarkdownReferences(parsed);

    expect(references.links).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ rawTarget: '/', kind: 'internal' }),
        expect.objectContaining({ rawTarget: 'https://unifiedjs.com/', kind: 'external' }),
        expect.objectContaining({ rawTarget: 'Quick Start', kind: 'wiki-link' }),
      ]),
    );
    expect(references.images).toContainEqual(
      expect.objectContaining({
        rawTarget: 'diagram.png',
        altText: 'Architecture diagram',
      }),
    );
  });

  it('reports unsupported link schemes as unresolved diagnostics', async () => {
    const result = await resolveLinkReferences(
      [{ rawTarget: 'mailto:hello@example.com', kind: 'unsupported' }],
      {
        resolveLink: () => ({
          kind: 'unsupported',
        }),
      },
    );

    expect(result.diagnostics).toContainEqual(
      expect.objectContaining({
        code: 'LINK_UNRESOLVED',
        severity: 'error',
      }),
    );
  });

  it('resolves wiki-links only through adapter callbacks', async () => {
    const parsed = parse('[[Quick Start]]\n\n[[Missing Page]]');
    const references = extractMarkdownReferences(parsed);
    const result = await resolveLinkReferences(references.links, {
      resolveLink: ({ rawTarget }) => ({
        kind: 'wiki-link',
        resolvedTarget: rawTarget === 'Quick Start' ? '/quickstart/' : undefined,
      }),
    });

    expect(result.links).toContainEqual(
      expect.objectContaining({
        rawTarget: 'Quick Start',
        resolvedTarget: '/quickstart/',
      }),
    );
    expect(result.diagnostics).toContainEqual(
      expect.objectContaining({
        code: 'LINK_UNRESOLVED',
        severity: 'error',
        sourcePath: 'copy/page.md',
      }),
    );
  });

  it('validates local media paths, missing files, traversal, and alt text', async () => {
    const mediaRoot = join(process.cwd(), 'node_modules', '.tmp-commonloom-media');
    await mkdir(mediaRoot, { recursive: true });
    await writeFile(join(mediaRoot, 'diagram.png'), 'fixture');

    await expect(
      validateMediaReference(
        { rawTarget: 'diagram.png', altText: 'Architecture diagram' },
        { mediaRoot, sourcePath: 'copy/page.md' },
      ),
    ).resolves.toEqual({ resolvedPath: join(mediaRoot, 'diagram.png'), diagnostics: [] });

    await expect(
      validateMediaReference(
        { rawTarget: 'missing.png', altText: 'Missing diagram' },
        { mediaRoot, sourcePath: 'copy/page.md' },
      ),
    ).resolves.toEqual(
      expect.objectContaining({
        diagnostics: [
          expect.objectContaining({
            code: 'MEDIA_UNRESOLVED',
            severity: 'error',
          }),
        ],
      }),
    );

    await expect(
      validateMediaReference(
        { rawTarget: '../outside.png', altText: 'Outside' },
        { mediaRoot, sourcePath: 'copy/page.md' },
      ),
    ).resolves.toEqual(
      expect.objectContaining({
        diagnostics: [
          expect.objectContaining({
            code: 'PATH_OUTSIDE_ROOT',
            severity: 'error',
          }),
        ],
      }),
    );

    await expect(
      validateMediaReference(
        { rawTarget: 'diagram.png', altText: '' },
        { mediaRoot, sourcePath: 'copy/page.md' },
      ),
    ).resolves.toEqual(
      expect.objectContaining({
        diagnostics: [
          expect.objectContaining({
            code: 'MEDIA_ALT_MISSING',
            severity: 'error',
          }),
        ],
      }),
    );
  });

  it('rejects unsupported media URI schemes before filesystem lookup', async () => {
    await expect(
      validateMediaReference(
        { rawTarget: 'https://example.com/diagram.png', altText: 'Remote diagram' },
        { mediaRoot: process.cwd(), sourcePath: 'copy/page.md' },
      ),
    ).resolves.toEqual({
      diagnostics: [
        expect.objectContaining({
          code: 'MEDIA_UNRESOLVED',
          severity: 'error',
        }),
      ],
    });
  });

  it('keeps absolute and encoded traversal targets inside approved path rules', () => {
    const mediaRoot = join(process.cwd(), 'node_modules', '.tmp-commonloom-media');
    const absoluteOutside = resolve(process.cwd(), 'outside.png');

    expect(
      resolveInsideRoot({
        root: mediaRoot,
        target: absoluteOutside,
        sourcePath: 'copy/page.md',
      }),
    ).toEqual(
      expect.objectContaining({
        diagnostics: [
          expect.objectContaining({
            code: 'PATH_OUTSIDE_ROOT',
            severity: 'error',
          }),
        ],
      }),
    );

    const encoded = resolveInsideRoot({
      root: mediaRoot,
      target: '%2e%2e/outside.png',
      sourcePath: 'copy/page.md',
    });

    expect(encoded.resolvedPath?.startsWith(mediaRoot)).toBe(true);
    expect(encoded.diagnostics).toEqual([]);
  });
});
