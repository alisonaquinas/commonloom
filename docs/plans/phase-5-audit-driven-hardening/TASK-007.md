---
id: TASK-007
title: Refactor Compiler Orchestration
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
  - compiler
  - maintainability
aliases:
  - TASK-007
---

# TASK-007: Refactor Compiler Orchestration

## Description

Separate `compileCommonloom` orchestration from filesystem loading, document
compilation, validation, and trace mutation responsibilities.

## Audit Findings

- [[audits/code-quality-audit#CQ-003 - Medium - Compiler Entrypoint Has Mixed Responsibilities|CQ-003]]

## Work Scope

- extract a focused document compilation unit
- keep filesystem loading in a thin wrapper
- avoid mutating source trace objects after construction
- preserve the public entry point and exported types

## Acceptance

- Compiler behavior remains covered by unit, integration, and E2E tests.
- Source traces are assembled in a clearer, more cohesive flow.
- `npm run check` passes.

## Workflow Log

- 2026-05-11: Planned from Phase 5 audit findings.

> [!SUCCESS] Done · 2026-05-11
> Status set to done. Implemented during Phase 5 execution. `npm run check` passed locally after the change.

> [!INFO] Auditor confirmation · 2026-05-11
> Code quality review confirmed compiler orchestration is improved by the
> `compileDocument`, path resolution, and trace resolution helpers. The auditor
> noted remaining cleanup debt around helpers that append to shared diagnostics
> arrays; that is nonblocking and should become a later refactor ticket if it
> grows.
