/**
 * Security-focused tests for parser limits, path confinement, and hostile
 * content shapes that must fail safely.
 */
import { mkdir, rm, symlink, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

import { z } from 'zod';
import { describe, expect, it } from 'vitest';

import { extractMarkdownReferences } from '../src/links.js';
import { validateMediaReference } from '../src/media.js';
import { parseMarkdown } from '../src/markdown.js';

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
    const root = join(process.cwd(), 'node_modules', '.tmp-commonloom-security');
    const mediaRoot = join(root, 'media');
    const outsideRoot = join(root, 'outside');

    await rm(root, { recursive: true, force: true });
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
  });
});
