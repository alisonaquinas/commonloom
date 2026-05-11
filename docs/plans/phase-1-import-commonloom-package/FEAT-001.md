---
id: FEAT-001
title: Import Commonloom Package And Tests
type: feature
status: done
priority: high
phase: PHASE-001
created: 2026-05-10
updated: 2026-05-10
dependencies: []
tags:
  - tickets/feature
  - plans/phase-1
aliases:
  - FEAT-001
---

# FEAT-001: Import Commonloom Package And Tests

## Description

Import the upstream Commonloom compiler package and its relevant tests from
Flavor Grenade into this standalone repository.

## Business Outcome

Commonloom becomes an executable local TypeScript package rather than a
documentation-only extraction target.

## Scope

- import source modules into `src/`
- port relevant tests into `test/`
- add local package scripts
- preserve adapter neutrality
- prove the import with local and CI checks

This feature owns the phase boundary; child tasks own implementation details.

## Acceptance

- All child tasks are terminal.
- `src/` and `test/` exist and are owned by this repository.
- Local package checks pass.
- CI passes on the feature branch.
- Phase retrospective is recorded in
  [[plans/phase-1-import-commonloom-package/index|PHASE-001]].

Acceptance closes only after each child ticket reaches a terminal state.

## Child Tickets

- [[plans/phase-1-import-commonloom-package/TASK-001|TASK-001]]
- [[plans/phase-1-import-commonloom-package/TASK-002|TASK-002]]
- [[plans/phase-1-import-commonloom-package/TASK-003|TASK-003]]
- [[plans/phase-1-import-commonloom-package/TASK-004|TASK-004]]
- [[plans/phase-1-import-commonloom-package/TASK-005|TASK-005]]
- [[plans/phase-1-import-commonloom-package/TASK-006|TASK-006]]
- [[plans/phase-1-import-commonloom-package/CHORE-001|CHORE-001]]

These tickets preserve the import order from inventory through verification.

## Linked Requirements

- [[requirements/user/adapter-development|Adapter Development]]
- [[requirements/functional/adapter-output-contract|Adapter Output Contract]]
- [[requirements/technical/library-boundary|Library Boundary]]
- [[requirements/operational/quality-gates|Quality Gates]]

The requirements keep the import aligned with the standalone package boundary.

## Workflow Log

- 2026-05-10: Opened in planned status.
- 2026-05-10: Phase 1 execution started; status set to active.
- 2026-05-10: Source, tests, package checks, CI workflow, and docs evidence
  are locally complete. Status set to in-review pending remote CI evidence.
- 2026-05-11: Reconciled remote evidence using passing PR 7 CI on the branch
  containing the Phase 1 import. Status set to done.
