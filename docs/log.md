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

## [2026-05-10] phase | Port Commonloom tests

Implemented [[plans/phase-1-import-commonloom-package/TASK-004|TASK-004]] by
porting the four core Commonloom upstream tests into local `test/` and removing
the temporary no-test allowance from `npm test`.

## [2026-05-10] phase | Remove website coupling

Implemented [[plans/phase-1-import-commonloom-package/TASK-005|TASK-005]] by
removing website-root examples from tests and keeping generated file output
configuration outside the core `CommonloomConfig` surface.

## [2026-05-10] phase | Wire package checks

Implemented [[plans/phase-1-import-commonloom-package/TASK-006|TASK-006]] by
adding `npm run check`, updating the pre-commit hook, and expanding GitHub
Actions to run documentation lint, package lint, typecheck, build, and tests on
Node.js 24.

## [2026-05-10] phase | Phase 1 local closeout

Completed local [[plans/phase-1-import-commonloom-package|Phase 1]] closeout
through [[plans/phase-1-import-commonloom-package/CHORE-001|CHORE-001]].
Updated concept, architecture, extraction plan, README, phase summary, roadmap,
and ticket evidence.
`npm run check` passes locally with documentation lint, package lint,
typecheck, build, and 12 Vitest assertions.

## [2026-05-10] plans | Draft Phase 2 CI quality gates

Added [[phase-2-ci-quality-gates]] to specify strict TypeScript linting and
full unit test execution in CI.
Updated the extraction plan and operational requirements to keep CD and package
publishing reserved for a later phase.

## [2026-05-10] phase | Start Phase 2 CI quality gates

Started [[plans/phase-2-ci-quality-gates|Phase 2]] execution on
`feature/phase-2-ci-quality-gates`.
Normalized the phase into the Commonloom plan layout with
[[plans/phase-2-ci-quality-gates/index|Phase 2 Tickets]].

## [2026-05-10] phase | Enable type-aware linting

Implemented [[plans/phase-2-ci-quality-gates/TASK-001|TASK-001]] by updating
ESLint to use `typescript-eslint` type-checked flat configs with
`projectService: true` for TypeScript files and no type-aware rules for
JavaScript config files.

## [2026-05-10] phase | Verify CI quality gate shape

Updated [[plans/phase-2-ci-quality-gates/TASK-002|TASK-002]] after confirming
the GitHub Actions workflow uses Node.js 24, read-only permissions, npm install,
and `npm run check` without release or publishing permissions.

## [2026-05-10] phase | Document Phase 2 commands

Updated [[plans/phase-2-ci-quality-gates/TASK-003|TASK-003]] by documenting
`npm ci`, `npm run check`, and focused quality commands in CONTRIBUTING while
keeping release and publishing work reserved for a later phase.

## [2026-05-10] phase | Phase 2 local closeout

Completed local [[plans/phase-2-ci-quality-gates|Phase 2]] closeout through
[[plans/phase-2-ci-quality-gates/CHORE-001|CHORE-001]].
`npm run check` passes locally with documentation lint, type-aware package
lint, typecheck, build, and 12 Vitest assertions.
Phase remains in review pending remote CI evidence.

## [2026-05-10] phase | Phase 2 remote CI evidence

Completed [[plans/phase-2-ci-quality-gates|Phase 2]] after GitHub Actions
passed for PR 6:
<https://github.com/alisonaquinas/commonloom/actions/runs/25642675440/job/75265702932>.

## [2026-05-10] tests | Document test battery taxonomy

Added [[tests/index|Commonloom Test Battery]] with dedicated unit,
integration, end-to-end, verification, and validation sections.
Classified the current Vitest files as unit tests, documented the active
`npm run check` verification gate, and recorded missing dedicated integration,
end-to-end, and validation suites as explicit gaps.

## [2026-05-10] tests | Add requirements test matrix

Added [[tests/requirements-matrix|Requirements Test Matrix]] to map current
user, functional, technical, and operational requirements to unit-test evidence,
verification gates, partial coverage, or explicit gaps.

## [2026-05-10] roadmap | Draft Phase 3 testing gap closure

Added [[plans/phase-3-close-testing-gaps|Phase 3]] and
[[plans/phase-3-close-testing-gaps/index|Phase 3 Tickets]] to close the current
unit, integration, end-to-end, verification, and validation gaps documented in
the requirements test matrix.

## [2026-05-11] phase | Start Phase 3 testing gap closure

Started [[plans/phase-3-close-testing-gaps|Phase 3]] execution on
`feature/document-test-battery`.

## [2026-05-11] phase | Close Phase 3 unit gap group

Completed [[plans/phase-3-close-testing-gaps/TASK-001|TASK-001]],
[[plans/phase-3-close-testing-gaps/TASK-002|TASK-002]], and
[[plans/phase-3-close-testing-gaps/TASK-003|TASK-003]] by expanding
Markdown/GFM, HTML safety, and link/media unit tests and updating the
requirements matrix.

## [2026-05-11] phase | Add Phase 3 compiler flow tests

Completed [[plans/phase-3-close-testing-gaps/TASK-004|TASK-004]],
[[plans/phase-3-close-testing-gaps/TASK-005|TASK-005]], and
[[plans/phase-3-close-testing-gaps/TASK-006|TASK-006]] by implementing
manifest-driven compilation, adding integration coverage, adding an E2E fixture
workflow, and updating the requirements matrix.

## [2026-05-11] phase | Add Phase 3 security and boundary checks

Completed [[plans/phase-3-close-testing-gaps/TASK-007|TASK-007]] and
[[plans/phase-3-close-testing-gaps/TASK-008|TASK-008]] by adding parser and
filesystem security tests, realpath media confinement, frontmatter size bounds,
and static boundary verification through `npm run verify`.

## [2026-05-11] phase | Add Phase 3 traceability and process checks

Completed [[plans/phase-3-close-testing-gaps/TASK-009|TASK-009]] and
[[plans/phase-3-close-testing-gaps/TASK-010|TASK-010]] by adding requirements
matrix validation, BDD requirement-link validation, and phase/ticket process
verification to `npm run verify`.

## [2026-05-11] phase | Phase 3 local closeout

Moved [[plans/phase-3-close-testing-gaps|Phase 3]] to in-review after all task
tickets reached done and local `npm run check` passed with documentation lint,
traceability/process verification, typecheck, build, and 25 Vitest tests.
Remote CI evidence remains required before marking the phase done.

## [2026-05-11] phase | Phase 3 remote closeout

Completed [[plans/phase-3-close-testing-gaps|Phase 3]] after GitHub Actions
passed for PR 7:
<https://github.com/alisonaquinas/commonloom/actions/runs/25644613719/job/75271020126>.

## [2026-05-11] docs | Reconcile current repository status

Updated root and vault documentation after Phase 3 completion so status,
quality-gate, test-battery, and phase-ledger claims reflect the current branch.
Reconciled Phase 1 from in-review to done using later passing PR 7 CI evidence.

## [2026-05-11] ci | Wire typed test battery into CI

Added `npm run test:unit`, `npm run test:integration`, `npm run test:e2e`, and
`npm run test:battery`.
Updated GitHub Actions to run lint, verification, typecheck, build, unit,
integration, and E2E steps explicitly while preserving `npm run check` as the
matching local gate.

## [2026-05-11] roadmap | Draft Phase 4 npm trusted publishing

Added [[plans/phase-4-npm-trusted-publishing|Phase 4]] and
[[plans/phase-4-npm-trusted-publishing/index|Phase 4 Tickets]] to plan release
automation and npm OIDC trusted publishing.
The plan records the required one-time manual `0.0.0` bootstrap publish before
npm trusted publisher authorization is configured.

## [2026-05-11] phase | Start Phase 4 npm trusted publishing

Started [[plans/phase-4-npm-trusted-publishing|Phase 4]] execution on
`feature/phase-4-npm-trusted-publishing`.

## [2026-05-11] phase | Audit Phase 4 publication metadata

Completed [[plans/phase-4-npm-trusted-publishing/TASK-001|TASK-001]] by
checking that `commonloom` is not currently published on npm and adding public
package metadata for release dry-runs.

## [2026-05-11] assets | Add Commonloom documentation assets

Added Commonloom logo, icon, and source PNG assets under [[assets/index]].
Configured Git LFS tracking for `docs/assets/*.png` and linked the primary logo
from [[Commonloom]].

## [2026-05-11] docs | Add GitHub-facing README

Added `.github/README.md` as a rich GitHub-flavored Markdown landing document
that links the Commonloom quality battery, documentation vault, requirements
matrix, and light/dark mode logo assets.
