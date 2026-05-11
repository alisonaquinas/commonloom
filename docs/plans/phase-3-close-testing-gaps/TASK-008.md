---
id: TASK-008
title: Add Static Boundary Verification
type: task
status: planned
priority: medium
phase: 3
parent: FEAT-001
created: 2026-05-10
updated: 2026-05-10
dependencies: []
tags:
  - tickets/task
  - plans/phase-3
  - tests/verification
  - boundaries
aliases:
  - TASK-008
---

# TASK-008: Add Static Boundary Verification

## Description

Add verification checks for requirements that are best proven by static scans
instead of runtime unit tests.

## Work Scope

- detect forbidden imports from Flavor Grenade, Svelte, route modules, product
  data, or renderer modules inside `src/`
- detect disallowed core dependencies such as MDsveX, MDSX, or Vite Markdown
  import plugins
- detect generated-output drift if generated output directories are introduced
- review exact-version dependency policy and either enforce or update the
  requirement
- add scripts to `npm run check` only when stable
- update [[tests/verification/index|Verification]]
  and the requirements matrix

This task should prefer small deterministic scripts over broad fragile scans.

## Acceptance

- Static checks cover adapter-neutral boundaries where practical.
- Checks fail with actionable messages.
- `npm run check` includes the checks if they are required merge gates.
- Matrix rows for library-boundary and tooling requirements are updated.

## Verification

- new verification script if added
- `npm run check`

## Linked Requirements

- CLR-TECH-001
- CLR-TECH-003
- CLR-TECH-004
- CLR-TECH-005
- CLR-TECH-024
- CLR-TECH-025
- CLR-OPS-004
- CLR-OPS-060

## Workflow Log

- 2026-05-10: Opened in planned status.
