---
id: FEAT-001
title: Framework Integration Examples
type: feature
status: done
priority: high
phase: 6
created: 2026-05-11
updated: 2026-05-11
dependencies: []
tags:
  - tickets/feature
  - plans/phase-6
  - examples
aliases:
  - FEAT-001
---

# FEAT-001: Framework Integration Examples

## Description

Coordinate the Phase 6 example suite that proves Commonloom can be adopted
from multiple TypeScript ecosystems without framework-specific coupling.

## Scope

- shared example content, SCSS, and assets
- React, Vue, Svelte, Next.js, Angular, and Node examples
- local run/build/preview instructions for each example
- coupling fixes discovered while building examples
- parity and validation evidence

## Acceptance

- Every child ticket reaches `done`.
- All examples consume the same shared materials.
- Framework-specific code is limited to integration glue.
- Any Commonloom coupling fix has tests or verification evidence.
- Local validation passes before PR.
- Remote CI evidence is recorded before phase completion.

## Linked Requirements

- CLR-USER-010
- CLR-USER-012
- CLR-USER-013
- CLR-USER-014
- CLR-TECH-001
- CLR-TECH-003
- CLR-TECH-004
- CLR-FUNC-080
- CLR-FUNC-081
- CLR-FUNC-082
- CLR-OPS-082
- CLR-OPS-103

## Evidence

- [[adr/0001-keep-commonloom-adapter-neutral|ADR 0001]]
- [[adr/0003-keep-generated-typescript-adapter-owned|ADR 0003]]
- [[Commonloom Architecture]]
- [[requirements/user/adapter-development|Adapter Development]]
- [[requirements/technical/library-boundary|Library Boundary]]
- [[requirements/functional/adapter-output-contract|Adapter Output Contract]]

## Child Tickets

- [[plans/phase-6-framework-integration-examples/TASK-001|TASK-001]]
- [[plans/phase-6-framework-integration-examples/TASK-002|TASK-002]]
- [[plans/phase-6-framework-integration-examples/TASK-003|TASK-003]]
- [[plans/phase-6-framework-integration-examples/TASK-004|TASK-004]]
- [[plans/phase-6-framework-integration-examples/TASK-005|TASK-005]]
- [[plans/phase-6-framework-integration-examples/TASK-006|TASK-006]]
- [[plans/phase-6-framework-integration-examples/TASK-007|TASK-007]]
- [[plans/phase-6-framework-integration-examples/TASK-008|TASK-008]]
- [[plans/phase-6-framework-integration-examples/TASK-009|TASK-009]]
- [[plans/phase-6-framework-integration-examples/TASK-010|TASK-010]]
- [[plans/phase-6-framework-integration-examples/TASK-011|TASK-011]]
- [[plans/phase-6-framework-integration-examples/CHORE-001|CHORE-001]]
- [[plans/phase-6-framework-integration-examples/CHORE-002|CHORE-002]]
- [[plans/phase-6-framework-integration-examples/CHORE-003|CHORE-003]]
- [[plans/phase-6-framework-integration-examples/CHORE-004|CHORE-004]]
- [[plans/phase-6-framework-integration-examples/CHORE-005|CHORE-005]]
- [[plans/phase-6-framework-integration-examples/CHORE-006|CHORE-006]]
- [[plans/phase-6-framework-integration-examples/CHORE-007|CHORE-007]]
- [[plans/phase-6-framework-integration-examples/CHORE-008|CHORE-008]]
- [[plans/phase-6-framework-integration-examples/CHORE-009|CHORE-009]]
- [[plans/phase-6-framework-integration-examples/CHORE-010|CHORE-010]]

## Workflow Log

- 2026-05-11: Planned for Phase 6 framework integration examples.
- 2026-05-11: Phase 6 execution started on
  `feature/phase-6-framework-examples-implementation`. Status set to active.
- 2026-05-11: Completed the shared example suite, coupling review, example
  validation, adopter documentation, local validation, and PR 15 remote CI
  evidence. Status set to done.
