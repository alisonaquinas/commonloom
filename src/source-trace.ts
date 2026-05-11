/**
 * Source trace assembly for parsed Commonloom Markdown documents.
 *
 * This module captures content hashes and extracted references so adapters can
 * tie compiled output back to its source Markdown.
 */
import { hashContent } from './hash.js';
import { extractMarkdownReferences } from './links.js';
import type { ParsedMarkdown } from './markdown.js';
import type { CommonloomSourceTrace } from './types.js';

/** Input for building source trace metadata from parsed Markdown. */
export interface CreateSourceTraceInput<Frontmatter> {
  markdownPath: string;
  manifestPath?: string;
  markdown: string;
  parsed: ParsedMarkdown<Frontmatter>;
}

/**
 * Build source trace metadata for a parsed Markdown document.
 *
 * The trace includes the source content hash, headings, links, and images so
 * adapters can connect rendered records back to their Markdown origin.
 */
export function createSourceTrace<Frontmatter>(
  input: CreateSourceTraceInput<Frontmatter>,
): CommonloomSourceTrace {
  const references = extractMarkdownReferences(input.parsed);

  return {
    markdownPath: input.markdownPath,
    manifestPath: input.manifestPath,
    contentHash: hashContent(input.markdown),
    headings: input.parsed.headings,
    links: references.links,
    images: references.images,
  };
}
