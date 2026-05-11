---
id: TASK-006
title: Consolidate Markdown Processor Setup
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
  - markdown
  - maintainability
aliases:
  - TASK-006
---

# TASK-006: Consolidate Markdown Processor Setup

## Description

Reduce parser and renderer drift by centralizing shared Markdown processor
configuration.

## Audit Findings

- [[audits/code-quality-audit#CQ-002 - Medium - Markdown Pipeline Configuration Is Duplicated|CQ-002]]

## Work Scope

- introduce a shared processor factory or another local abstraction
- keep parser and renderer behavior aligned for current GFM support
- add regression tests for parser-renderer drift

## Acceptance

- Markdown extension configuration is not duplicated between parser and
  renderer paths.
- Current output behavior remains unchanged.
- `npm run check` passes.

## Workflow Log

- 2026-05-11: Planned from Phase 5 audit findings.

> [!SUCCESS] Done · 2026-05-11
> Status set to done. Implemented during Phase 5 execution. `npm run check` passed locally after the change.
