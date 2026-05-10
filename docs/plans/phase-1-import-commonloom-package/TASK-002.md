---
id: TASK-002
title: Create Standalone Package Scaffold
type: task
status: in-review
priority: high
phase: PHASE-001
parent: FEAT-001
created: 2026-05-10
updated: 2026-05-10
dependencies:
  - TASK-001
tags:
  - tickets/task
  - plans/phase-1
aliases:
  - TASK-002
---

# TASK-002: Create Standalone Package Scaffold

## Description

Add the local TypeScript package structure needed to host Commonloom source and
tests.

## Work Scope

- create `src/`
- create `test/`
- add TypeScript configuration
- add Vitest or successor test configuration
- add package scripts for build, typecheck, lint, and test
- add exact dependencies where package manager policy requires them

The scaffold should stay behavior-neutral until source import starts.

## Acceptance

- `npm run build`, `npm run typecheck`, `npm run lint`, and `npm test` exist.
- Empty or scaffold-only checks pass before source import.
- Node.js 24 remains the CI runtime.
- Existing documentation lint scripts still pass.

Acceptance proves the package shell is ready for real Commonloom code.

## Verification

- `npm run lint:docs`
- `npm run build`
- `npm run typecheck`
- `npm test`

Verification should pass before TASK-003 begins.

## Workflow Log

- 2026-05-10: Opened in planned status.
- 2026-05-10: Added TypeScript, Vitest, ESLint, package scripts, and package
  metadata scaffold. Status set to green pending verification.
- 2026-05-10: Verified scaffold build and typecheck. Test command permits the
  temporary no-test state until TASK-004 ports the upstream tests.
- 2026-05-10: Full `npm run check` passes after source and tests were imported.
  Status set to in-review.
