/**
 * Public surface tests for the standalone Commonloom package.
 *
 * These assertions keep the imported compiler scaffold, diagnostic constants,
 * source trace contracts, and adapter-owned link behavior visible while the
 * package API is still pre-release.
 */
import { describe, expect, it } from 'vitest';

import { compileCommonloom } from '../src/index.js';
import {
  commonloomDiagnosticCodes,
  commonloomLinkKinds,
  commonloomSeverities,
} from '../src/diagnostics.js';
import type {
  CommonloomConfig,
  CommonloomLinkReference,
  CommonloomSourceTrace,
} from '../src/index.js';

describe('Commonloom compiler public surface', () => {
  it('exports a non-destructive compiler entry point', async () => {
    const result = await compileCommonloom({
      copyRoot: 'content/copy',
      mediaRoot: 'content/media',
    });

    expect(result.diagnostics).toEqual([
      {
        code: 'NO_MANIFESTS',
        severity: 'info',
        message: 'No page manifests configured.',
      },
    ]);
  });

  it('exports stable diagnostics and source trace contracts', () => {
    expect(commonloomSeverities).toEqual(['error', 'warning', 'info']);
    expect(commonloomDiagnosticCodes).toEqual([
      'NO_MANIFESTS',
      'COPY_NOT_FOUND',
      'FRONTMATTER_INVALID',
      'MARKDOWN_INVALID',
      'HTML_UNSAFE',
      'LINK_UNRESOLVED',
      'MANIFEST_INVALID',
      'MEDIA_UNRESOLVED',
      'MEDIA_ALT_MISSING',
      'PATH_OUTSIDE_ROOT',
    ]);

    const trace: CommonloomSourceTrace = {
      markdownPath: 'copy/example.md',
      contentHash: 'abc123',
      headings: [],
      links: [],
      images: [],
    };

    expect(trace.markdownPath).toBe('copy/example.md');
  });

  it('keeps website route concepts behind adapter-owned callbacks', async () => {
    expect(commonloomLinkKinds).toEqual([
      'external',
      'internal',
      'same-document',
      'wiki-link',
      'unsupported',
    ]);

    const link: CommonloomLinkReference = {
      rawTarget: '/quickstart/',
      resolvedTarget: '/quickstart/',
      kind: 'internal',
    };
    const config: CommonloomConfig = {
      copyRoot: 'content/copy',
      mediaRoot: 'content/media',
      manifests: [],
      html: { allowInlineHtml: true },
      links: {
        resolveLink: ({ rawTarget }) => ({
          kind: rawTarget.startsWith('/') ? 'internal' : 'unsupported',
          resolvedTarget: rawTarget,
        }),
      },
    };

    const resolution = await config.links?.resolveLink({ rawTarget: '/quickstart/' });

    expect(link.kind).toBe('internal');
    expect(resolution?.kind).toBe('internal');
  });
});
