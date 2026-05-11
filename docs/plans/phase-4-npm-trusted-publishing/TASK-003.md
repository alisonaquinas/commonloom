---
id: TASK-003
title: Coordinate Manual Bootstrap Publish
type: task
status: blocked
priority: high
phase: 4
parent: FEAT-001
created: 2026-05-11
updated: 2026-05-11
dependencies:
  - TASK-002
tags:
  - tickets/task
  - plans/phase-4
  - npm
  - manual
aliases:
  - TASK-003
---

# TASK-003: Coordinate Manual Bootstrap Publish

## Description

Coordinate the one-time manual npm publish needed to create the package before
trusted publisher authorization can be configured.

## Work Scope

- confirm the exact commit used for the bootstrap publish
- confirm `version` remains `0.0.0` for the dummy bootstrap release
- confirm the package owner is authenticated to npm locally
- run final dry-run commands immediately before the real publish
- perform the manual publish only after explicit human confirmation
- record npm package URL, dist-tag, published version, command evidence, and
  any rollback or deprecation decision

This task is intentionally manual. It must not create a long-lived npm token.

## Acceptance

- Manual `0.0.0` publish evidence is recorded.
- The npm package exists and is ready for trusted publisher authorization.
- No automation publishes to npm before TASK-004 and TASK-005 are complete.

## Verification

- npm package page exists
- published version is `0.0.0`
- package contents match dry-run evidence

## Linked Requirements

- CLR-OPS-046
- CLR-OPS-064
- CLR-OPS-066

## Workflow Log

- 2026-05-11: Opened in planned status.
- 2026-05-11: Ready for one-time manual `0.0.0` bootstrap publish after
  TASK-002 dry-runs passed. Status set to active.
- 2026-05-11: `npm whoami` returned `E401`, so this workstation is not
  authenticated to npm. Manual bootstrap publishing is blocked until a package
  owner authenticates and explicitly authorizes `npm publish` for
  `commonloom@0.0.0`. Status set to blocked.
