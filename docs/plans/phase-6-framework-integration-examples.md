---
title: Phase 6 - Framework Integration Examples
tags:
  - commonloom
  - plans
  - phase-6
  - examples
  - framework-integration
status: done
updated: 2026-05-11
aliases:
  - Phase 6
  - Framework Integration Examples
---

# Phase 6 - Framework Integration Examples

Phase 6 proves Commonloom is decoupled from any particular TypeScript-based
application framework by building adopter-facing examples over the same shared
content, styles, and assets.

## Objective

Create a framework-neutral example suite where the only meaningful difference
between examples is the backing technology. If an example uncovers Commonloom
coupling that makes integration awkward, fixing that coupling is in scope for
this phase.

## Framework Documentation Baseline

Current framework docs were checked through Context7 on 2026-05-11.

| Framework Area | Context7 Library ID | Planning Query |
| --- | --- | --- |
| React, Vue, and Svelte with Vite | `/vitejs/vite` | Current minimal commands and conventions for TypeScript React, Vue, and Svelte examples with local dev preview and build commands. |
| Next.js | `/vercel/next.js` | Current minimal conventions for a TypeScript Next.js example app, including local development and production build commands. |
| Angular | `/websites/angular_dev` | Current minimal conventions for an Angular TypeScript example app, including local serve and production build commands. |

Node integration uses the local Node.js 24 runtime requirement already recorded
in [[requirements/operational/release-and-ci|Release And CI]].
Implementation tickets should re-check current framework docs when adding
framework package metadata or CLI commands.

## Scope

Phase 6 includes:

- a shared `examples/` content, SCSS, and asset substrate
- a simple Svelte integration example
- a simple Vue integration example
- a simple Next.js integration example
- a simple Angular integration example
- a simple React integration example
- a simple Node integration example
- local build and preview instructions for every example
- verification that each example consumes published Commonloom package exports
  rather than internal source paths
- coupling fixes discovered while building the examples

Phase 6 does not include:

- a production documentation site
- framework-specific packages published to npm
- generated adapters that become part of the core runtime
- divergent example content, styling, or assets per framework

## Example Contract

Every example shall use the same shared materials:

- `examples/shared/content/` for Markdown and frontmatter fixtures
- `examples/shared/styles/` for shared SCSS
- `examples/shared/assets/` for the Commonloom logo and any example graphics
- the same rendered content structure and visual treatment
- local instructions for install, build, dev preview, and production preview

Each framework example may contain only the glue required by that framework:

- framework entrypoint and component shell
- adapter code that maps Commonloom output to the framework view layer
- framework-native configuration
- README instructions for that example

## Lifecycle Statuses

Phase 6 tickets use these statuses:

- `planned`: work is defined but not started.
- `active`: work is in progress.
- `blocked`: work cannot proceed until a named blocker is resolved.
- `in-review`: implementation is complete and awaiting review or CI evidence.
- `done`: work is complete and verified.
- `deferred`: work is intentionally moved out of Phase 6 with rationale.
- `cancelled`: work is no longer valid or needed.

Terminal statuses are `done`, `deferred`, and `cancelled`. The phase cannot
close while any ticket is `planned`, `active`, `blocked`, or `in-review`.

## Work Items

| ID | Work Item | Acceptance |
| --- | --- | --- |
| P6-001 | Define shared example substrate. | Shared content, SCSS, and assets live under `examples/shared/` and are consumed by every example. |
| P6-002 | Define example workspace and dependency strategy. | Examples consume the published package through public exports and have repeatable install/build commands. |
| P6-003 | Build React integration example. | React example renders the shared content and documents dev/build/preview commands. |
| P6-004 | Build Vue integration example. | Vue example renders the shared content and documents dev/build/preview commands. |
| P6-005 | Build Svelte integration example. | Svelte example renders the shared content and documents dev/build/preview commands. |
| P6-006 | Build Next.js integration example. | Next.js example renders the shared content and documents dev/build/preview commands. |
| P6-007 | Build Angular integration example. | Angular example renders the shared content and documents serve/build/production-preview commands. |
| P6-008 | Build Node integration example. | Node example compiles the shared content and shared SCSS without a browser framework and documents run/build commands. |
| P6-009 | Remediate framework coupling. | Any Commonloom coupling discovered by examples is fixed through focused source and test changes. |
| P6-010 | Verify example parity and CI coverage. | Example builds and parity checks are wired into local validation or documented with explicit rationale. |
| P6-011 | Document adopter guidance. | Root or examples documentation explains when to use Commonloom directly and when to write an adapter. |
| P6-012 | Complete phase closeout. | Tickets, roadmap, validation, CI evidence, and retrospective are updated before completion. |

## Tickets

- [[plans/phase-6-framework-integration-examples/FEAT-001]]
- [[plans/phase-6-framework-integration-examples/TASK-001]]
- [[plans/phase-6-framework-integration-examples/TASK-002]]
- [[plans/phase-6-framework-integration-examples/TASK-003]]
- [[plans/phase-6-framework-integration-examples/TASK-004]]
- [[plans/phase-6-framework-integration-examples/TASK-005]]
- [[plans/phase-6-framework-integration-examples/TASK-006]]
- [[plans/phase-6-framework-integration-examples/TASK-007]]
- [[plans/phase-6-framework-integration-examples/TASK-008]]
- [[plans/phase-6-framework-integration-examples/TASK-009]]
- [[plans/phase-6-framework-integration-examples/TASK-010]]
- [[plans/phase-6-framework-integration-examples/TASK-011]]
- [[plans/phase-6-framework-integration-examples/CHORE-001]]
- [[plans/phase-6-framework-integration-examples/CHORE-002]]
- [[plans/phase-6-framework-integration-examples/CHORE-003]]
- [[plans/phase-6-framework-integration-examples/CHORE-004]]
- [[plans/phase-6-framework-integration-examples/CHORE-005]]
- [[plans/phase-6-framework-integration-examples/CHORE-006]]
- [[plans/phase-6-framework-integration-examples/CHORE-007]]
- [[plans/phase-6-framework-integration-examples/CHORE-008]]
- [[plans/phase-6-framework-integration-examples/CHORE-009]]
- [[plans/phase-6-framework-integration-examples/CHORE-010]]

## Acceptance Criteria

- [x] Shared SCSS, content, and assets exist under `examples/shared/`.
- [x] React, Vue, Svelte, Next.js, Angular, and Node examples use the shared
      materials.
- [x] Each example documents install, build, and local preview or run commands.
- [x] Example-specific code is limited to framework integration glue.
- [x] Commonloom source changes are made only when examples reveal coupling.
- [x] Coupling fixes include tests or verification evidence.
- [x] Local validation passes.
- [x] Remote CI evidence is captured before completion.

## Evidence

- [[adr/0001-keep-commonloom-adapter-neutral|ADR 0001]]
- [[Commonloom Architecture]]
- [[requirements/technical/library-boundary|Library Boundary]]
- [[tests/requirements-matrix|Requirements Test Matrix]]

## Workflow Log

> [!INFO] Planned · 2026-05-11
> Phase 6 planning started on `feature/phase-6-framework-examples`.

> [!INFO] Active · 2026-05-11
> Phase 6 execution started on
> `feature/phase-6-framework-examples-implementation` from `origin/develop`
> after the `0.1.0` release and Phase 6 planning PR were merged.

> [!SUCCESS] Done · 2026-05-11
> Phase 6 completed with shared-content examples for React, Vue, Svelte,
> Next.js, Angular, and Node; `npm run examples:check` wired into local and CI
> validation; and passing PR 15 GitHub Actions evidence:
> <https://github.com/alisonaquinas/commonloom/actions/runs/25687047698/job/75413431464>
> and
> <https://github.com/alisonaquinas/commonloom/actions/runs/25687065066/job/75413489173>.
