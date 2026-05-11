/**
 * Integration coverage for Commonloom's parser, renderer, resolver, media, and
 * source trace modules through the public compiler entry point.
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

import { z } from 'zod';
import { describe, expect, it } from 'vitest';

import { compileCommonloom } from '../src/index.js';
import { makeTempDir } from './temp-dir.js';

const frontmatterSchema = z.object({
  title: z.string(),
});

describe('Commonloom integration pipeline', () => {
  it('compiles manifests through parse, render, links, media, and traces', async () => {
    const fixture = await makeTempDir('commonloom-integration-');

    try {
      const copyRoot = join(fixture.root, 'copy');
      const mediaRoot = join(fixture.root, 'media');

      await mkdir(copyRoot, { recursive: true });
      await mkdir(mediaRoot, { recursive: true });
      await writeFile(join(mediaRoot, 'diagram.png'), 'fixture');
      await writeFile(
        join(copyRoot, 'guide.md'),
        [
          '---',
          'title: Guide',
          '---',
          '# Guide',
          '',
          'Read [[Quick Start]] and see ![Diagram](diagram.png).',
        ].join('\n'),
      );

      const result = await compileCommonloom({
        copyRoot,
        mediaRoot,
        frontmatterSchema,
        manifests: [
          {
            id: 'guide',
            sourcePath: 'guide.md',
            data: { route: '/guide/' },
          },
        ],
        links: {
          resolveLink: ({ rawTarget }) => ({
            kind: 'internal',
            resolvedTarget: rawTarget === 'Quick Start' ? '/quickstart/' : undefined,
          }),
        },
      });

      expect(result.diagnostics).toEqual([]);
      expect(result.documents).toHaveLength(1);
      expect(result.documents?.[0]).toEqual(
        expect.objectContaining({
          frontmatter: { title: 'Guide' },
          bodyHtml: expect.stringContaining('<h1>Guide</h1>') as string,
        }),
      );
      expect(result.documents?.[0]?.sourceTrace.links).toContainEqual(
        expect.objectContaining({
          rawTarget: 'Quick Start',
          resolvedTarget: '/quickstart/',
          kind: 'internal',
        }),
      );
      expect(result.documents?.[0]?.sourceTrace.images).toContainEqual(
        expect.objectContaining({
          rawTarget: 'diagram.png',
          resolvedPath: join(mediaRoot, 'diagram.png'),
        }),
      );
    } finally {
      await fixture.cleanup();
    }
  });
});
