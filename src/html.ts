/**
 * Markdown-to-HTML rendering for parsed Commonloom documents.
 *
 * This module applies the inline HTML policy, reports unsafe inline HTML, and
 * sanitizes rendered output before returning it to adapters.
 */
import rehypeRaw from 'rehype-raw';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import rehypeStringify from 'rehype-stringify';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';

import type { ParsedMarkdown } from './markdown.js';
import type { CommonloomDiagnostic } from './types.js';

/** Input required to render a parsed Markdown document to HTML. */
export interface RenderMarkdownHtmlInput<Frontmatter> {
  parsed: ParsedMarkdown<Frontmatter>;
  allowHtml: boolean;
}

/** Rendered HTML plus diagnostics collected while producing it. */
export interface RenderMarkdownHtmlResult {
  bodyHtml: string;
  diagnostics: CommonloomDiagnostic[];
}

const unsafeHtmlPattern =
  /<\s*(script|iframe|object|embed|style|link|meta|base|form|input|button|textarea|select|option|svg|math)\b/i;

const safeHtmlSchema = {
  ...defaultSchema,
  tagNames: [
    ...(defaultSchema.tagNames ?? []),
    'abbr',
    'figcaption',
    'figure',
    'kbd',
    'picture',
    'source',
  ],
  attributes: {
    ...defaultSchema.attributes,
    abbr: ['title'],
    kbd: [],
    source: ['media', 'srcSet', 'type'],
  },
};

/**
 * Render parsed Markdown to sanitized HTML.
 *
 * When inline HTML is enabled, Commonloom still detects high-risk tags and
 * reports `HTML_UNSAFE` diagnostics before rehype sanitization removes unsafe
 * output. Existing parse diagnostics are preserved.
 */
export async function renderMarkdownHtml<Frontmatter>(
  input: RenderMarkdownHtmlInput<Frontmatter>,
): Promise<RenderMarkdownHtmlResult> {
  const diagnostics = [...input.parsed.diagnostics];

  const unsafeHtml = findUnsafeHtml(input.parsed.bodyMarkdown);

  if (input.allowHtml && unsafeHtml) {
    diagnostics.push({
      code: 'HTML_UNSAFE',
      severity: 'error',
      message: `Unsafe inline HTML tag <${unsafeHtml.tagName}> was removed from Markdown output.`,
      sourcePath: input.parsed.sourcePath,
      line: unsafeHtml.line,
      column: unsafeHtml.column,
    });
  }

  let processor = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: input.allowHtml });

  if (input.allowHtml) {
    processor = processor.use(rehypeRaw);
  }

  const file = await processor
    .use(rehypeSanitize, safeHtmlSchema)
    .use(rehypeStringify)
    .process(input.parsed.bodyMarkdown);

  return {
    bodyHtml: String(file),
    diagnostics,
  };
}

/** Locate the first disallowed inline HTML tag and report its Markdown offset. */
function findUnsafeHtml(markdown: string):
  | { tagName: string; line: number; column: number }
  | undefined {
  const match = unsafeHtmlPattern.exec(markdown);

  if (!match?.index || !match[1]) {
    if (match?.index === 0 && match[1]) {
      return { tagName: match[1], line: 1, column: 1 };
    }

    return undefined;
  }

  const prefix = markdown.slice(0, match.index);
  const lines = prefix.split('\n');

  return {
    tagName: match[1],
    line: lines.length,
    column: lines[lines.length - 1].length + 1,
  };
}
