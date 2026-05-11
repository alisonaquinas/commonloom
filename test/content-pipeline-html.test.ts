/**
 * HTML rendering and source trace tests for Commonloom.
 *
 * These cases verify sanitization policy, unsafe HTML diagnostics, and stable
 * trace hashing from parsed Markdown inputs.
 */
import { z } from 'zod';
import { describe, expect, it } from 'vitest';

import { renderMarkdownHtml } from '../src/html.js';
import { parseMarkdown } from '../src/markdown.js';
import { createSourceTrace } from '../src/source-trace.js';

const frontmatterSchema = z.object({
  title: z.string(),
});

/** Parse a Markdown fixture with the shared HTML-test frontmatter schema. */
function parse(markdown: string) {
  return parseMarkdown({
    sourcePath: 'copy/html.md',
    markdown,
    frontmatterSchema,
  });
}

describe('Commonloom HTML rendering and source traces', () => {
  it('allows safe inline HTML in rendered Markdown', async () => {
    const parsed = parse(['---', 'title: HTML', '---', '# HTML', '', 'Press <kbd>Ctrl</kbd>.'].join('\n'));
    const result = await renderMarkdownHtml({ parsed, allowHtml: true });

    expect(result.bodyHtml).toContain('<kbd>Ctrl</kbd>');
    expect(result.diagnostics).toEqual([]);
  });

  it('keeps safe static inline HTML while sanitizing unsafe attributes', async () => {
    const parsed = parse(
      [
        '---',
        'title: Static HTML',
        '---',
        '# Static HTML',
        '',
        '<abbr title="World Wide Web">WWW</abbr>',
        '<figure><picture><source srcset="diagram.webp" type="image/webp"><img src="diagram.png" alt="Diagram"></picture><figcaption>Diagram</figcaption></figure>',
        '<a href="javascript:alert(1)" onclick="alert(1)">unsafe link</a>',
      ].join('\n'),
    );
    const result = await renderMarkdownHtml({ parsed, allowHtml: true });

    expect(result.bodyHtml).toContain('<abbr title="World Wide Web">WWW</abbr>');
    expect(result.bodyHtml).toContain('<figure>');
    expect(result.bodyHtml).toContain('<picture>');
    expect(result.bodyHtml).toContain('<source srcset="diagram.webp" type="image/webp">');
    expect(result.bodyHtml).toContain('<figcaption>Diagram</figcaption>');
    expect(result.bodyHtml).toContain('<a>unsafe link</a>');
    expect(result.bodyHtml).not.toContain('javascript:');
    expect(result.bodyHtml).not.toContain('onclick');
    expect(result.diagnostics).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          code: 'HTML_UNSAFE',
          message: expect.stringContaining('href') as string,
          line: 8,
        }),
        expect.objectContaining({
          code: 'HTML_UNSAFE',
          message: expect.stringContaining('onclick') as string,
          line: 8,
        }),
      ]),
    );
  });

  it('diagnoses and removes unsafe inline HTML', async () => {
    const parsed = parse(
      ['---', 'title: Unsafe', '---', '# Unsafe', '', '<script>alert("x")</script>'].join('\n'),
    );
    const result = await renderMarkdownHtml({ parsed, allowHtml: true });

    expect(result.bodyHtml).not.toContain('<script>');
    expect(result.diagnostics).toContainEqual(
      expect.objectContaining({
        code: 'HTML_UNSAFE',
        severity: 'error',
        sourcePath: 'copy/html.md',
      }),
    );
  });

  it('diagnoses high-risk embed tags before sanitized output is returned', async () => {
    const parsed = parse(
      ['---', 'title: Unsafe Embed', '---', '# Unsafe Embed', '', '<iframe src="/embed"></iframe>'].join('\n'),
    );
    const result = await renderMarkdownHtml({ parsed, allowHtml: true });

    expect(result.bodyHtml).not.toContain('<iframe');
    expect(result.diagnostics).toContainEqual(
      expect.objectContaining({
        code: 'HTML_UNSAFE',
        message: expect.stringContaining('<iframe>') as string,
      }),
    );
  });

  it('creates source traces with stable content hashes', () => {
    const markdown = ['---', 'title: Trace', '---', '# Trace', '', '[Quickstart](/quickstart/)'].join('\n');
    const parsed = parse(markdown);
    const trace = createSourceTrace({
      markdownPath: 'copy/html.md',
      manifestPath: 'docs.manifest.ts',
      markdown,
      parsed,
    });

    expect(trace.contentHash).toMatch(/^[a-f0-9]{64}$/);
    expect(trace.headings[0]?.id).toBe('trace');
    expect(trace.markdownPath).toBe('copy/html.md');
  });
});
