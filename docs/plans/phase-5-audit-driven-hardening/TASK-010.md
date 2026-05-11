---
id: TASK-010
title: Correct Source Position Offsets
type: task
status: planned
priority: medium
phase: 5
parent: FEAT-001
created: 2026-05-11
updated: 2026-05-11
dependencies: []
tags:
  - tickets/task
  - plans/phase-5
  - source-trace
  - diagnostics
aliases:
  - TASK-010
---

# TASK-010: Correct Source Position Offsets

## Description

Make heading, link, image, and diagnostic source positions source-file
absolute after frontmatter stripping.

## Audit Findings

- [[audits/code-quality-audit#CQ-006 - Low - Frontmatter Line Offsets Use Brittle Substring Lookup|CQ-006]]
- [[audits/requirements-audit#REQ-AUDIT-003 - Link And Image Source Positions Are Not Proven Source-Absolute|REQ-AUDIT-003]]
- Split or clarify candidate for `CLR-FUNC-040`

## Work Scope

- derive body start offsets from frontmatter delimiter metadata instead of
  brittle substring lookup
- apply body offsets to headings, links, images, wiki-links, and diagnostics
- add frontmatter-bearing position tests
- clarify source-position requirements if scope changes

## Acceptance

- Source positions for headings, links, images, and diagnostics are consistent.
- Requirements matrix evidence is updated.
- `npm run check` passes.

## Workflow Log

- 2026-05-11: Planned from Phase 5 audit findings.
