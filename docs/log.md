---
title: Commonloom Vault Log
tags:
  - commonloom
  - log
  - llm-wiki
status: active
updated: 2026-05-10
aliases:
  - Vault Log
---

# Commonloom Vault Log

## [2026-05-10] import | Flavor Grenade Commonloom sources

Imported Commonloom-relevant source documents from
`C:\Users\aaqui\obsidian-stack\flavor-grenade-lsp` into
[[sources/index|Source Imports]].

Covered sources include W8 phase planning, W8 tickets, the content-pipeline
architecture note, ADR 0002, technical requirements, authoring guidance, and
technology research.

## [2026-05-10] scaffold | Obsidian LLM wiki

Created the `docs/` vault schema, Obsidian config, index, log, source catalog,
and synthesized notes for [[Commonloom]], [[Commonloom Architecture]],
[[Commonloom Requirements]], [[adr|Commonloom ADRs]], and
[[Commonloom Extraction Plan]].

## [2026-05-10] import | Commonloom ADRs

Imported the contextual website stack ADR 0001 and split the Commonloom-relevant
parts of website ADR 0002 into MADR-style records under [[adr]].
Removed the older synthesized `docs/decisions/` note because the ADR directory
is now the durable decision log.

## [2026-05-10] requirements | Split Commonloom requirements surface

Expanded [[Commonloom Requirements]] into user, functional, technical, and
operational requirement folders.
Imported additional Flavor Grenade source requirements for public content,
metadata, LLM wiki standards, CI/CD, code quality, parser safety, input
validation, path confinement, and supply-chain controls.

## [2026-05-10] requirements | Add Node 24 and npm trusted publishing

Added operational requirements that all Commonloom CI/CD jobs use Node.js 24
and that npm package publication uses OIDC trusted publishing.
Verified npm trusted publishing workflow requirements from current npm
documentation via Context7.

## [2026-05-10] requirements | Add git-flow branch naming

Added an operational requirement for git-flow branch naming standards:
`main`, `develop`, `feature/*`, `release/*`, and `hotfix/*`.
Imported the upstream Flavor Grenade git-flow ADR as source evidence.

## [2026-05-10] requirements | Import phase execution procedure

Imported Flavor Grenade's phase execution procedure and adapted its durable
process rules into [[requirements/operational/phase-execution|phase-execution]].
Recorded requirements for sequential phases, explicit ownership, ticket
lifecycle states, test-first work, sweep ticketing, CI gate evidence, and
retrospectives.

## [2026-05-10] requirements | Import ticket templates

Imported the Flavor Grenade ticket template directory and adapted its template
and lifecycle rules into [[task-management]].
Recorded requirements for typed tickets, stable IDs, trace links, red-green
task lifecycle, append-only workflow logs, blockers, and closure evidence.

## [2026-05-10] ddd | Document Commonloom domain model

Added [[ddd/index|Commonloom DDD]] notes for domains, bounded contexts,
ubiquitous language, context map, and tactical model.
Grounded the model in the adapter-neutral ADRs, architecture boundary, and
requirements surface.

## [2026-05-10] bdd | Document Commonloom behavior examples

Added [[bdd/index|Commonloom BDD]] notes for actors, scenario catalog, and
Cucumber-style feature specifications.
Mapped content authoring, adapter integration, compilation safety, diagnostics,
source traces, documentation governance, tickets, phase gates, CI, and release
publishing behaviors back to the requirements surface.

## [2026-05-10] ci | Add documentation lint workflow

Added a GitHub Actions documentation lint workflow on
[[requirements/operational/release-and-ci|git-flow branches]].
Configured standard Markdown linting for repository Markdown outside `docs/`
and Obsidian-aware linting for maintained vault notes under `docs/`.

## [2026-05-10] roadmap | Open Phase 1 import plan

Initialized [[roadmap|Commonloom Roadmap]] with
[[plans/phase-1-import-commonloom-package|Phase 1]] and
[[plans/phase-1-import-commonloom-package/index|Phase 1 Tickets]].
Authored the phase summary and tickets for importing Commonloom source into
`src/` and Commonloom-relevant tests into `test/`.

## [2026-05-10] plans | Mirror Flavor Grenade phase structure

Moved Phase 1 implementation planning under `docs/plans/` to match the Flavor
Grenade phase layout: a top-level phase summary plus a same-named ticket folder.

## [2026-05-10] requirements | Clarify operational process rules

Updated operational requirements after opening Phase 1.
Made `docs/plans/<phase-slug>.md` plus `docs/plans/<phase-slug>/index.md`
the explicit phase layout, clarified ticket storage and ID rules, and recorded
that lint warnings are blocking unless a rule change is explicitly approved.
Clarified that ticket workflow updates may be committed with the work that
prompted them, but must not remain uncommitted across unrelated work.

## [2026-05-10] phase | Start Phase 1 import

Started [[plans/phase-1-import-commonloom-package|Phase 1]] execution.
Completed [[plans/phase-1-import-commonloom-package/TASK-001|TASK-001]] by
recording the upstream Commonloom source inventory, core-test classification,
adapter-owned test exclusions, and dependency inventory.

## [2026-05-10] phase | Add package scaffold

Implemented [[plans/phase-1-import-commonloom-package/TASK-002|TASK-002]] with
TypeScript, Vitest, ESLint, build/typecheck/test/lint scripts, package export
metadata, `src/`, and `test/` scaffolding.

## [2026-05-10] phase | Import Commonloom source

Implemented [[plans/phase-1-import-commonloom-package/TASK-003|TASK-003]] by
copying all upstream Commonloom core modules into local `src/` and adapting
relative imports for the standalone Node ESM package build.
