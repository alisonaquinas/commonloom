---
id: TASK-003
title: Document Verified Quality Commands
type: task
status: planned
priority: medium
phase: 2
parent: FEAT-001
created: 2026-05-10
updated: 2026-05-10
dependencies:
  - TASK-001
  - TASK-002
tags:
  - tickets/task
  - plans/phase-2
  - docs
aliases:
  - TASK-003
---

# TASK-003: Document Verified Quality Commands

## Description

Ensure contributor-facing command documentation matches the verified local and
CI quality gate.

## Work Scope

- document commands only after they exist and pass
- distinguish validation from release or publishing
- link the command docs back to Phase 2 evidence

This task prevents stale command claims.

## Acceptance

- README or contributing docs name the verified quality commands.
- Docs do not claim release or publish commands for Phase 2.
- Documentation lint passes.

## Verification

- `npm run lint:docs`
- `npm run check`

## Workflow Log

- 2026-05-10: Opened in planned status.
