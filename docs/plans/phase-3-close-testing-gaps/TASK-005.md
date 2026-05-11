---
id: TASK-005
title: Add Integration Test Suite
type: task
status: planned
priority: medium
phase: 3
parent: FEAT-001
created: 2026-05-10
updated: 2026-05-10
dependencies:
  - TASK-004
tags:
  - tickets/task
  - plans/phase-3
  - tests/integration
aliases:
  - TASK-005
---

# TASK-005: Add Integration Test Suite

## Description

Create a dedicated integration test surface for multi-module Commonloom
behavior.

## Work Scope

- decide whether integration tests live under `test/integration/`, filename
  suffixes, or Vitest projects
- add a package script if a separate integration command is useful
- cover parse, render, reference extraction, wiki-link resolution, media
  validation, and source trace assembly in one flow
- keep integration fixtures small and adapter-neutral
- update [[tests/integration/index|Integration Tests]]
  and the requirements matrix

This task should not duplicate unit assertions line-for-line.

## Acceptance

- Integration tests are discoverable and documented.
- The integration suite runs locally and in `npm run check`, or a deliberate
  script decision is documented.
- The integration page no longer says no dedicated integration suite exists.
- Matrix rows with integration-adjacent partial coverage are updated.

## Verification

- integration test command if added
- `npm test`
- `npm run check`

## Linked Requirements

- CLR-OPS-002
- CLR-FUNC-020
- CLR-FUNC-040
- CLR-FUNC-060
- CLR-FUNC-062
- CLR-FUNC-064

## Workflow Log

- 2026-05-10: Opened in planned status.
