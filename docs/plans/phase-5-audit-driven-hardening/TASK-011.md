---
id: TASK-011
title: Add Markdown Resource Limits
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
  - security
  - parser-safety
aliases:
  - TASK-011
---

# TASK-011: Add Markdown Resource Limits

## Description

Add whole-document and collection-size limits for Markdown compilation.

## Audit Findings

- [[audits/security-audit#Finding: Markdown Compilation Has No Whole-Document Resource Bound|Security finding: resource bounds]]

## Work Scope

- add configurable or documented limits for Markdown bytes per document
- consider limits for manifest entries, extracted references, and rendered
  output size
- emit stable diagnostics for resource limit failures
- add parser-safety tests for oversized and high-reference content

## Acceptance

- Expensive Markdown compilation is bounded before unbounded parser work.
- Requirements and matrix evidence reflect implemented bounds.
- `npm run check` passes.

## Workflow Log

- 2026-05-11: Planned from Phase 5 audit findings.

> [!SUCCESS] Done · 2026-05-11
> Status set to done. Implemented during Phase 5 execution. `npm run check` passed locally after the change.
