---
id: TASK-007
title: Build Angular Example
type: task
status: done
priority: medium
phase: 6
parent: FEAT-001
created: 2026-05-11
updated: 2026-05-11
dependencies:
  - TASK-001
  - TASK-002
tags:
  - tickets/task
  - plans/phase-6
  - angular
  - examples
aliases:
  - TASK-007
---

# TASK-007: Build Angular Example

## Description

Build a minimal Angular TypeScript example that renders the shared Commonloom
content and style substrate.

## Work Scope

- create the Angular example under `examples/angular/`
- use shared content, styles, and assets
- keep Angular-specific code limited to component, service, and app glue
- document install, serve, build, and production preview commands

## Acceptance

- The Angular example renders the shared content with the shared SCSS.
- The example imports Commonloom through public package exports.
- Local instructions include `ng serve` and `ng build` or package-script
  equivalents.
- Local instructions include a production preview path, such as
  `ng serve --configuration=production` or a documented static preview of the
  built output.
- Build verification passes locally or a blocker is recorded.

## Linked Requirements

- CLR-USER-010
- CLR-USER-012
- CLR-USER-013
- CLR-USER-014
- CLR-TECH-003
- CLR-TECH-004
- CLR-FUNC-080

## Evidence

- [[adr/0001-keep-commonloom-adapter-neutral|ADR 0001]]
- [[adr/0003-keep-generated-typescript-adapter-owned|ADR 0003]]
- [[requirements/user/adapter-development|Adapter Development]]
- [[requirements/technical/library-boundary|Library Boundary]]
- Context7 planning baseline: `/websites/angular_dev`.

## Workflow Log

- 2026-05-11: Planned from Phase 6 acceptance criteria.
- 2026-05-11: Started Angular example implementation. Status set to active.
- 2026-05-11: Added `examples/angular/` with Angular CLI build and serve
  configuration, a standalone component, shared Commonloom content generation,
  shared SCSS import, shared asset usage, and local dev/build/production
  preview instructions. Status set to done.
- 2026-05-11: Pinned the Angular example's local TypeScript dependency to
  `5.9.3` because `@angular/build@21.2.10` declares a `<6.0` peer range while
  the root Commonloom package remains on TypeScript `6.0.3`.
- 2026-06-14: Replaced Angular CLI build tooling with plain Vite and Angular
  JIT bootstrap after `npm audit --audit-level=moderate` reported
  `@angular/build` through vulnerable `esbuild` versions with no fixed Angular
  builder package available.
