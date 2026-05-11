---
id: TASK-004
title: Test Manifest-Driven Compiled Records
type: task
status: planned
priority: high
phase: 3
parent: FEAT-001
created: 2026-05-10
updated: 2026-05-10
dependencies:
  - TASK-001
  - TASK-002
  - TASK-003
tags:
  - tickets/task
  - plans/phase-3
  - tests/unit
  - compiler
aliases:
  - TASK-004
---

# TASK-004: Test Manifest-Driven Compiled Records

## Description

Close the compiler and adapter-output gaps by test-driving manifest-driven
compiled document records.

## Work Scope

- add tests for manifest entries flowing into compiled documents
- assert frontmatter, sanitized HTML, diagnostics, source traces, links, images,
  and adapter data appear in compiled records
- preserve check-only behavior without generated file output
- keep generated TypeScript writer behavior out of Commonloom core
- update matrix rows that currently mention compiler scaffold gaps

This task may require implementation work in `src/compiler.ts`.

## Acceptance

- `compileCommonloom` returns compiled documents for valid manifest input.
- Invalid content returns diagnostics rather than crashing for expected content
  errors.
- Adapter data remains generic.
- Generated TypeScript remains outside the core package.
- Matrix rows for CLR-FUNC-080 through CLR-FUNC-084 are updated truthfully.

## Verification

- failing test evidence before implementation
- `npm test`
- `npm run typecheck`
- `npm run check`

## Linked Requirements

- CLR-FUNC-080
- CLR-FUNC-081
- CLR-FUNC-082
- CLR-FUNC-083
- CLR-FUNC-084
- CLR-TECH-041
- CLR-TECH-042
- CLR-TECH-043

## Workflow Log

- 2026-05-10: Opened in planned status.
