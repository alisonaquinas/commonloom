---
id: TASK-005
title: Add OIDC Release Workflow
type: task
status: active
priority: high
phase: 4
parent: FEAT-001
created: 2026-05-11
updated: 2026-05-11
dependencies:
  - TASK-004
tags:
  - tickets/task
  - plans/phase-4
  - github-actions
  - npm
  - oidc
aliases:
  - TASK-005
---

# TASK-005: Add OIDC Release Workflow

## Description

Add the GitHub Actions workflow that publishes Commonloom to npm through OIDC
trusted publishing.

## Work Scope

- trigger only on approved release events or version tags
- use Node.js 24
- use `npm ci --ignore-scripts` unless a documented publish step requires
  lifecycle scripts
- run the full Commonloom quality battery before publish
- set npm registry URL to `https://registry.npmjs.org`
- grant `contents: read` and `id-token: write` only where needed
- run `npm publish` without `NODE_AUTH_TOKEN` or long-lived npm secrets
- use a protected publishing environment

## Acceptance

- Workflow is least-privilege.
- Workflow can authenticate with npm trusted publishing.
- Workflow cannot publish without quality checks and environment approval.
- No npm token secret is introduced.

## Verification

- workflow syntax review
- `npm run check`
- test-tag or dry-run validation from TASK-007

## Linked Requirements

- CLR-OPS-040
- CLR-OPS-041
- CLR-OPS-043
- CLR-OPS-045
- CLR-OPS-046
- CLR-OPS-064
- CLR-OPS-066

## Workflow Log

- 2026-05-11: Opened in planned status.
- 2026-05-11: Started OIDC release workflow implementation while TASK-003 and
  TASK-004 remain blocked on external npm owner actions. Status set to active.
