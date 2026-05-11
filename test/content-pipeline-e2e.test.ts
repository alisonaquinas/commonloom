/**
 * End-to-end fixture coverage for the public Commonloom compiler workflow.
 */
import { mkdir, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

import { z } from 'zod';
import { describe, expect, it } from 'vitest';

import { compileCommonloom } from '../src/index.js';

const frontmatterSchema = z.object({
  title: z.string(),
  summary: z.string(),
});

describe('Commonloom end-to-end fixture workflow', () => {
  it('compiles a fixture content tree into adapter-visible records', async () => {
    const root = join(process.cwd(), 'node_modules', '.tmp-commonloom-e2e');
    const copyRoot = join(root, 'copy');
    const mediaRoot = join(root, 'media');

    await rm(root, { recursive: true, force: true });
    await mkdir(join(copyRoot, 'pages'), { recursive: true });
    await mkdir(mediaRoot, { recursive: true });
    await writeFile(join(mediaRoot, 'hero.png'), 'fixture');
    await writeFile(
      join(copyRoot, 'pages', 'home.md'),
      [
        '---',
        'title: Home',
        'summary: Welcome',
        '---',
        '# Home',
        '',
        'Welcome to **Commonloom**.',
        '',
        '![Hero](hero.png)',
      ].join('\n'),
    );

    const result = await compileCommonloom({
      copyRoot,
      mediaRoot,
      frontmatterSchema,
      manifests: [
        {
          id: 'home',
          sourcePath: 'pages/home.md',
          outputName: 'home',
          data: { route: '/' },
        },
      ],
      html: { allowInlineHtml: false },
    });

    expect(result.diagnostics).toEqual([]);
    expect(result.documents).toHaveLength(1);

    const document = result.documents?.[0];

    expect(document?.manifest.id).toBe('home');
    expect(document?.manifest.data).toEqual({ route: '/' });
    expect(document?.frontmatter).toEqual({
      title: 'Home',
      summary: 'Welcome',
    });
    expect(document?.bodyHtml).toContain('<strong>Commonloom</strong>');
    expect(document?.sourceTrace.markdownPath).toBe('pages/home.md');
    expect(document?.sourceTrace.contentHash).toMatch(/^[a-f0-9]{64}$/);
  });
});
