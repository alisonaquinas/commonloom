---
id: TASK-001
title: Broaden Markdown And GFM Unit Tests
type: task
status: done
priority: high
phase: 3
parent: FEAT-001
created: 2026-05-10
updated: 2026-05-10
dependencies: []
tags:
  - tickets/task
  - plans/phase-3
  - tests/unit
aliases:
  - TASK-001
---

# TASK-001: Broaden Markdown And GFM Unit Tests

## Description

Expand unit coverage for Markdown and frontmatter behavior beyond the current
happy-path fixture.

## Work Scope

- add explicit GFM autolink assertions
- add explicit strikethrough assertions
- add blockquote, code fence, inline code, emphasis, and image parser fixtures
- keep existing heading, source position, and frontmatter assertions
- update [[tests/requirements-matrix|Requirements Test Matrix]] rows affected
  by the new evidence

This task should not add adapter-specific route or renderer behavior.

## Acceptance

- `content-pipeline-markdown.test.ts` or successor unit files cover the missing
  Markdown/GFM constructs.
- CLR-USER-002 and CLR-FUNC-002 are updated from partial only when assertions
  directly cover the missing constructs.
- Tests stay independent from Flavor Grenade product content.
- New tests run through `npm test`.

## Verification

- `npm test`
- `npm run lint:docs`
- `npm run check`

## Linked Requirements

- CLR-USER-001
- CLR-USER-002
- CLR-FUNC-001
- CLR-FUNC-002
- CLR-FUNC-003
- CLR-FUNC-004
- CLR-FUNC-005
- CLR-FUNC-006

## Workflow Log

- 2026-05-10: Opened in planned status.
- 2026-05-11: Added broad CommonMark and GFM parser assertions for
  blockquotes, code fences, inline code, emphasis, images, autolinks, and
  strikethrough. Updated the test battery and requirements matrix. `npm test`,
  `npm run lint`, and `npm run typecheck` pass. Status set to done.
