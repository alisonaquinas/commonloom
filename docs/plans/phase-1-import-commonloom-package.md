---
id: PHASE-001
title: "Phase 1: Import Commonloom Package And Tests"
phase: 1
status: planned
tags:
  - commonloom
  - plans
  - phase-1
aliases:
  - Phase 1
  - PHASE-001
  - Import Commonloom Package And Tests
updated: 2026-05-10
---

# Phase 1: Import Commonloom Package And Tests

| Field | Value |
| --- | --- |
| Phase | 1 |
| Title | Import Commonloom Package And Tests |
| Status | planned |
| Gate | Standalone source, tests, package scripts, and CI checks pass locally |
| Depends on | [[Commonloom Extraction Plan]] |

## Objective

Import the complete upstream Commonloom compiler package from Flavor Grenade
into this standalone repository. The source target is `src/`. The test target
is `test/`.

The phase is complete when Commonloom's core modules and Commonloom-relevant
tests run locally without depending on Flavor Grenade website routes, Svelte
components, product data, generated renderer files, or website-specific
manifest contracts.

## Source Inventory

Verified upstream source location:

`C:\Users\aaqui\obsidian-stack\flavor-grenade-lsp\website\src\content\pipeline\commonloom`

Upstream modules to import:

- `compiler.ts`
- `diagnostics.ts`
- `frontmatter.ts`
- `hash.ts`
- `html.ts`
- `index.ts`
- `links.ts`
- `markdown.ts`
- `media.ts`
- `paths.ts`
- `source-trace.ts`
- `types.ts`

Commonloom-relevant upstream tests to evaluate and port:

- `content-pipeline-core.test.ts`
- `content-pipeline-markdown.test.ts`
- `content-pipeline-html.test.ts`
- `content-pipeline-links-media.test.ts`
- `content-pipeline-manifest.test.ts`
- `content-pipeline-migration.test.ts`
- `content-pipeline-parity.test.ts`
- `content-pipeline-generated-from-markdown.test.ts`
- `content-pipeline-generated-ts.test.ts`
- `content-pipeline-renderer-generated.test.ts`
- `content-pipeline-scripts.test.ts`

## Scope

### In Scope

- Create standalone TypeScript package scaffolding for source and tests.
- Import the upstream `commonloom` core modules into `src/`.
- Port Commonloom-only tests into `test/`.
- Identify and remove website-specific imports from core tests.
- Keep adapter-owned tests separate from core package tests.
- Add local build, typecheck, and test scripts.
- Update CI to run package checks after scripts exist.

### Out Of Scope

- Importing Flavor Grenade public copy.
- Importing Svelte components.
- Importing website route registries.
- Importing product data.
- Importing generated website renderer files as source of truth.
- Publishing to npm.
- Changing accepted ADR decisions.

## Workstreams

| Workstream | Deliverable |
| --- | --- |
| Inventory | Exact upstream source, tests, fixtures, and dependency map |
| Scaffold | Standalone TypeScript, Vitest, and package script baseline |
| Source Import | Commonloom modules copied into `src/` with public exports |
| Test Import | Commonloom-relevant tests ported into `test/` |
| Decoupling | Website-specific assumptions removed or isolated |
| Verification | Local checks and CI gates wired for imported package |

## Acceptance

- `src/` contains the standalone Commonloom core modules.
- `test/` contains Commonloom-relevant tests ported from Flavor Grenade.
- `package.json` exposes verified scripts for build, typecheck, lint, and test.
- CI runs documentation lint and package checks on git-flow branches.
- No core source imports Flavor Grenade website modules.
- Tickets include closure evidence before phase completion.

## Gate Verification

```bash
npm run lint:docs
npm run typecheck
npm test
npm run build
```

## Tickets

- [[plans/phase-1-import-commonloom-package/FEAT-001]]
- [[plans/phase-1-import-commonloom-package/TASK-001]]
- [[plans/phase-1-import-commonloom-package/TASK-002]]
- [[plans/phase-1-import-commonloom-package/TASK-003]]
- [[plans/phase-1-import-commonloom-package/TASK-004]]
- [[plans/phase-1-import-commonloom-package/TASK-005]]
- [[plans/phase-1-import-commonloom-package/TASK-006]]
- [[plans/phase-1-import-commonloom-package/CHORE-001]]

## Related

- [[roadmap|Commonloom Roadmap]]
- [[Commonloom Extraction Plan]]
- [[Commonloom Requirements]]
- [[Commonloom Architecture]]
- [[adr/0001-keep-commonloom-adapter-neutral|ADR 0001]]
- [[adr/0004-build-on-unified-remark-rehype-and-zod|ADR 0004]]
- [[sources/flavor-grenade-lsp/website/docs/architecture/content-pipeline|content pipeline architecture]]
- [[sources/flavor-grenade-lsp/docs/plans/phase-W8-commonloom-content-pipeline/index|W8 ticket index]]

## Workflow Log

> [!INFO] Planned · 2026-05-10
> Phase 1 was opened to move Commonloom from proven Flavor Grenade W8 code into
> this standalone package repository.
