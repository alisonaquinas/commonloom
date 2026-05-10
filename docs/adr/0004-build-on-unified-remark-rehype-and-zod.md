---
status: accepted
date: 2026-05-10
decision-makers: Alison Aquinas
consulted: Codex
informed: Future Commonloom contributors
---

# Build On Unified Remark Rehype And Zod

## Context and Problem Statement

Commonloom needs programmable Markdown parsing, GFM support, frontmatter
extraction, inline HTML sanitization, AST inspection, source traces, diagnostics,
and schema validation.
The upstream W8 research compared Svelte and Vite Markdown plugins against a
project-owned TypeScript generator.

The decision question is: which foundation should the standalone Commonloom
content compiler use?

## Decision Drivers

- Commonloom needs validated content compilation, not Markdown-as-component
  imports.
- AST access is required for headings, links, images, source traces, and
  diagnostics.
- Inline HTML needs an allowlist and unsafe HTML diagnostics.
- Frontmatter and manifests need schema validation.
- Tooling should be mature and not tied to Svelte component compilation.

## Considered Options

- Use unified, remark, rehype, and zod.
- Use MDsveX or MDSX as the primary pipeline.
- Use a Vite Markdown import plugin.
- Hand-roll Markdown parsing.

## Decision Outcome

Chosen option: "Use unified, remark, rehype, and zod".

Commonloom should build on the unified ecosystem for parsing, transforming, and
serializing Markdown and HTML syntax trees.
Use zod for caller-provided schema validation where runtime validation is
needed.

Expected packages from the upstream decision include:

- `unified`
- `remark-parse`
- `remark-gfm`
- `remark-frontmatter`
- `vfile-matter`
- `remark-rehype`
- `rehype-raw`
- `rehype-sanitize`
- `rehype-stringify`
- `unist-util-visit`
- `hast-util-to-string`
- `zod`

Optional packages include `rehype-slug`, `github-slugger`, and `shiki`.

### Consequences

- Good, because the parser pipeline is programmable and inspectable.
- Good, because mature packages handle Markdown and HTML syntax trees.
- Good, because Commonloom can collect diagnostics and source traces during
  compilation.
- Bad, because Commonloom must own generator and validation code instead of
  delegating to a single framework plugin.
- Bad, because package versions and security updates become part of the core
  maintenance surface.

## Confirmation

This decision is confirmed when:

- Markdown parsing and HTML rendering are implemented through unified-family
  processors.
- Link, image, heading, and source trace extraction use syntax tree traversal
  rather than ad hoc string parsing.
- Frontmatter or manifest validation accepts caller-owned schemas.
- MDsveX, MDSX, and Vite Markdown plugins are not the primary Commonloom
  pipeline.

## Pros and Cons of the Options

### Use Unified, Remark, Rehype, And Zod

- Good, because this matches the upstream W8 research.
- Good, because it supports source-aware transforms and diagnostics.
- Bad, because it requires more project-owned integration code.

### Use MDsveX Or MDSX

- Good, because they integrate Markdown with Svelte.
- Bad, because Commonloom is not a Svelte component compiler.
- Bad, because component compilation does not directly solve manifest-driven
  validation and normalized records.

### Use A Vite Markdown Import Plugin

- Good, because simple Markdown imports are quick to wire.
- Bad, because Commonloom needs batch compilation, source traces, wiki-link
  policy, media validation, and diagnostics.

### Hand-Roll Markdown Parsing

- Good, because behavior is fully controlled.
- Bad, because Markdown parsing is subtle and easy to get wrong.
- Bad, because it adds avoidable maintenance and security risk.

## More Information

- [[sources/flavor-grenade-lsp/website/docs/research/w8-content-pipeline-technology-research|W8 technology research]]
- [[sources/flavor-grenade-lsp/website/docs/adr/0002-use-page-group-markdown-manifests-for-website-copy|Flavor Grenade ADR 0002]]
- [[Commonloom Requirements]]
