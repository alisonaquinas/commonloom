---
id: TASK-018
title: Normalize Ticket Phase Metadata
type: task
status: done
priority: low
phase: 5
parent: FEAT-001
created: 2026-05-11
updated: 2026-05-11
dependencies: []
tags:
  - tickets/task
  - plans/phase-5
  - documentation
  - process
aliases:
  - TASK-018
---

# TASK-018: Normalize Ticket Phase Metadata

## Description

Choose and enforce one `phase` frontmatter value style for ticket files.

## Audit Findings

- [[audits/documentation-audit#Low Ticket frontmatter has mixed phase value types|Documentation finding: mixed ticket phase types]]

## Work Scope

- choose numeric or string phase metadata as the canonical ticket style
- update existing tickets or document exceptions
- update `verify-plan-process.mjs` to enforce the chosen style if appropriate

## Acceptance

- Ticket phase metadata is consistent or documented as intentionally mixed.
- Plan process verification reflects the chosen rule.
- `npm run check` passes.

## Workflow Log

- 2026-05-11: Planned from Phase 5 audit findings.

> [!SUCCESS] Done · 2026-05-11
> Status set to done. Implemented during Phase 5 execution. `npm run check` passed locally after the change.

> [!INFO] Auditor follow-up · 2026-05-11
> Documentation review found the Phase 5 index showed several tickets as done
> while their frontmatter still said planned. The ticket frontmatter has been
> corrected, and `verify-plan-process.mjs` now compares index status against
> ticket frontmatter so this drift is caught automatically.
