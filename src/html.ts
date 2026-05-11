/**
 * Markdown-to-HTML rendering for parsed Commonloom documents.
 *
 * This module applies the inline HTML policy, reports unsafe inline HTML, and
 * sanitizes rendered output before returning it to adapters.
 */
import rehypeRaw from 'rehype-raw';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import rehypeStringify from 'rehype-stringify';
import remarkRehype from 'remark-rehype';

import type { ParsedMarkdown } from './markdown.js';
import { createMarkdownProcessor } from './markdown-processors.js';
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
const unsafeEventAttributePattern = /<[^>]+\s(on[a-z]+)\s*=/gi;
const unsafeUrlAttributePattern =
  /<[^>]+\s(href|src|xlink:href|srcset)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/gi;
const unsafeEventAttributeRemovalPattern =
  /\s+on[a-z]+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi;
const unsafeUrlAttributeRemovalPattern =
  /\s+(href|src|xlink:href|srcset)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/gi;

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
  const bodyMarkdown = input.allowHtml
    ? removeUnsafeHtmlAttributes(input.parsed.bodyMarkdown)
    : input.parsed.bodyMarkdown;

  if (input.allowHtml) {
    for (const unsafe of unsafeHtml) {
      diagnostics.push({
        code: 'HTML_UNSAFE',
        severity: 'error',
        message: unsafe.message,
        sourcePath: input.parsed.sourcePath,
        line: offsetLine(unsafe.line, input.parsed.contentStartLine),
        column: unsafe.column,
      });
    }
  }

  let processor = createMarkdownProcessor().use(remarkRehype, {
    allowDangerousHtml: input.allowHtml,
  });

  if (input.allowHtml) {
    processor = processor.use(rehypeRaw);
  }

  const file = await processor
    .use(rehypeSanitize, safeHtmlSchema)
    .use(rehypeStringify)
    .process(bodyMarkdown);

  return {
    bodyHtml: String(file),
    diagnostics,
  };
}

/** Locate the first disallowed inline HTML tag and report its Markdown offset. */
function findUnsafeHtml(markdown: string): { message: string; line: number; column: number }[] {
  const unsafe: { message: string; line: number; column: number }[] = [];
  const match = unsafeHtmlPattern.exec(markdown);

  if (match?.[1]) {
    unsafe.push({
      ...positionForOffset(markdown, match.index),
      message: `Unsafe inline HTML tag <${match[1]}> was removed from Markdown output.`,
    });
  }

  for (const attributeMatch of markdown.matchAll(unsafeEventAttributePattern)) {
    if (!attributeMatch[1]) {
      continue;
    }

    unsafe.push({
      ...positionForOffset(markdown, attributeMatch.index),
      message: `Unsafe inline HTML attribute ${attributeMatch[1]} was removed from Markdown output.`,
    });
  }

  for (const attributeMatch of markdown.matchAll(unsafeUrlAttributePattern)) {
    if (!attributeMatch[1]) {
      continue;
    }

    const attributeValue = attributeValueFromMatch(attributeMatch);

    if (!isUnsafeUrlAttributeValue(attributeValue)) {
      continue;
    }

    unsafe.push({
      ...positionForOffset(markdown, attributeMatch.index),
      message: `Unsafe inline HTML URL in ${attributeMatch[1]} was removed from Markdown output.`,
    });
  }

  return unsafe;
}

function positionForOffset(markdown: string, offset: number): { line: number; column: number } {
  const prefix = markdown.slice(0, offset);
  const lines = prefix.split('\n');

  return {
    line: lines.length,
    column: lines[lines.length - 1].length + 1,
  };
}

function offsetLine(line: number, contentStartLine: number): number {
  return line + contentStartLine - 1;
}

function removeUnsafeHtmlAttributes(markdown: string): string {
  return markdown
    .replace(unsafeEventAttributeRemovalPattern, '')
    .replace(
      unsafeUrlAttributeRemovalPattern,
      (attribute: string, _name: string, doubleQuoted?: string, singleQuoted?: string, unquoted?: string) => {
        const attributeValue = firstString(doubleQuoted, singleQuoted, unquoted);

        return isUnsafeUrlAttributeValue(attributeValue) ? '' : attribute;
      },
    );
}

function isUnsafeUrlAttributeValue(value: string): boolean {
  const normalizedValue = removeProtocolNoise(decodeHtmlEntities(value)).toLowerCase();

  return (
    normalizedValue.startsWith('javascript:')
    || normalizedValue.includes(',javascript:')
  );
}

function attributeValueFromMatch(match: RegExpMatchArray): string {
  return firstString(match[2], match[3], match[4]);
}

function firstString(...values: (string | undefined)[]): string {
  for (const value of values) {
    if (typeof value === 'string') {
      return value;
    }
  }

  return '';
}

function removeProtocolNoise(value: string): string {
  let cleanedValue = '';

  for (const character of value) {
    const codePoint = character.codePointAt(0);

    if (codePoint !== undefined && codePoint > 0x20 && codePoint !== 0x7f) {
      cleanedValue += character;
    }
  }

  return cleanedValue;
}

function decodeHtmlEntities(value: string): string {
  return value
    .replace(/&#x([0-9a-f]+);?/gi, (_, codePoint: string) => {
      return decodeCodePoint(Number.parseInt(codePoint, 16));
    })
    .replace(/&#(\d+);?/g, (_, codePoint: string) => {
      return decodeCodePoint(Number.parseInt(codePoint, 10));
    })
    .replace(/&colon;?/gi, ':')
    .replace(/&tab;?/gi, '\t')
    .replace(/&newline;?/gi, '\n');
}

function decodeCodePoint(codePoint: number): string {
  if (!Number.isFinite(codePoint)) {
    return '';
  }

  try {
    return String.fromCodePoint(codePoint);
  } catch {
    return '';
  }
}
