/**
 * Security-focused tests for parser limits, path confinement, and hostile
 * content shapes that must fail safely.
 */
import { mkdir, symlink, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

import { z } from 'zod';
import { describe, expect, it } from 'vitest';

import { compileCommonloom } from '../src/index.js';
import { extractMarkdownReferences } from '../src/links.js';
import { validateMediaReference } from '../src/media.js';
import { parseMarkdown } from '../src/markdown.js';
import { makeTempDir } from './temp-dir.js';

describe('Commonloom parser and filesystem security', () => {
  it('rejects oversized frontmatter before schema validation', () => {
    const result = parseMarkdown({
      sourcePath: 'copy/oversized.md',
      markdown: ['---', `payload: ${'x'.repeat(70_000)}`, '---', '# Oversized'].join('\n'),
      frontmatterSchema: z.object({ payload: z.string() }),
    });

    expect(result.frontmatter).toBeUndefined();
    expect(result.diagnostics).toContainEqual(
      expect.objectContaining({
        code: 'FRONTMATTER_INVALID',
        severity: 'error',
        sourcePath: 'copy/oversized.md',
      }),
    );
  });

  it('does not pollute object prototypes from hostile frontmatter keys', () => {
    const result = parseMarkdown({
      sourcePath: 'copy/prototype.md',
      markdown: ['---', '__proto__:', '  polluted: true', '---', '# Prototype'].join('\n'),
      frontmatterSchema: z.unknown(),
    });

    expect(result.diagnostics).toEqual([]);
    expect(Object.prototype).not.toHaveProperty('polluted');
  });

  it('handles long wiki-link shaped input without runaway parsing', () => {
    const rawTarget = 'a'.repeat(10_000);
    const parsed = parseMarkdown({
      sourcePath: 'copy/long-link.md',
      markdown: ['---', 'title: Long Link', '---', '# Long Link', '', `[[${rawTarget}]]`].join('\n'),
      frontmatterSchema: z.object({ title: z.string() }),
    });
    const references = extractMarkdownReferences(parsed);

    expect(references.links).toContainEqual(
      expect.objectContaining({
        rawTarget,
        kind: 'wiki-link',
      }),
    );
  });

  it('rejects symlinked media that resolves outside the approved root', async () => {
    const fixture = await makeTempDir('commonloom-security-');

    try {
      const mediaRoot = join(fixture.root, 'media');
      const outsideRoot = join(fixture.root, 'outside');

      await mkdir(mediaRoot, { recursive: true });
      await mkdir(outsideRoot, { recursive: true });
      await writeFile(join(outsideRoot, 'escape.png'), 'fixture');
      await symlink(outsideRoot, join(mediaRoot, 'linked'), 'junction');

      const result = await validateMediaReference(
        { rawTarget: 'linked/escape.png', altText: 'Escape' },
        { mediaRoot, sourcePath: 'copy/page.md' },
      );

      expect(result.resolvedPath).toBeUndefined();
      expect(result.diagnostics).toContainEqual(
        expect.objectContaining({
          code: 'PATH_OUTSIDE_ROOT',
          severity: 'error',
        }),
      );
    } finally {
      await fixture.cleanup();
    }
  });

  it('rejects symlinked Markdown sources that resolve outside the copy root', async () => {
    const fixture = await makeTempDir('commonloom-markdown-root-');

    try {
      const copyRoot = join(fixture.root, 'copy');
      const mediaRoot = join(fixture.root, 'media');
      const outsideRoot = join(fixture.root, 'outside');

      await mkdir(copyRoot, { recursive: true });
      await mkdir(mediaRoot, { recursive: true });
      await mkdir(outsideRoot, { recursive: true });
      await writeFile(join(outsideRoot, 'escape.md'), '# Escape');
      await symlink(outsideRoot, join(copyRoot, 'linked'), 'junction');

      const result = await compileCommonloom({
        copyRoot,
        mediaRoot,
        manifests: [{ id: 'escape', sourcePath: 'linked/escape.md' }],
      });

      expect(result.documents).toEqual([]);
      expect(result.diagnostics).toContainEqual(
        expect.objectContaining({
          code: 'PATH_OUTSIDE_ROOT',
          severity: 'error',
        }),
      );
    } finally {
      await fixture.cleanup();
    }
  });

  it('enforces configured manifest and Markdown size limits', async () => {
    const fixture = await makeTempDir('commonloom-limits-');

    try {
      const copyRoot = join(fixture.root, 'copy');
      const mediaRoot = join(fixture.root, 'media');

      await mkdir(copyRoot, { recursive: true });
      await mkdir(mediaRoot, { recursive: true });
      await writeFile(join(copyRoot, 'large.md'), '# Large\n\nToo much text.');
      await writeFile(join(copyRoot, 'references.md'), '# References\n\n[One](/one)\n\n![Alt](missing.png)');
      await writeFile(join(copyRoot, 'rendered.md'), '# Rendered\n\nA rendered body that is too large.');

      const manifestLimitResult = await compileCommonloom({
        copyRoot,
        mediaRoot,
        manifests: [
          { id: 'one', sourcePath: 'large.md' },
          { id: 'two', sourcePath: 'large.md' },
        ],
        limits: { maxManifestEntries: 1 },
      });

      expect(manifestLimitResult).not.toHaveProperty('documents');
      expect(manifestLimitResult.diagnostics).toEqual([
        expect.objectContaining({
          code: 'MANIFEST_INVALID',
          severity: 'error',
        }),
      ]);

      await expect(
        compileCommonloom({
          copyRoot,
          mediaRoot,
          manifests: [{ id: 'large', sourcePath: 'large.md' }],
          limits: { maxMarkdownBytes: 8 },
        }),
      ).resolves.toEqual(
        expect.objectContaining({
          documents: [],
          diagnostics: [
            expect.objectContaining({
              code: 'MARKDOWN_INVALID',
              severity: 'error',
            }),
          ],
        }),
      );

      await expect(
        compileCommonloom({
          copyRoot,
          mediaRoot,
          manifests: [{ id: 'references', sourcePath: 'references.md' }],
          limits: { maxReferences: 1 },
        }),
      ).resolves.toEqual(
        expect.objectContaining({
          documents: [],
          diagnostics: expect.arrayContaining([
            expect.objectContaining({
              code: 'MARKDOWN_INVALID',
              severity: 'error',
              message: expect.stringContaining('references') as string,
            }),
          ]) as unknown,
        }),
      );

      await expect(
        compileCommonloom({
          copyRoot,
          mediaRoot,
          manifests: [{ id: 'rendered', sourcePath: 'rendered.md' }],
          limits: { maxRenderedHtmlBytes: 8 },
        }),
      ).resolves.toEqual(
        expect.objectContaining({
          documents: [],
          diagnostics: [
            expect.objectContaining({
              code: 'MARKDOWN_INVALID',
              severity: 'error',
              message: expect.stringContaining('Rendered HTML') as string,
            }),
          ],
        }),
      );
    } finally {
      await fixture.cleanup();
    }
  });
});
