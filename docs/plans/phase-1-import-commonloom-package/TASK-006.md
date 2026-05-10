---
id: TASK-006
title: Wire Local Checks And CI
type: task
status: planned
priority: high
phase: PHASE-001
parent: FEAT-001
created: 2026-05-10
updated: 2026-05-10
dependencies:
  - TASK-002
  - TASK-003
  - TASK-004
  - TASK-005
tags:
  - tickets/task
  - plans/phase-1
aliases:
  - TASK-006
---

# TASK-006: Wire Local Checks And CI

## Description

Extend local scripts, pre-commit checks, and GitHub Actions so imported source
and tests are validated with the documentation checks.

## Work Scope

- add package build, lint, typecheck, and test scripts to CI
- keep documentation lint and ADR lint in the pre-commit path
- ensure CI uses Node.js 24
- ensure package checks run on git-flow branches
- keep npm install behavior compatible with lockfile policy

The CI gate should match the checks contributors run locally.

## Acceptance

- CI runs documentation lint, ADR lint, package lint, typecheck, build, and
  tests where scripts exist.
- Pre-commit blocks commits when the configured local checks fail.
- CI passes on the Phase 1 implementation branch.
- Release and publish workflows remain out of scope for this phase.

Acceptance requires passing checks without hiding failures.

## Verification

- `npm run lint:docs`
- `npm run lint`
- `npm run typecheck`
- `npm run build`
- `npm test`
- GitHub Actions check on the pull request

Verification evidence should be copied into the phase workflow log.

## Workflow Log

- 2026-05-10: Opened in planned status.
