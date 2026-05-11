---
title: Commonloom Vault Index
tags:
  - commonloom
  - index
  - llm-wiki
status: active
updated: 2026-05-11
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
| [[assets/index|Commonloom Assets]] | Git LFS-managed logos, icons, and source images. |
| [[Commonloom Architecture]] | Reusable core boundary, adapter boundary, and data flow. |
| [[Commonloom Requirements]] | User, functional, technical, and operational requirements. |
| [[adr|Commonloom ADRs]] | MADR-backed decisions and rejected alternatives. |
| [[ddd/index|Commonloom DDD]] | Domains, bounded contexts, ubiquitous language, and tactical model. |
| [[bdd/index|Commonloom BDD]] | Actors and Cucumber-style behavior specifications. |
| [[tests/index|Commonloom Test Battery]] | Test taxonomy, current automated battery, verification gate, and coverage gaps. |
| [[audits/index|Commonloom Audits]] | Phase 5 audit reports for code quality, security, documentation, and requirements. |
| [[roadmap|Commonloom Roadmap]] | Implementation phases and ticket status. |
| [[release|Release Operations]] | npm bootstrap, trusted publishing, and release runbook. |
| [[Commonloom Extraction Plan]] | W8 migration and extraction plan summary. |
| [[phase-2-ci-quality-gates|Phase 2 CI Quality Gates]] | Completed Phase 2 plan for strict TypeScript linting and full package CI checks. |
| [[phase-3-close-testing-gaps|Phase 3 Close Testing Gaps]] | Completed Phase 3 work closing the first requirements test matrix gaps. |
| [[phase-4-npm-trusted-publishing|Phase 4 npm Trusted Publishing]] | Active release automation and npm OIDC trusted publishing work. |
| [[phase-5-audit-driven-hardening|Phase 5 Audit Driven Hardening]] | Active audit-driven hardening discovery. |
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
- Which adapter examples should be documented before the first standalone
  release?
- How much exact source-position data is required for first standalone release?

## Source Hubs

- [[sources/index|Source Imports]]
- [[sources/flavor-grenade-lsp/website/docs/architecture/content-pipeline|Imported architecture source]]
- [[sources/flavor-grenade-lsp/website/docs/adr/0001-use-vite-svelte-typescript-scss-and-github-pages-for-the-website|Imported ADR 0001]]
- [[sources/flavor-grenade-lsp/website/docs/adr/0002-use-page-group-markdown-manifests-for-website-copy|Imported ADR 0002]]
- [[sources/flavor-grenade-lsp/docs/plans/phase-W8-commonloom-content-pipeline|Imported W8 plan]]
