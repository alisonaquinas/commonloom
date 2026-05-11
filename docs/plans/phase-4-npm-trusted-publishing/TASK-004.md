---
id: TASK-004
title: Configure npm Trusted Publisher
type: task
status: blocked
priority: high
phase: 4
parent: FEAT-001
created: 2026-05-11
updated: 2026-05-11
dependencies:
  - TASK-003
tags:
  - tickets/task
  - plans/phase-4
  - npm
  - oidc
aliases:
  - TASK-004
---

# TASK-004: Configure npm Trusted Publisher

## Description

Configure npm to trust the exact GitHub Actions workflow that will publish
Commonloom.

## Work Scope

- choose the final release workflow filename before authorization
- choose the protected GitHub environment name for publishing
- configure npm trusted publishing for this repository and workflow
- record whether configuration was done through npmjs.com or `npm trust github`
- record package, repository, workflow file, environment, and operator evidence
- confirm no `NPM_TOKEN` secret is required

## Acceptance

- npm trusted publisher authorization points at the intended repository,
  workflow, and environment.
- The release workflow design can publish through OIDC.
- Authorization evidence is recorded without exposing credentials.

## Verification

- npm trusted publisher configuration review
- release workflow dry-run after TASK-005 and TASK-007

## Linked Requirements

- CLR-OPS-043
- CLR-OPS-046
- CLR-OPS-064
- CLR-OPS-066

## Workflow Log

- 2026-05-11: Opened in planned status.
- 2026-05-11: Trusted publisher setup is blocked until TASK-003 creates the
  npm package with the manual `0.0.0` bootstrap publish. Status set to blocked.
