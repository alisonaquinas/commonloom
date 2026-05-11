/**
 * Markdown parser behavior tests for Commonloom.
 *
 * These cases cover frontmatter validation, CommonMark/GFM parsing, heading
 * extraction, and diagnostic reporting without depending on consuming website
 * code.
 */
import { z } from 'zod';
import { describe, expect, it } from 'vitest';

import { parseMarkdown } from '../src/markdown.js';

const frontmatterSchema = z.object({
  title: z.string(),
  description: z.string(),
});

interface TestTreeNode {
  type: string;
  children?: TestTreeNode[];
}

function collectNodeTypes(node: TestTreeNode): string[] {
  return [
    node.type,
    ...(node.children ?? []).flatMap((child) => collectNodeTypes(child)),
  ];
}

describe('Commonloom Markdown parser', () => {
  it('parses frontmatter, CommonMark headings, and GFM constructs', () => {
    const result = parseMarkdown({
      sourcePath: 'copy/example.md',
      markdown: [
        '---',
        'title: Example',
        'description: A useful page',
        '---',
        '# Main Heading',
        '',
        'A paragraph with **strong** text and [a link](/quickstart/).',
        '',
        '| Key | Value |',
        '| --- | --- |',
        '| one | two |',
        '',
        '- [x] checked task',
      ].join('\n'),
      frontmatterSchema,
    });

    expect(result.frontmatter).toEqual({
      title: 'Example',
      description: 'A useful page',
    });
    expect(result.headings).toEqual([
      {
        id: 'main-heading',
        label: 'Main Heading',
        level: 1,
        line: 5,
        column: 1,
      },
    ]);
    expect(result.diagnostics).toEqual([]);
  });

  it('parses broad CommonMark and GFM constructs into mdast nodes', () => {
    const result = parseMarkdown({
      sourcePath: 'copy/rich.md',
      markdown: [
        '---',
        'title: Rich',
        'description: Rich Markdown',
        '---',
        '# Rich',
        '',
        '> A quoted note with *emphasis*.',
        '',
        '```ts',
        'const answer = 42;',
        '```',
        '',
        'Use `inline code`, ~~old copy~~, and https://example.com/docs.',
        '',
        '![Diagram](diagram.png)',
      ].join('\n'),
      frontmatterSchema,
    });

    const nodeTypes = collectNodeTypes(result.mdast);

    expect(nodeTypes).toEqual(
      expect.arrayContaining([
        'blockquote',
        'code',
        'delete',
        'emphasis',
        'image',
        'inlineCode',
        'link',
      ]),
    );
    expect(result.diagnostics).toEqual([]);
  });

  it('reports invalid frontmatter as diagnostics', () => {
    const result = parseMarkdown({
      sourcePath: 'copy/bad.md',
      markdown: ['---', 'title: 42', '---', '# Bad'].join('\n'),
      frontmatterSchema,
    });

    expect(result.diagnostics).toContainEqual(
      expect.objectContaining({
        code: 'FRONTMATTER_INVALID',
        severity: 'error',
        sourcePath: 'copy/bad.md',
      }),
    );
    expect(result.frontmatter).toBeUndefined();
  });

  it('reports malformed frontmatter as diagnostics without throwing', () => {
    const result = parseMarkdown({
      sourcePath: 'copy/malformed.md',
      markdown: ['---', 'title: [unterminated', '---', '# Bad'].join('\n'),
      frontmatterSchema,
    });

    expect(result.frontmatter).toBeUndefined();
    expect(result.diagnostics).toContainEqual(
      expect.objectContaining({
        code: 'FRONTMATTER_INVALID',
        severity: 'error',
        sourcePath: 'copy/malformed.md',
      }),
    );
  });
});
