---
id: TASK-021
title: Resolve Format Check Requirement
type: task
status: done
priority: medium
phase: 5
parent: FEAT-001
created: 2026-05-11
updated: 2026-05-11
dependencies: []
tags:
  - tickets/task
  - plans/phase-5
  - requirements
  - quality-gates
aliases:
  - TASK-021
---

# TASK-021: Resolve Format Check Requirement

## Description

Make the format-check operational requirement match implemented tooling.

## Audit Findings

- [[audits/requirements-audit#REQ-AUDIT-004 - Format-Check Requirement Is Marked Covered Without A Format Script|REQ-AUDIT-004]]
- Split or clarify candidate for `CLR-OPS-001`

## Work Scope

- add a `format:check` script or split format checks from the current gate
- update requirements and matrix status
- document why formatting is handled by lint if no formatter is introduced

## Acceptance

- `CLR-OPS-001` status and package scripts agree.
- Quality-gate documentation is not internally inconsistent.
- `npm run check` passes.

## Workflow Log

- 2026-05-11: Planned from Phase 5 audit findings.

> [!SUCCESS] Done · 2026-05-11
> Status set to done. Implemented during Phase 5 execution. `npm run check` passed locally after the change.

> [!SUCCESS] Auditor confirmation · 2026-05-11
> Requirements review confirmed `npm run format:check` exists and is represented
> as `VER-FORMAT` evidence in the requirements matrix.
