---
id: TASK-006
title: Add End-To-End Fixture Workflow
type: task
status: done
priority: medium
phase: 3
parent: FEAT-001
created: 2026-05-10
updated: 2026-05-10
dependencies:
  - TASK-004
  - TASK-005
tags:
  - tickets/task
  - plans/phase-3
  - tests/e2e
aliases:
  - TASK-006
---

# TASK-006: Add End-To-End Fixture Workflow

## Description

Add an end-to-end fixture that starts from content inputs and ends with
adapter-visible Commonloom output.

## Work Scope

- create a small fixture content tree
- compile fixture content through the public API
- assert output records contain sanitized HTML, source trace data, diagnostics,
  references, and adapter data
- prove no adapter-specific import is required
- update [[tests/e2e/index|End-To-End Tests]]
  and the requirements matrix

If compiler behavior is not ready, record the blocker instead of inventing a
fake E2E pass.

## Acceptance

- E2E tests run in CI through the selected test command.
- The fixture workflow uses public Commonloom APIs.
- The E2E page no longer says no end-to-end suite exists if the suite lands.
- Remaining E2E blockers are recorded in the matrix.

## Verification

- E2E test command if added
- `npm test`
- `npm run check`

## Linked Requirements

- CLR-USER-001
- CLR-FUNC-024
- CLR-FUNC-080
- CLR-FUNC-083
- CLR-FUNC-084

## Workflow Log

- 2026-05-10: Opened in planned status.
- 2026-05-11: Added
  [content-pipeline-e2e.test.ts](../../../test/content-pipeline-e2e.test.ts)
  covering a fixture content tree compiled through the public API into
  adapter-visible records. Updated E2E documentation and matrix evidence.
  Status set to done after `npm run lint`, `npm run typecheck`, and `npm test`.
