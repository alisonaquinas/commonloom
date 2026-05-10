---
status: accepted
date: 2026-05-10
decision-makers: Alison Aquinas
consulted: Codex
informed: Future Commonloom contributors
---

# Keep Commonloom Adapter-Neutral

## Context and Problem Statement

Commonloom began as the reusable content compiler boundary inside Flavor
Grenade's W8 website content pipeline.
The upstream implementation needed Markdown parsing, frontmatter parsing, HTML
sanitization, link and media analysis, source traces, diagnostics, and generated
website records.

The decision question is: should standalone Commonloom include Flavor Grenade
website behavior, or should it remain a reusable core with adapter-owned project
behavior?

## Decision Drivers

- Commonloom is intended to move from Flavor Grenade into a standalone
  repository.
- Other websites should be able to consume the core without inheriting Flavor
  Grenade routes, product copy, renderer records, or Svelte modules.
- W8 source evidence requires generic Markdown compilation modules to avoid
  Svelte components, website route modules, and Flavor Grenade product data.
- Route resolution, generated module names, and renderer compatibility are
  project-specific.

## Considered Options

- Keep Commonloom adapter-neutral.
- Move the full Flavor Grenade content pipeline into Commonloom.
- Split Commonloom into core plus a bundled Flavor Grenade adapter package now.

## Decision Outcome

Chosen option: "Keep Commonloom adapter-neutral".

Commonloom owns generic parsing, validation, source tracing, and normalized
content records.
Consuming adapters own route ids, page groups, wiki-link policy, generated file
formatting, renderer compatibility, and product-specific data.

### Consequences

- Good, because Commonloom can be extracted without carrying Flavor Grenade
  website implementation details.
- Good, because adapter callbacks can express project-specific route and
  wiki-link behavior.
- Good, because unit tests for the core can avoid Svelte and website route
  imports.
- Bad, because the core API needs clearer boundaries than a single-project
  internal pipeline would need.
- Bad, because the first adapter must carry code generation and renderer
  mapping work that a monolithic pipeline could hide.

## Confirmation

This decision is confirmed when:

- Commonloom source modules do not import Flavor Grenade route modules, Svelte
  components, or product data.
- Public Commonloom APIs accept project-specific route resolution, schema
  validation, approved roots, and output formatting through configuration or
  callbacks.
- Adapter-specific generated TypeScript formatting stays outside the core.
- Commonloom-only tests can run without website source modules.

## Pros and Cons of the Options

### Keep Commonloom Adapter-Neutral

- Good, because it matches the extraction intent.
- Good, because it keeps the standalone package reusable.
- Bad, because adapter authors must supply more configuration.

### Move The Full Flavor Grenade Content Pipeline Into Commonloom

- Good, because it is fastest to migrate one working implementation.
- Bad, because it would make Commonloom a renamed website subsystem.
- Bad, because future consumers would inherit irrelevant route and renderer
  assumptions.

### Bundle A Flavor Grenade Adapter Package Now

- Good, because it preserves a concrete adapter example.
- Bad, because this standalone repository does not yet have a package scaffold.
- Bad, because it may prematurely freeze adapter boundaries before extraction
  is proven locally.

## More Information

- [[sources/flavor-grenade-lsp/website/docs/adr/0002-use-page-group-markdown-manifests-for-website-copy|Flavor Grenade ADR 0002]]
- [[sources/flavor-grenade-lsp/website/docs/architecture/content-pipeline|Content pipeline architecture]]
- [[Commonloom Architecture]]
