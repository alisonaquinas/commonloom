---
id: TASK-010
title: Verify Example Parity And CI Coverage
type: task
status: planned
priority: high
phase: 6
parent: FEAT-001
created: 2026-05-11
updated: 2026-05-11
dependencies:
  - TASK-003
  - TASK-004
  - TASK-005
  - TASK-006
  - TASK-007
  - TASK-008
tags:
  - tickets/task
  - plans/phase-6
  - ci
  - verification
aliases:
  - TASK-010
---

# TASK-010: Verify Example Parity And CI Coverage

## Description

Add verification that examples stay aligned with the shared substrate and are
covered by local or CI validation.

## Work Scope

- define parity checks for shared content, SCSS, and assets
- add example build checks to `npm run check` or a documented example-specific
  validation command
- decide which preview steps are local-only and which can run in CI
- update CI if example builds become part of the required battery

## Acceptance

- Example validation is repeatable from the repository root.
- CI covers example builds unless a documented constraint makes a check
  local-only.
- Parity checks make divergent content, style, or asset copies visible.
- Validation evidence is recorded before closeout.

## Linked Requirements

- CLR-OPS-001
- CLR-OPS-002
- CLR-OPS-042
- CLR-OPS-045
- CLR-OPS-087
- CLR-OPS-112

## Evidence

- [[requirements/operational/quality-gates|Quality Gates]]
- [[requirements/operational/release-and-ci|Release And CI]]
- [[requirements/operational/task-management|Task Management]]
- [[tests/requirements-matrix|Requirements Test Matrix]]

## Workflow Log

- 2026-05-11: Planned from Phase 6 parity and preview requirements.
