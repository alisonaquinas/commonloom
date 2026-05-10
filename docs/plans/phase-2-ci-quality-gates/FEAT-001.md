---
id: FEAT-001
title: CI Quality Gates
type: feature
status: done
priority: high
phase: 2
created: 2026-05-10
updated: 2026-05-10
dependencies: []
tags:
  - tickets/feature
  - plans/phase-2
aliases:
  - FEAT-001
---

# FEAT-001: CI Quality Gates

## Description

Make Phase 2 prove Commonloom package quality through strict linting, typecheck,
build, and complete unit test execution.

## Scope

- enable type-aware TypeScript linting
- keep lint warnings blocking
- run the full unit test suite in CI
- keep CI validation-only
- document verified commands after they pass

This feature owns the Phase 2 quality gate boundary.

## Acceptance

- Child tickets reach terminal or review state.
- Local `npm run check` passes.
- GitHub Actions runs the same validation-only package gate.
- No release, deployment, or publish permission is introduced.

Acceptance closes only after remote CI evidence is captured.

## Child Tickets

- [[plans/phase-2-ci-quality-gates/TASK-001|TASK-001]]
- [[plans/phase-2-ci-quality-gates/TASK-002|TASK-002]]
- [[plans/phase-2-ci-quality-gates/TASK-003|TASK-003]]
- [[plans/phase-2-ci-quality-gates/CHORE-001|CHORE-001]]

## Linked Requirements

- [[requirements/operational/quality-gates|Quality Gates]]
- [[requirements/operational/release-and-ci|Release And CI]]
- [[requirements/operational/phase-execution|Phase Execution]]

## Workflow Log

- 2026-05-10: Opened in active status.
- 2026-05-10: Type-aware linting, CI gate verification, and command docs are
  locally complete. Status set to in-review pending remote CI evidence.
- 2026-05-10: Remote GitHub Actions passed for PR 6. Status set to done.
