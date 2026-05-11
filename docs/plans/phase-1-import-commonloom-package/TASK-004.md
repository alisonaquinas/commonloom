---
id: TASK-004
title: Port Commonloom Tests Into Test
type: task
status: done
priority: high
phase: 1
parent: FEAT-001
created: 2026-05-10
updated: 2026-05-10
dependencies:
  - TASK-001
  - TASK-002
  - TASK-003
tags:
  - tickets/task
  - plans/phase-1
aliases:
  - TASK-004
---

# TASK-004: Port Commonloom Tests Into Test

## Description

Port Commonloom-relevant upstream tests into the local `test/` folder.

## Work Scope

- port core compiler tests
- port Markdown and frontmatter tests
- port HTML safety tests
- port link, media, and path safety tests
- port source trace and diagnostics tests
- classify generated TypeScript and renderer tests as adapter-owned when needed
- copy required fixtures into `test/fixtures/`

The ported tests should describe Commonloom behavior, not website behavior.

## Acceptance

- Ported tests live under `test/`.
- Tests exercise local `src/` imports, not upstream paths.
- Website-only tests are excluded or rewritten with a clear rationale.
- Any skipped test has a linked blocker ticket and reason.

Acceptance requires every upstream test to be ported, excluded, or deferred.

## Verification

- `npm test`
- test inventory reconciles with TASK-001 classification

Verification protects against silently dropping upstream behavior.

## Workflow Log

- 2026-05-10: Opened in planned status.
- 2026-05-10: Ported core, Markdown, HTML, link, media, source-trace, and
  diagnostics tests into `test/`; excluded website adapter tests per TASK-001.
  Removed temporary no-test allowance from `npm test`. Status set to green
  pending verification.
- 2026-05-10: `npm test` passes with 12 assertions across four test files.
  Status set to in-review.
- 2026-05-11: Reconciled ticket status after later branch CI proved the ported
  tests and expanded battery in PR 7. Status set to done.
