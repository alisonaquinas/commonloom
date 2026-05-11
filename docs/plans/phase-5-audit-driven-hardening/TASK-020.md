---
id: TASK-020
title: Clarify Standard Internal Link Validation
type: task
status: done
priority: high
phase: 5
parent: FEAT-001
created: 2026-05-11
updated: 2026-05-11
dependencies: []
tags:
  - tickets/task
  - plans/phase-5
  - links
  - requirements
aliases:
  - TASK-020
---

# TASK-020: Clarify Standard Internal Link Validation

## Description

Resolve whether Commonloom validates broken standard Markdown internal links or
only classifies them for adapter-owned resolution.

## Audit Findings

- [[audits/requirements-audit#REQ-AUDIT-002 - Broken Standard Internal Links Lack Evidence|REQ-AUDIT-002]]
- Split or clarify candidate for `CLR-USER-004`

## Work Scope

- clarify requirement scope for standard internal links
- implement adapter-assisted validation if in scope
- add tests for unresolved standard internal links if implemented
- update requirements matrix if behavior remains adapter-owned

## Acceptance

- Requirements and behavior agree for standard internal links.
- Broken-link evidence rows are no longer overstated.
- `npm run check` passes.

## Workflow Log

- 2026-05-11: Planned from Phase 5 audit findings.

> [!SUCCESS] Done · 2026-05-11
> Status set to done. Implemented during Phase 5 execution. `npm run check` passed locally after the change.

> [!SUCCESS] Auditor confirmation · 2026-05-11
> Requirements review confirmed standard internal links now route through the
> adapter callback and produce unresolved diagnostics when the adapter cannot
> resolve them.
