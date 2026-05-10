---
title: Commonloom Extraction Plan
tags:
  - commonloom
  - plans
  - extraction
status: draft
updated: 2026-05-10
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

This repository should receive:

- Commonloom source modules
- Commonloom unit tests
- public API exports
- package scaffold and build scripts
- README examples once commands are real
- extracted architecture and requirements notes from this vault

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

1. Add package scaffold.
2. Port Commonloom source modules.
3. Port Commonloom-only tests.
4. Remove or isolate Flavor Grenade adapter dependencies.
5. Define the public API surface.
6. Replace bootstrap README command gaps with verified local commands.

## Local Phase Plan

| Phase | Focus | Status |
| --- | --- | --- |
| Phase 1 | package scaffold, source port, unit test library, and strict TypeScript baseline | planned |
| [[phase-2-ci-quality-gates|Phase 2]] | strict TypeScript linting and full unit test runs in CI | draft |
| Later phase | CD, release automation, and package publishing | reserved |

Phase 2 is intentionally validation-only.
It wires lint, typecheck where available, and complete unit test execution into
CI without creating release, deployment, or publish jobs.

## Evidence

- [[sources/flavor-grenade-lsp/docs/plans/phase-W8-commonloom-content-pipeline|Phase W8 plan]]
- [[sources/flavor-grenade-lsp/docs/plans/phase-W8-commonloom-content-pipeline/index|W8 ticket index]]
- [[sources/flavor-grenade-lsp/docs/roadmap|Roadmap]]
- [[sources/flavor-grenade-lsp/docs/plans/execution-ledger|Execution ledger]]

## See Also

- [[Commonloom]]
- [[Commonloom Architecture]]
- [[Commonloom Requirements]]
