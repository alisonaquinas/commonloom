---
id: TASK-008
title: Document Release Operations
type: task
status: planned
priority: medium
phase: 4
parent: FEAT-001
created: 2026-05-11
updated: 2026-05-11
dependencies:
  - TASK-003
  - TASK-004
  - TASK-005
  - TASK-006
  - TASK-007
tags:
  - tickets/task
  - plans/phase-4
  - release
  - docs
aliases:
  - TASK-008
---

# TASK-008: Document Release Operations

## Description

Document the maintainer runbook for bootstrap publishing, trusted publisher
setup, production releases, and release recovery.

## Work Scope

- document manual `0.0.0` bootstrap publish procedure
- document npm trusted publisher setup evidence
- document normal production release procedure
- document dry-run or test-tag procedure
- document rollback, deprecation, and failed-publish response
- update README, CONTRIBUTING, and requirements links where relevant

## Acceptance

- Release operators can follow documented steps without reading workflow YAML
  first.
- Docs distinguish one-time manual bootstrap work from normal automated
  releases.
- Docs explicitly forbid long-lived npm tokens for production publishing.

## Verification

- documentation lint
- dry-run walkthrough review
- `npm run check`

## Linked Requirements

- CLR-OPS-023
- CLR-OPS-024
- CLR-OPS-026
- CLR-OPS-040
- CLR-OPS-046
- CLR-OPS-064

## Workflow Log

- 2026-05-11: Opened in planned status.
