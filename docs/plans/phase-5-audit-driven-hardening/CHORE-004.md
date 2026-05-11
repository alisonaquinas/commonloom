---
id: CHORE-004
title: Test-First Gate Control
type: chore
status: done
priority: high
phase: 5
parent: FEAT-001
created: 2026-05-11
updated: 2026-05-11
dependencies:
  - TASK-005
  - TASK-006
  - TASK-007
  - TASK-008
  - TASK-009
  - TASK-010
  - TASK-011
  - TASK-012
  - TASK-013
  - TASK-016
  - TASK-020
  - TASK-021
  - TASK-022
tags:
  - tickets/chore
  - plans/phase-5
  - tests
  - phase-execution
aliases:
  - CHORE-004
---

# CHORE-004: Test-First Gate Control

## Description

Ensure Phase 5 behavior-changing remediation tickets record failing tests or
equivalent verification before implementation.

## Linked Requirements

- CLR-OPS-083

## Acceptance

- Each behavior-changing Phase 5 remediation ticket records red evidence or an
  explicit not-applicable reason before implementation evidence.
- Documentation-only tickets identify documentation lint or review evidence.

## Workflow Log

- 2026-05-11: Planned before remediation begins.

> [!SUCCESS] Done · 2026-05-11
> Status set to done. Implemented during Phase 5 execution. `npm run check` passed locally after the change.

> [!INFO] Auditor follow-up · 2026-05-11
> The auditor pass produced concrete misses after the first implementation
> commit. Follow-up tests and verification changes were added before closeout:
> resource-limit failures now assert no document is returned, unsafe HTML
> attribute evidence includes additional attributes, and process verification
> now catches ticket index/frontmatter status drift.
