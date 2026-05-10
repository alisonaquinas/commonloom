/**
 * Shared public contracts for Commonloom parser, renderer, resolver, and
 * compiler modules.
 *
 * These types define the adapter-neutral boundary. Keep product-specific route,
 * component, and generated-module concepts outside this file.
 */

/** Source location in a Markdown document when parser metadata is available. */
export interface CommonloomSourcePosition {
  line?: number;
  column?: number;
}

/** A Markdown heading with its generated anchor id and source position. */
export interface CommonloomHeading extends CommonloomSourcePosition {
  id: string;
  label: string;
  level: number;
}

/** Link categories recognized by Commonloom before adapter-specific routing. */
export const commonloomLinkKinds = [
  'external',
  'internal',
  'same-document',
  'wiki-link',
  'unsupported',
] as const;

/** Union of Commonloom link kind names. */
export type CommonloomLinkKind = (typeof commonloomLinkKinds)[number];

/** A link reference extracted from Markdown or resolved by an adapter policy. */
export interface CommonloomLinkReference extends CommonloomSourcePosition {
  rawTarget: string;
  resolvedTarget?: string;
  kind: CommonloomLinkKind;
  sourcePath?: string;
}

/** An image reference extracted from Markdown with local validation metadata. */
export interface CommonloomImageReference extends CommonloomSourcePosition {
  rawTarget: string;
  altText: string;
  resolvedPath?: string;
  sourcePath?: string;
}

/** Trace data that connects rendered output back to its Markdown source. */
export interface CommonloomSourceTrace {
  markdownPath: string;
  manifestPath?: string;
  contentHash: string;
  headings: CommonloomHeading[];
  links: CommonloomLinkReference[];
  images: CommonloomImageReference[];
}

/** Diagnostic severities supported by Commonloom validation workflows. */
export const commonloomSeverities = ['error', 'warning', 'info'] as const;

/** Union of supported diagnostic severity names. */
export type CommonloomSeverity = (typeof commonloomSeverities)[number];

/** Stable diagnostic codes emitted by Commonloom modules. */
export const commonloomDiagnosticCodes = [
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
] as const;

/** Union of stable diagnostic code names. */
export type CommonloomDiagnosticCode = (typeof commonloomDiagnosticCodes)[number];

/** A normalized parser, renderer, resolver, or validation finding. */
export interface CommonloomDiagnostic {
  code: CommonloomDiagnosticCode;
  severity: CommonloomSeverity;
  message: string;
  sourcePath?: string;
  line?: number;
  column?: number;
}

/** A manifest entry supplied by an adapter or consuming build pipeline. */
export interface CommonloomManifestEntry<AdapterData = unknown> {
  id: string;
  sourcePath: string;
  outputName?: string;
  data?: AdapterData;
}

/** HTML rendering policy for inline HTML handling. */
export interface CommonloomHtmlPolicy {
  allowInlineHtml: boolean;
}

/** Adapter input for resolving project-specific link targets. */
export interface CommonloomLinkResolverInput extends CommonloomSourcePosition {
  rawTarget: string;
  sourcePath?: string;
}

/** Adapter result for a project-specific link resolution attempt. */
export interface CommonloomLinkResolution {
  kind: CommonloomLinkKind;
  resolvedTarget?: string;
  diagnostic?: CommonloomDiagnostic;
}

/** Callback boundary for route, slug, and wiki-link resolution. */
export interface CommonloomLinkPolicy {
  resolveLink(
    input: CommonloomLinkResolverInput,
  ): CommonloomLinkResolution | Promise<CommonloomLinkResolution>;
}

/** Top-level configuration for a Commonloom compile run. */
export interface CommonloomConfig {
  copyRoot: string;
  mediaRoot: string;
  manifests?: CommonloomManifestEntry[];
  html?: CommonloomHtmlPolicy;
  links?: CommonloomLinkPolicy;
}

/** A compiled document plus the diagnostics and trace data that produced it. */
export interface CommonloomCompiledDocument<Frontmatter = unknown, AdapterData = unknown> {
  manifest: CommonloomManifestEntry<AdapterData>;
  frontmatter: Frontmatter;
  bodyHtml: string;
  sourceTrace: CommonloomSourceTrace;
  diagnostics: CommonloomDiagnostic[];
}

/** Top-level compiler output. */
export interface CommonloomResult {
  diagnostics: CommonloomDiagnostic[];
  documents?: CommonloomCompiledDocument[];
}
