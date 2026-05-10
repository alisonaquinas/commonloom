---
id: CHORE-001
title: Update Documentation Evidence After Import
type: chore
status: planned
priority: medium
phase: PHASE-001
parent: FEAT-001
created: 2026-05-10
updated: 2026-05-10
dependencies:
  - TASK-003
  - TASK-004
  - TASK-005
  - TASK-006
tags:
  - tickets/chore
  - plans/phase-1
aliases:
  - CHORE-001
---

# CHORE-001: Update Documentation Evidence After Import

## Description

Update the documentation vault after source and tests exist locally.

## Work Scope

- update [[Commonloom]] current status
- update [[Commonloom Architecture]] with actual local module paths
- update [[Commonloom Requirements]] links where code now proves behavior
- update [[Commonloom Extraction Plan]] first local milestones
- append [[log|Vault Log]] entries for import and verification
- update the phase retrospective

These updates close the import loop after package checks pass.

## Acceptance

- Docs distinguish implemented local behavior from remaining extraction work.
- Durable claims link to local files, tests, requirements, ADRs, or source
  imports.
- Phase 1 retrospective records deviations and carry-forward actions.
- Documentation lint and ADR lint pass.

Acceptance keeps docs synchronized with implementation evidence.

## Verification

- `npm run lint:docs`
- review for stale "documentation-only" claims

Verification should run after the import checks are known.

## Workflow Log

- 2026-05-10: Opened in planned status.
