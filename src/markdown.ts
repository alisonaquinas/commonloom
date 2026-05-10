/**
 * Markdown parsing for Commonloom content sources.
 *
 * This module combines frontmatter parsing with CommonMark/GFM mdast parsing
 * and heading extraction used by source traces.
 */
import type { Heading, PhrasingContent, Root } from 'mdast';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import { unified } from 'unified';
import { z } from 'zod';

import { parseFrontmatter } from './frontmatter.js';
import type { CommonloomDiagnostic, CommonloomHeading } from './types.js';

/** Input required to parse one Markdown source document. */
export interface ParseMarkdownInput<Frontmatter> {
  sourcePath: string;
  markdown: string;
  frontmatterSchema: z.ZodType<Frontmatter>;
}

/**
 * Parsed Markdown state shared by rendering, reference extraction, and source
 * trace modules.
 */
export interface ParsedMarkdown<Frontmatter> {
  sourcePath: string;
  frontmatter: Frontmatter | undefined;
  bodyMarkdown: string;
  headings: CommonloomHeading[];
  mdast: Root;
  diagnostics: CommonloomDiagnostic[];
}

const markdownProcessor = unified().use(remarkParse).use(remarkGfm);

/**
 * Parse frontmatter and Markdown into an mdast tree with normalized headings.
 *
 * The parser supports CommonMark plus GFM extensions. Frontmatter validation
 * problems remain in `diagnostics` so downstream rendering and extraction can
 * still run against the Markdown body.
 */
export function parseMarkdown<Frontmatter>(
  input: ParseMarkdownInput<Frontmatter>,
): ParsedMarkdown<Frontmatter> {
  const frontmatter = parseFrontmatter(
    input.sourcePath,
    input.markdown,
    input.frontmatterSchema,
  );
  const mdast = markdownProcessor.parse(frontmatter.bodyMarkdown);

  return {
    sourcePath: input.sourcePath,
    frontmatter: frontmatter.frontmatter,
    bodyMarkdown: frontmatter.bodyMarkdown,
    headings: extractHeadings(mdast, frontmatter.contentStartLine),
    mdast,
    diagnostics: frontmatter.diagnostics,
  };
}

/** Extract top-level Markdown heading nodes into Commonloom trace records. */
function extractHeadings(tree: Root, contentStartLine: number): CommonloomHeading[] {
  return tree.children
    .filter((node): node is Heading => node.type === 'heading')
    .map((heading) => {
      const label = heading.children.map(textFromPhrasingContent).join('').trim();

      return {
        id: slugifyHeading(label),
        label,
        level: heading.depth,
        line: heading.position?.start.line
          ? heading.position.start.line + contentStartLine - 1
          : undefined,
        column: heading.position?.start.column,
      };
    });
}

/** Flatten phrasing content so headings with inline markup still get labels. */
function textFromPhrasingContent(node: PhrasingContent): string {
  if ('value' in node && typeof node.value === 'string') {
    return node.value;
  }

  if ('children' in node && Array.isArray(node.children)) {
    return node.children.map(textFromPhrasingContent).join('');
  }

  return '';
}

/** Generate a stable lowercase heading id from visible heading text. */
function slugifyHeading(label: string): string {
  return label
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}
