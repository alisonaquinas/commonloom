---
title: Commonloom Vault Index
tags:
  - commonloom
  - index
  - llm-wiki
status: active
updated: 2026-05-10
aliases:
  - Commonloom Index
---

# Commonloom Vault Index

This vault is the maintained knowledge base for extracting [[Commonloom]] from
the Flavor Grenade website content pipeline into this standalone repository.

> [!NOTE] Navigation
> Start here, then follow links into synthesized notes. Use
> the [[sources/index|Source Imports]] catalog when you need source evidence.

## Core Notes

| Note | Purpose |
| --- | --- |
| [[Commonloom]] | Core identity, scope, and current extraction status. |
| [[Commonloom Architecture]] | Reusable core boundary, adapter boundary, and data flow. |
| [[Commonloom Requirements]] | User, functional, technical, and operational requirements. |
| [[adr|Commonloom ADRs]] | MADR-backed decisions and rejected alternatives. |
| [[ddd/index|Commonloom DDD]] | Domains, bounded contexts, ubiquitous language, and tactical model. |
| [[bdd/index|Commonloom BDD]] | Actors and Cucumber-style behavior specifications. |
| [[tests/index|Commonloom Test Battery]] | Test taxonomy, current automated battery, verification gate, and coverage gaps. |
| [[roadmap|Commonloom Roadmap]] | Implementation phases and active tickets. |
| [[Commonloom Extraction Plan]] | W8 migration and extraction plan summary. |
| [[phase-2-ci-quality-gates|Phase 2 CI Quality Gates]] | Completed Phase 2 plan for strict TypeScript linting and full unit test CI runs. |
| [[sources/index|Source Imports]] | Catalog of imported upstream source files. |
| [[log]] | Chronological vault maintenance record. |

## Current Thesis

Commonloom should be a reusable TypeScript content pipeline that compiles
Markdown, frontmatter, links, media, source traces, and diagnostics into
adapter-owned renderer records.

The core package should stay independent from Flavor Grenade route ids, Svelte
components, product copy, and generated website module formatting.

## Open Questions

- Which prototype APIs become stable public exports?
- Should Commonloom generate TypeScript itself, or expose normalized records and
  let adapters generate code?
- How much exact source-position data is required for first standalone release?

## Source Hubs

- [[sources/index|Source Imports]]
- [[sources/flavor-grenade-lsp/website/docs/architecture/content-pipeline|Imported architecture source]]
- [[sources/flavor-grenade-lsp/website/docs/adr/0001-use-vite-svelte-typescript-scss-and-github-pages-for-the-website|Imported ADR 0001]]
- [[sources/flavor-grenade-lsp/website/docs/adr/0002-use-page-group-markdown-manifests-for-website-copy|Imported ADR 0002]]
- [[sources/flavor-grenade-lsp/docs/plans/phase-W8-commonloom-content-pipeline|Imported W8 plan]]
