/**
 * Link, wiki-link, and image-reference extraction for Commonloom Markdown.
 *
 * This module classifies generic targets and delegates project-specific
 * wiki-link resolution to adapter callbacks.
 */
import type { Image, Link, Text } from 'mdast';
import { visit } from 'unist-util-visit';

import type { ParsedMarkdown } from './markdown.js';
import type {
  CommonloomDiagnostic,
  CommonloomImageReference,
  CommonloomLinkPolicy,
  CommonloomLinkReference,
} from './types.js';

/** Link and image references extracted from a parsed Markdown document. */
export interface ExtractMarkdownReferencesResult {
  links: CommonloomLinkReference[];
  images: CommonloomImageReference[];
}

/** Link references after adapter-owned wiki-link resolution has run. */
export interface ResolvedLinkReferencesResult {
  links: CommonloomLinkReference[];
  diagnostics: CommonloomDiagnostic[];
}

const externalUrlPattern = /^https?:\/\//i;
const unsupportedSchemePattern = /^[a-z][a-z0-9+.-]*:/i;
const wikiLinkPattern = /\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/g;

/**
 * Classify a raw Markdown target without applying project-specific routing.
 *
 * Commonloom recognizes external URLs, same-document anchors, Obsidian-style
 * wiki-links, unsupported schemes, and generic internal links. Adapters decide
 * what an internal or wiki-link ultimately resolves to.
 */
export function classifyLinkTarget(
  rawTarget: string,
): Pick<CommonloomLinkReference, 'rawTarget' | 'kind' | 'resolvedTarget'> {
  const target = rawTarget.trim();

  if (externalUrlPattern.test(target)) {
    return { rawTarget: target, resolvedTarget: target, kind: 'external' };
  }

  if (target.startsWith('#')) {
    return { rawTarget: target, resolvedTarget: target, kind: 'same-document' };
  }

  const wikiMatch = /^\[\[([^\]|]+)(?:\|[^\]]+)?\]\]$/.exec(target);

  if (wikiMatch?.[1]) {
    return { rawTarget: wikiMatch[1].trim(), kind: 'wiki-link' };
  }

  if (unsupportedSchemePattern.test(target)) {
    return { rawTarget: target, kind: 'unsupported' };
  }

  return { rawTarget: target, resolvedTarget: target, kind: 'internal' };
}

/**
 * Extract Markdown links, image references, and inline wiki-links from mdast.
 */
export function extractMarkdownReferences<Frontmatter>(
  parsed: ParsedMarkdown<Frontmatter>,
): ExtractMarkdownReferencesResult {
  const links: CommonloomLinkReference[] = [];
  const images: CommonloomImageReference[] = [];

  visit(parsed.mdast, 'link', (node: Link) => {
    links.push({
      ...classifyLinkTarget(node.url),
      sourcePath: parsed.sourcePath,
      line: offsetLine(node.position?.start.line, parsed.contentStartLine),
      column: node.position?.start.column,
    });
  });

  visit(parsed.mdast, 'image', (node: Image) => {
    images.push({
      rawTarget: node.url,
      altText: node.alt ?? '',
      sourcePath: parsed.sourcePath,
      line: offsetLine(node.position?.start.line, parsed.contentStartLine),
      column: node.position?.start.column,
    });
  });

  visit(parsed.mdast, 'text', (node: Text) => {
    for (const match of node.value.matchAll(wikiLinkPattern)) {
      if (!match[1]) {
        continue;
      }

      links.push({
        rawTarget: match[1].trim(),
        kind: 'wiki-link',
        sourcePath: parsed.sourcePath,
        line: offsetLine(node.position?.start.line, parsed.contentStartLine),
        column: node.position?.start.column
          ? node.position.start.column + match.index
          : undefined,
      });
    }
  });

  return { links, images };
}

/**
 * Resolve wiki-links through the adapter policy and collect diagnostics.
 *
 * Wiki and internal links can resolve through the adapter policy. Unsupported
 * schemes become `LINK_UNRESOLVED` diagnostics because Commonloom cannot safely
 * route them.
 */
export async function resolveLinkReferences(
  links: CommonloomLinkReference[],
  policy: CommonloomLinkPolicy,
): Promise<ResolvedLinkReferencesResult> {
  const resolvedLinks: CommonloomLinkReference[] = [];
  const diagnostics: CommonloomDiagnostic[] = [];

  for (const link of links) {
    if (link.kind === 'unsupported') {
      diagnostics.push(unresolvedDiagnostic(link, `Unsupported link target: ${link.rawTarget}`));
      resolvedLinks.push(link);
      continue;
    }

    if (link.kind !== 'wiki-link' && link.kind !== 'internal') {
      resolvedLinks.push(link);
      continue;
    }

    const resolution = await policy.resolveLink(link);
    const resolvedLink = {
      ...link,
      kind: resolution.kind,
      resolvedTarget: resolution.resolvedTarget,
    };

    resolvedLinks.push(resolvedLink);

    if (resolution.diagnostic) {
      diagnostics.push(resolution.diagnostic);
    } else if (!resolution.resolvedTarget) {
      diagnostics.push(
        unresolvedDiagnostic(link, `Unresolved ${link.kind}: ${link.rawTarget}`),
      );
    }
  }

  return { links: resolvedLinks, diagnostics };
}

function offsetLine(line: number | undefined, contentStartLine: number): number | undefined {
  return line ? line + contentStartLine - 1 : undefined;
}

/** Build a normalized unresolved-link diagnostic at the original source span. */
function unresolvedDiagnostic(
  link: CommonloomLinkReference,
  message: string,
): CommonloomDiagnostic {
  return {
    code: 'LINK_UNRESOLVED',
    severity: 'error',
    message,
    sourcePath: link.sourcePath,
    line: link.line,
    column: link.column,
  };
}
