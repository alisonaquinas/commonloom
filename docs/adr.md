---
title: Commonloom ADR Index
tags:
  - commonloom
  - adr
  - index
status: active
updated: 2026-05-10
aliases:
  - ADR Index
  - Commonloom Decisions
---

# Commonloom ADR Index

Architectural decisions for the standalone Commonloom repository.

These records use MADR-style structure and import the Commonloom-relevant
decisions from Flavor Grenade's W8 website content-pipeline ADRs.

## Decisions

| ADR | Status | Decision |
| --- | --- | --- |
| [[adr/0001-keep-commonloom-adapter-neutral|ADR 0001]] | accepted | Keep Commonloom as an adapter-neutral content compiler core. |
| [[adr/0002-use-page-group-manifests-as-adapter-inputs|ADR 0002]] | accepted | Support explicit page-group manifests as adapter-owned inputs. |
| [[adr/0003-keep-generated-typescript-adapter-owned|ADR 0003]] | accepted | Keep generated TypeScript as an adapter-owned output, not a core lock-in. |
| [[adr/0004-build-on-unified-remark-rehype-and-zod|ADR 0004]] | accepted | Build Commonloom on unified, remark, rehype, and zod. |

## Imported Evidence

- [[sources/flavor-grenade-lsp/website/docs/adr/0002-use-page-group-markdown-manifests-for-website-copy|Flavor Grenade website ADR 0002]]
- [[sources/flavor-grenade-lsp/website/docs/adr/0001-use-vite-svelte-typescript-scss-and-github-pages-for-the-website|Flavor Grenade website ADR 0001]]
- [[sources/flavor-grenade-lsp/website/docs/architecture/content-pipeline|Content pipeline architecture]]
- [[sources/flavor-grenade-lsp/website/docs/research/w8-content-pipeline-technology-research|W8 technology research]]

## See Also

- [[Commonloom]]
- [[Commonloom Architecture]]
- [[Commonloom Requirements]]
- [[Commonloom Extraction Plan]]
