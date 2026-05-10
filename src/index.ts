/**
 * Public package entry point for Commonloom.
 *
 * This module exports the adapter-neutral parser, renderer, resolver, media,
 * path, hashing, trace, and diagnostic contracts that consumers can compose.
 * Keep all public additions routed through this file so the package surface is
 * easy to audit before release.
 *
 * @module commonloom
 */
export { compileCommonloom } from './compiler.js';
export { parseFrontmatter } from './frontmatter.js';
export { hashContent } from './hash.js';
export { renderMarkdownHtml } from './html.js';
export {
  classifyLinkTarget,
  extractMarkdownReferences,
  resolveLinkReferences,
} from './links.js';
export { parseMarkdown } from './markdown.js';
export { validateMediaReference } from './media.js';
export { resolveInsideRoot } from './paths.js';
export { createSourceTrace } from './source-trace.js';
export type {
  CommonloomConfig,
  CommonloomCompiledDocument,
  CommonloomDiagnostic,
  CommonloomDiagnosticCode,
  CommonloomHtmlPolicy,
  CommonloomHeading,
  CommonloomImageReference,
  CommonloomLinkKind,
  CommonloomLinkPolicy,
  CommonloomLinkReference,
  CommonloomLinkResolution,
  CommonloomLinkResolverInput,
  CommonloomManifestEntry,
  CommonloomResult,
  CommonloomSeverity,
  CommonloomSourceTrace,
} from './types.js';
export type { ParsedFrontmatter } from './frontmatter.js';
export type { RenderMarkdownHtmlInput, RenderMarkdownHtmlResult } from './html.js';
export type { ExtractMarkdownReferencesResult, ResolvedLinkReferencesResult } from './links.js';
export type { ParsedMarkdown, ParseMarkdownInput } from './markdown.js';
export type { ValidateMediaReferenceOptions, ValidateMediaReferenceResult } from './media.js';
export type { ResolveInsideRootInput, ResolveInsideRootResult } from './paths.js';
export type { CreateSourceTraceInput } from './source-trace.js';
