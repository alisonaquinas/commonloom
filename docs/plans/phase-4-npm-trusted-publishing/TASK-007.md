---
id: TASK-007
title: Add Test Tag Dry Run Path
type: task
status: done
priority: medium
phase: 4
parent: FEAT-001
created: 2026-05-11
updated: 2026-05-11
dependencies:
  - TASK-005
  - TASK-006
tags:
  - tickets/task
  - plans/phase-4
  - release
  - dry-run
aliases:
  - TASK-007
---

# TASK-007: Add Test Tag Dry Run Path

## Description

Add a safe path to exercise release workflow logic without publishing a
production npm package.

## Work Scope

- define test tag naming or `workflow_dispatch` dry-run inputs
- ensure dry-run path runs the full quality battery
- ensure dry-run path runs package dry-run checks
- ensure dry-run path cannot publish production artifacts
- document how maintainers use the dry-run path before a real release

## Acceptance

- Maintainers can validate release machinery without production publish.
- Dry-run evidence is visible in GitHub Actions.
- Test tags do not create production npm versions.

## Verification

- GitHub Actions dry-run or test-tag run
- local `npm pack --dry-run` and publish dry-run commands as preflight only

## Linked Requirements

- CLR-OPS-044
- CLR-OPS-065

## Workflow Log

- 2026-05-11: Opened in planned status.
- 2026-05-11: Added `npm run pack:dry-run`, `npm run publish:dry-run`, and a
  `workflow_dispatch` release dry-run path that cannot enter the publish job.
  Status set to done.
- 2026-05-11: Added package tarball and npm publish payload dry-run steps to
  the main CI workflow so pull requests and git-flow branch pushes validate
  publishability before release tagging.
- 2026-05-11: Added `npm run publish:dry-run:ci` so CI can validate npm
  publish mechanics with a temporary prerelease version after
  `commonloom@0.0.0` already exists on npm.
- 2026-05-11: Clarified that Phase 4 dry-run evidence must come from GitHub
  Actions workflow output. Local dry-runs are preflight checks only.
