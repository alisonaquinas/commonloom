import { hashContent } from './hash.js';
import { extractMarkdownReferences } from './links.js';
import type { ParsedMarkdown } from './markdown.js';
import type { CommonloomSourceTrace } from './types.js';

export interface CreateSourceTraceInput<Frontmatter> {
  markdownPath: string;
  manifestPath?: string;
  markdown: string;
  parsed: ParsedMarkdown<Frontmatter>;
}

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
