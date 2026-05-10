---
id: TASK-002
title: Verify Full Package CI Gate
type: task
status: planned
priority: high
phase: 2
parent: FEAT-001
created: 2026-05-10
updated: 2026-05-10
dependencies:
  - TASK-001
tags:
  - tickets/task
  - plans/phase-2
  - ci
aliases:
  - TASK-002
---

# TASK-002: Verify Full Package CI Gate

## Description

Confirm GitHub Actions runs the complete validation gate for pull requests and
git-flow branch pushes.

## Work Scope

- verify CI installs dependencies with npm
- verify CI uses Node.js 24
- verify CI invokes `npm run check`
- verify no CI job grants publish, release, or deployment permissions

This task keeps Phase 2 validation-only.

## Acceptance

- CI runs documentation lint, package lint, typecheck, build, and tests.
- Unit tests run without filename filters, watch mode, or focused-only flags.
- Workflow permissions remain read-only.
- Release and publish work remains reserved for a later phase.

## Verification

- inspect `.github/workflows/documentation-lint.yml`
- `npm run check`

## Workflow Log

- 2026-05-10: Opened in planned status.
