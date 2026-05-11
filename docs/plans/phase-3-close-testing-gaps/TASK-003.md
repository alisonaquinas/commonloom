---
id: TASK-003
title: Broaden Link And Media Boundary Tests
type: task
status: done
priority: high
phase: 3
parent: FEAT-001
created: 2026-05-10
updated: 2026-05-10
dependencies: []
tags:
  - tickets/task
  - plans/phase-3
  - tests/unit
  - links
  - media
aliases:
  - TASK-003
---

# TASK-003: Broaden Link And Media Boundary Tests

## Description

Expand link and media tests for target classification, unsupported schemes,
path confinement, and missing-link diagnostics.

## Work Scope

- test same-document link classification
- test unsupported link scheme classification and diagnostics
- test unsupported media URI schemes
- test absolute paths and encoded traversal attempts
- decide and test how missing standard internal links are diagnosed, or record
  deferral if standard link resolution remains adapter-owned
- update matrix rows for link, media, path, and diagnostics coverage

This task must keep project-specific route resolution behind adapter callbacks.

## Acceptance

- Classification tests cover all current `CommonloomLinkKind` values.
- Media validation tests cover non-local URI schemes.
- Path tests cover traversal, absolute paths, and encoded traversal if
  supported by the implementation.
- Any unresolved standard internal-link behavior is documented as a blocker or
  explicit adapter-owned decision.

## Verification

- `npm test`
- `npm run check`

## Linked Requirements

- CLR-FUNC-040
- CLR-FUNC-041
- CLR-FUNC-042
- CLR-FUNC-043
- CLR-FUNC-044
- CLR-FUNC-045
- CLR-TECH-062
- CLR-TECH-063

## Workflow Log

- 2026-05-10: Opened in planned status.
- 2026-05-11: Added link classification tests for all current link kinds,
  unsupported link diagnostics, unsupported media URI diagnostics, absolute
  path rejection, and encoded traversal confinement. Standard internal-link
  missing-target diagnostics remain adapter-owned and documented as partial in
  the matrix. `npm test`, `npm run lint`, and `npm run typecheck` pass. Status
  set to done.
