---
id: TASK-010
title: Add Phase And Ticket Process Verification
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
  - process
aliases:
  - TASK-010
---

# TASK-010: Add Phase And Ticket Process Verification

## Description

Add practical checks for phase and ticket process requirements that are
currently manual.

## Work Scope

- validate ticket frontmatter has required fields
- detect duplicate ticket IDs inside a phase
- verify phase ticket indexes list existing ticket files
- verify ticket status agrees with terminal or active workflow-log entries
  where practical
- detect phase closeout with non-terminal tickets where practical
- keep checks focused enough to avoid blocking normal drafting work

This task should document any process rule that remains reviewer judgment.

## Acceptance

- A script or lint check validates the most mechanical ticket rules.
- Existing Phase 1, Phase 2, and Phase 3 ticket files pass or are corrected.
- Manual-only process requirements remain documented as manual.
- Matrix rows for task-management and phase-execution requirements are updated.

## Verification

- new process verification script if added
- `npm run lint:docs`
- `npm run check` if the script becomes blocking

## Linked Requirements

- CLR-OPS-080
- CLR-OPS-081
- CLR-OPS-082
- CLR-OPS-083
- CLR-OPS-084
- CLR-OPS-085
- CLR-OPS-086
- CLR-OPS-087
- CLR-OPS-088
- CLR-OPS-089
- CLR-OPS-090
- CLR-OPS-091
- CLR-OPS-092
- CLR-OPS-093
- CLR-OPS-100
- CLR-OPS-101
- CLR-OPS-102
- CLR-OPS-103
- CLR-OPS-104
- CLR-OPS-105
- CLR-OPS-106
- CLR-OPS-107
- CLR-OPS-108
- CLR-OPS-109
- CLR-OPS-110
- CLR-OPS-111
- CLR-OPS-112
- CLR-OPS-113
- CLR-OPS-114
- CLR-OPS-115
- CLR-OPS-116
- CLR-OPS-117
- CLR-OPS-118

## Workflow Log

- 2026-05-10: Opened in planned status.
