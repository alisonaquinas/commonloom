---
id: TASK-019
title: Normalize Public API Documentation
type: task
status: done
priority: low
phase: 5
parent: FEAT-001
created: 2026-05-11
updated: 2026-05-11
dependencies: []
tags:
  - tickets/task
  - plans/phase-5
  - documentation
  - api
aliases:
  - TASK-019
---

# TASK-019: Normalize Public API Documentation

## Description

Clarify README API snapshot wording or add a complete public API reference.

## Audit Findings

- [[audits/documentation-audit#Low README API snapshot omits many exported public types|Documentation finding: README API snapshot incomplete]]

## Work Scope

- decide whether README should be a summary or complete API list
- update README wording or add generated/manual API reference
- ensure all exports from `src/index.ts` are accounted for if claiming a full
  export list

## Acceptance

- README no longer implies an incomplete list is complete.
- API docs align with current exports.
- `npm run check` passes.

## Workflow Log

- 2026-05-11: Planned from Phase 5 audit findings.

> [!SUCCESS] Done · 2026-05-11
> Status set to done. Implemented during Phase 5 execution. `npm run check` passed locally after the change.

> [!INFO] Auditor follow-up · 2026-05-11
> Documentation review found `src/README.md` omitted the new
> `markdown-processors.ts` module and test inventory notes still used Phase 3
> counts. The source module map and test inventory docs now reflect the Phase 5
> module and the current 30-test battery.
