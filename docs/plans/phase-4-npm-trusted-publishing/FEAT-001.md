---
id: FEAT-001
title: Establish npm Trusted Publishing
type: feature
status: active
priority: high
phase: 4
created: 2026-05-11
updated: 2026-05-11
dependencies: []
tags:
  - tickets/feature
  - plans/phase-4
  - release
  - npm
aliases:
  - FEAT-001
---

# FEAT-001: Establish npm Trusted Publishing

## Description

Prepare Commonloom for public npm publication through GitHub Actions and npm
OIDC trusted publishing.

This feature owns the release and publishing boundary for Phase 4.

## Scope

- audit package metadata and publish contents
- validate package dry-run behavior
- coordinate the one-time manual `0.0.0` bootstrap publish
- configure npm trusted publisher authorization
- add GitHub Actions publishing workflow
- add tag, version, quality, and environment guardrails
- document release operations

This feature does not publish from this planning branch.

## Acceptance

- Child tickets are terminal or explicitly deferred.
- npm package bootstrap evidence is recorded.
- Trusted publisher configuration is recorded without long-lived npm tokens.
- Release workflow uses Node.js 24 and `id-token: write`.
- Production publishing is gated by version tags on `main`.
- Test-tag or dry-run release validation is available.
- `npm run check` passes locally and in CI.

Acceptance closes only after remote CI evidence is captured.

## Child Tickets

- [[plans/phase-4-npm-trusted-publishing/TASK-001|TASK-001]]
- [[plans/phase-4-npm-trusted-publishing/TASK-002|TASK-002]]
- [[plans/phase-4-npm-trusted-publishing/TASK-003|TASK-003]]
- [[plans/phase-4-npm-trusted-publishing/TASK-004|TASK-004]]
- [[plans/phase-4-npm-trusted-publishing/TASK-005|TASK-005]]
- [[plans/phase-4-npm-trusted-publishing/TASK-006|TASK-006]]
- [[plans/phase-4-npm-trusted-publishing/TASK-007|TASK-007]]
- [[plans/phase-4-npm-trusted-publishing/TASK-008|TASK-008]]
- [[plans/phase-4-npm-trusted-publishing/CHORE-001|CHORE-001]]

## Linked Requirements

- CLR-OPS-040
- CLR-OPS-041
- CLR-OPS-043
- CLR-OPS-044
- CLR-OPS-045
- CLR-OPS-046
- CLR-OPS-064
- CLR-OPS-065
- CLR-OPS-066

## Workflow Log

- 2026-05-11: Opened in planned status.
- 2026-05-11: Phase 4 execution started on
  `feature/phase-4-npm-trusted-publishing`. Status set to active.
