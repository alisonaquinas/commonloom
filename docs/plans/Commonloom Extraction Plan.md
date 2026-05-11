---
title: Commonloom Extraction Plan
tags:
  - commonloom
  - plans
  - extraction
status: active
updated: 2026-05-11
aliases:
  - Phase W8
  - Commonloom Content Pipeline
  - Extraction Plan
---

# Commonloom Extraction Plan

The upstream W8 plan proves Commonloom inside Flavor Grenade before extracting
it into this standalone repository.

## Upstream W8 Scope

W8 moves website copy from hand-maintained TypeScript content modules into:

- Markdown copy files
- page-group TypeScript manifests
- content media roots
- generated TypeScript renderer records
- Commonloom reusable compiler core
- website adapter glue

## Standalone Extraction Scope

This repository has received:

- Commonloom source modules
- Commonloom unit, integration, end-to-end, and security tests
- public API exports
- package scaffold and build scripts
- extracted architecture and requirements notes from this vault
- README command examples backed by local scripts

It should not receive Flavor Grenade public copy, Svelte route code, product
assets, route ids, renderer compatibility facades, or website-specific generated
module formatting.

## Ticket Map

| Ticket | Standalone Relevance |
| --- | --- |
| [[sources/flavor-grenade-lsp/docs/plans/phase-W8-commonloom-content-pipeline/TASK-267|TASK-267]] | initial scaffold and compiler entrypoint |
| [[sources/flavor-grenade-lsp/docs/plans/phase-W8-commonloom-content-pipeline/TASK-268|TASK-268]] | core contracts and diagnostics |
| [[sources/flavor-grenade-lsp/docs/plans/phase-W8-commonloom-content-pipeline/TASK-269|TASK-269]] | Markdown and frontmatter parser |
| [[sources/flavor-grenade-lsp/docs/plans/phase-W8-commonloom-content-pipeline/TASK-270|TASK-270]] | HTML sanitization and source traces |
| [[sources/flavor-grenade-lsp/docs/plans/phase-W8-commonloom-content-pipeline/TASK-271|TASK-271]] | links, wiki-links, media, and path safety |
| [[sources/flavor-grenade-lsp/docs/plans/phase-W8-commonloom-content-pipeline/TASK-272|TASK-272]] | adapter boundary examples |
| [[sources/flavor-grenade-lsp/docs/plans/phase-W8-commonloom-content-pipeline/TASK-273|TASK-273]] | generated TypeScript model, likely adapter-owned |
| [[sources/flavor-grenade-lsp/docs/plans/phase-W8-commonloom-content-pipeline/TASK-276|TASK-276]] | authoring docs and extraction criteria |

## First Local Milestones

1. [x] Add package scaffold.
2. [x] Port Commonloom source modules.
3. [x] Port Commonloom-only tests.
4. [x] Remove or isolate Flavor Grenade adapter dependencies.
5. [x] Define the current public API surface.
6. [x] Replace bootstrap README command gaps with verified local commands.

## Current Local Evidence

- `src/` contains the imported Commonloom core modules.
- `test/` contains the ported core Commonloom behavior tests.
- `npm run check` runs docs lint, package lint, verification scripts,
  typecheck, build, and tests.
- Generated TypeScript output remains adapter-owned per
  [[adr/0003-keep-generated-typescript-adapter-owned|ADR 0003]].

## Local Phase Plan

| Phase | Focus | Status |
| --- | --- | --- |
| [[phase-1-import-commonloom-package|Phase 1]] | package scaffold, source port, unit test library, and strict TypeScript baseline | done |
| [[phase-2-ci-quality-gates|Phase 2]] | strict TypeScript linting and full package checks in CI | done |
| [[phase-3-close-testing-gaps|Phase 3]] | unit, integration, E2E, security, traceability, and process test gaps | done |
| [[phase-4-npm-trusted-publishing|Phase 4]] | CD, release automation, and npm OIDC trusted publishing | done |
| [[phase-5-audit-driven-hardening|Phase 5]] | audit-driven compiler, workflow, documentation, and requirements hardening | done |
| [[phase-6-framework-integration-examples|Phase 6]] | shared-content examples for framework-independent adoption | planned |

The current CI workflow runs validation plus package dry-run checks. Production
publishing remains isolated to version tags that point at the current `main`
head and pass the trusted-publishing workflow guard.

## Evidence

- [[sources/flavor-grenade-lsp/docs/plans/phase-W8-commonloom-content-pipeline|Phase W8 plan]]
- [[sources/flavor-grenade-lsp/docs/plans/phase-W8-commonloom-content-pipeline/index|W8 ticket index]]
- [[sources/flavor-grenade-lsp/docs/roadmap|Roadmap]]
- [[sources/flavor-grenade-lsp/docs/plans/execution-ledger|Execution ledger]]

## See Also

- [[Commonloom]]
- [[Commonloom Architecture]]
- [[Commonloom Requirements]]
