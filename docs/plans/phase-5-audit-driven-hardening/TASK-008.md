---
id: TASK-008
title: Isolate Test Temporary Directories
type: task
status: planned
priority: medium
phase: 5
parent: FEAT-001
created: 2026-05-11
updated: 2026-05-11
dependencies: []
tags:
  - tickets/task
  - plans/phase-5
  - tests
  - maintainability
aliases:
  - TASK-008
---

# TASK-008: Isolate Test Temporary Directories

## Description

Move test scratch data out of persistent `node_modules/.tmp-*` directories and
into isolated temporary directories with cleanup.

## Audit Findings

- [[audits/code-quality-audit#CQ-004 - Medium - Tests Share Persistent Temporary Paths|CQ-004]]

## Work Scope

- replace fixed temp paths with per-test temporary directories
- clean up scratch data in `finally` or test lifecycle hooks
- keep fixtures deterministic

## Acceptance

- Tests can run repeatedly without stale scratch state.
- Tests do not write temporary data into `node_modules`.
- `npm run check` passes.

## Workflow Log

- 2026-05-11: Planned from Phase 5 audit findings.

> [!SUCCESS] Done · 2026-05-11
> Status set to done. Implemented during Phase 5 execution. `npm run check` passed locally after the change.
