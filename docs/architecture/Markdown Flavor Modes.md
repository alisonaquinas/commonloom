---
title: Markdown Flavor Modes
tags:
  - commonloom
  - architecture
  - markdown
  - flavors
status: proposed
updated: 2026-05-29
aliases:
  - Markdown Flavor Mode Specification
  - Commonloom Markdown Flavors
---

# Markdown Flavor Modes

Commonloom currently parses Markdown with one shared CommonMark plus GitHub
Flavored Markdown processor. The next flavor-mode change should make that
behavior explicit and optional while preserving one deterministic flavor per
compile run.

> [!NOTE] Reference Boundary
> Flavor Grenade is reference evidence only. Commonloom must define and own its
> own public types, parser setup, tests, and documentation.

## Objective

Add an optional Markdown flavor policy that lets callers choose the same
explicit flavor ids modeled by Flavor Grenade, without importing Flavor Grenade
as a runtime dependency and without allowing mixed flavors inside one
Commonloom compile run.

## Source Evidence

- [[sources/flavor-grenade-lsp/src/markdown-flavor/index|Markdown Flavor Source Evidence]]
- [Flavor Grenade LSP](https://flavor-grenade.dev/)
- Local Commonloom source:
  - `src/markdown-processors.ts`
  - `src/markdown.ts`
  - `src/compiler.ts`
  - `src/types.ts`

## Supported Base Modes

Commonloom should expose these explicit base flavor ids:

| Flavor ID | Label | Commonloom interpretation |
| --- | --- | --- |
| `original` | Original Markdown | Original Markdown-era syntax without CommonMark or GFM extensions. |
| `commonmark` | CommonMark | CommonMark block and inline semantics. |
| `obsidian` | Obsidian | Obsidian Markdown syntax including wiki links, embeds, tags, block anchors, block references, callouts, frontmatter, math, comments, and templater-like opaque regions. |
| `gfm` | GitHub Flavored Markdown | CommonMark plus GFM tables, task lists, strikethrough, autolinks, heading-anchor expectations, and GitHub alert syntax. |
| `glfm` | GitLab Flavored Markdown | GFM-compatible core plus GitLab task markers, footnotes, description lists, math, diagrams, alerts, TOC tags, includes, and GitLab host references. |
| `pandoc` | Pandoc Markdown | Metadata blocks, citations, footnotes, math, attributes, tables, cross references, fenced divs, and definition lists. |
| `multimarkdown` | MultiMarkdown | Metadata, tables, footnotes, citations, cross references, math, and labels. |
| `mdx` | MDX | Markdown plus JSX elements, JSX expressions, ESM declarations, and component references as inert content pipeline input. |
| `kramdown` | kramdown | kramdown blocks, attribute lists, definition lists, tables, footnotes, math, and header ids. |
| `markdown-extra` | Markdown Extra | Tables, definition lists, footnotes, abbreviations, fenced code blocks, and attribute blocks. |
| `r-markdown` | R Markdown | YAML metadata, code chunks, inline R, chunk labels, chunk options, cross references, and citations as non-executing input. |
| `reddit` | Reddit Markdown | Common prose Markdown plus spoilers, superscript, Reddit line breaks, tables, and host references. |
| `stack-overflow` | Stack Overflow Markdown | CommonMark-oriented technical writing with fenced or indented code, language hints, tables, spoilers, and Stack Exchange host references. |

`auto` is intentionally excluded from the Commonloom public flavor union. Auto
detection belongs in adapters or tools before a Commonloom run begins.

## Structured Profiles

Flavor Grenade also models `keep-a-changelog`, `common-changelog`, and `madr`
as structured profile flags. These are not base Markdown flavors.

Commonloom should not add them to `CommonloomMarkdownFlavor`. If Commonloom later
supports structured document profiles, they should be specified as a separate
single-run profile policy and must not permit multiple base Markdown flavors in
one run.

## Public Contract Changes

Add owned Commonloom flavor contracts to `src/types.ts` or a dedicated exported
module:

```ts
export const commonloomMarkdownFlavors = [
  'original',
  'commonmark',
  'obsidian',
  'gfm',
  'glfm',
  'pandoc',
  'multimarkdown',
  'mdx',
  'kramdown',
  'markdown-extra',
  'r-markdown',
  'reddit',
  'stack-overflow',
] as const;

export type CommonloomMarkdownFlavor =
  (typeof commonloomMarkdownFlavors)[number];

export interface CommonloomMarkdownPolicy {
  flavor?: CommonloomMarkdownFlavor;
}
```

Extend `CommonloomConfig` with:

```ts
markdown?: CommonloomMarkdownPolicy;
```

The default policy should preserve current behavior. Since current Commonloom
uses `remark-parse` plus `remark-gfm`, the compatibility default should be
`gfm`.

## One-Flavor Run Rule

Commonloom should resolve one `CommonloomMarkdownFlavor` before compiling any
manifest entries.

Rules:

- A compile run has one effective flavor.
- Manifest entries must not override the run flavor.
- Parser, renderer, source trace, link extraction, media extraction, and
  diagnostics must all receive the same effective flavor.
- Conflicting future inputs must produce a diagnostic before any document is
  compiled.
- Adapters may run Commonloom more than once when they intentionally need
  different flavors.

## Parser And Renderer Changes

The module-level singleton in `src/markdown.ts` should be replaced with a
flavor-aware processor factory.

Required shape:

1. Resolve `config.markdown?.flavor ?? 'gfm'`.
2. Validate the value against `commonloomMarkdownFlavors`.
3. Construct or retrieve a processor for the flavor.
4. Pass the effective flavor into `parseMarkdown`.
5. Pass the parsed flavor state into `renderMarkdownHtml`.
6. Use the same flavor state for source trace extraction.

The factory may cache processors by flavor, but the cache key must be the
explicit flavor id.

## Feature Semantics

Each flavor should classify syntax into four buckets:

| Bucket | Meaning |
| --- | --- |
| Active syntax | Syntax Commonloom parses, renders, traces, or diagnoses as first-class behavior for that flavor. |
| Inert syntax | Syntax that may look meaningful in another flavor but should be treated as plain Markdown or plain text in this flavor. |
| Host-specific syntax | Syntax that identifies references or concepts owned by a host service, renderer, or runtime. Commonloom may classify it but must not resolve or execute it directly. |
| Opaque regions | Regions where Commonloom should avoid recursive Markdown interpretation, such as code, math, JSX, ESM, R chunks, comments, or renderer-specific attribute blocks. |

The first implementation does not need every flavor to have full semantic HTML
parity on day one, but each accepted mode must have an explicit behavior table,
fixtures, and diagnostics for unsupported constructs. Silent fallback to `gfm`
would be misleading and should not be accepted.

## Link And Media Tracing Changes

Flavor mode affects reference extraction:

- `obsidian` activates wiki links, embeds, block references, tags, and local
  attachment references.
- `gfm`, `glfm`, `reddit`, and `stack-overflow` may expose host references, but
  Commonloom should classify them as host-specific unless an adapter resolves
  them through the existing link policy.
- `mdx` imports, JSX component names, and ESM declarations are code references,
  not normal Markdown links.
- `r-markdown` chunks and inline R expressions are opaque, non-executing
  regions.
- `pandoc`, `multimarkdown`, `kramdown`, and `markdown-extra` add citation,
  footnote, attribute, and cross-reference constructs that should be traced only
  when the selected flavor makes them active.

## Diagnostics Changes

Add stable diagnostics before implementing parser behavior:

| Code | Severity | Use |
| --- | --- | --- |
| `MARKDOWN_FLAVOR_UNSUPPORTED` | `error` | A supplied flavor value is not in the Commonloom-owned flavor union. |
| `MARKDOWN_FLAVOR_CONFLICT` | `error` | More than one effective base flavor is requested in one run. |
| `MARKDOWN_FLAVOR_UNIMPLEMENTED` | `warning` or `error` | A recognized flavor is exposed before its parser, renderer, or trace behavior is complete. |

`MARKDOWN_INVALID` should remain for malformed Markdown or resource-limit
failures after a valid flavor policy has been resolved.

## Safety Requirements

Flavor modes must keep the existing Commonloom safety boundary:

- Do not execute MDX JavaScript, JSX expressions, ESM imports, R code chunks,
  Pandoc filters, diagram directives, GitLab includes, or host references.
- Do not perform network requests while parsing, rendering, or tracing.
- Keep local path resolution inside configured roots.
- Keep unsafe inline HTML controlled by `CommonloomHtmlPolicy`.
- Keep large or ambiguous syntax handling inside existing resource limits.

## Acceptance Evidence

A future implementation should add:

- unit fixtures for every explicit flavor id
- processor selection tests that prove the default remains `gfm`
- compile-run tests proving one flavor applies across all manifests
- negative tests for unsupported and conflicting flavor config
- source trace tests for flavor-specific links, embeds, host references, and
  opaque regions
- security tests proving MDX and R Markdown constructs are parsed without
  execution
- requirements matrix rows for each new requirement

## See Also

- [[Commonloom Architecture]]
- [[requirements/functional/markdown-and-frontmatter]]
- [[requirements/technical/schema-and-type-contracts]]
- [[requirements/technical/tooling-and-dependencies]]
- [[tests/requirements-matrix]]
