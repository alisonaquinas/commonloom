---
id: TASK-011
title: Document Adopter Guidance
type: task
status: planned
priority: medium
phase: 6
parent: FEAT-001
created: 2026-05-11
updated: 2026-05-11
dependencies:
  - TASK-003
  - TASK-004
  - TASK-005
  - TASK-006
  - TASK-007
  - TASK-008
tags:
  - tickets/task
  - plans/phase-6
  - docs
  - adopters
aliases:
  - TASK-011
---

# TASK-011: Document Adopter Guidance

## Description

Document how adopters should read and run the examples, and explain the
difference between Commonloom core and framework glue.

## Work Scope

- update root or examples documentation with an examples index
- document the shared substrate and parity rule
- explain direct Node usage versus framework integration
- link examples from adopter-facing docs
- record any known limitations discovered during implementation

## Acceptance

- Adopters can find every example from root documentation.
- Each example has local run/build/preview instructions.
- Documentation says framework examples are integration patterns, not core
  requirements.
- `CHANGELOG.md` records the example documentation addition.

## Linked Requirements

- CLR-USER-010
- CLR-USER-012
- CLR-USER-013
- CLR-USER-014
- CLR-TECH-004
- CLR-OPS-001
- CLR-OPS-103

## Evidence

- [[adr/0001-keep-commonloom-adapter-neutral|ADR 0001]]
- [[adr/0003-keep-generated-typescript-adapter-owned|ADR 0003]]
- [[requirements/user/adapter-development|Adapter Development]]
- [[requirements/technical/library-boundary|Library Boundary]]
- [[requirements/operational/task-management|Task Management]]

## Workflow Log

- 2026-05-11: Planned from Phase 6 adopter guidance goal.
