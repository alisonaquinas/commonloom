---
id: TASK-009
title: Reconcile Diagnostic Contract
type: task
status: planned
priority: low
phase: 5
parent: FEAT-001
created: 2026-05-11
updated: 2026-05-11
dependencies: []
tags:
  - tickets/task
  - plans/phase-5
  - diagnostics
  - api
aliases:
  - TASK-009
---

# TASK-009: Reconcile Diagnostic Contract

## Description

Resolve public diagnostic codes that are exported but not currently emitted.

## Audit Findings

- [[audits/code-quality-audit#CQ-005 - Low - Public Diagnostic Codes Include Unreachable Categories|CQ-005]]

## Work Scope

- decide whether `MARKDOWN_INVALID` and `MANIFEST_INVALID` are active,
  reserved, or removable before first stable release
- implement emitters and tests, or document/remove reserved codes
- update README and requirements if the public contract changes

## Acceptance

- Public diagnostic codes match implemented or explicitly reserved behavior.
- Tests cover any newly emitted diagnostic codes.
- `npm run check` passes.

## Workflow Log

- 2026-05-11: Planned from Phase 5 audit findings.

> [!SUCCESS] Done · 2026-05-11
> Status set to done. Implemented during Phase 5 execution. `npm run check` passed locally after the change.
