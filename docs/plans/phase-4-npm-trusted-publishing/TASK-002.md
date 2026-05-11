---
id: TASK-002
title: Validate Package Dry Runs
type: task
status: done
priority: high
phase: 4
parent: FEAT-001
created: 2026-05-11
updated: 2026-05-11
dependencies:
  - TASK-001
tags:
  - tickets/task
  - plans/phase-4
  - npm
  - dry-run
aliases:
  - TASK-002
---

# TASK-002: Validate Package Dry Runs

## Description

Prove the npm package contents with dry-run commands before any real publish.

## Work Scope

- run `npm run check`
- run `npm pack --dry-run`
- run `npm publish --dry-run`
- capture package contents and tarball size expectations
- document any required metadata or `files` corrections
- prevent real publish until dry-run output is reviewed

## Acceptance

- Dry-run output contains only intended package files.
- No secrets, GitHub workflow files, docs vault content, tests, or local cache
  files appear in the publish list unless explicitly accepted.
- Dry-run evidence is recorded in the ticket.

## Verification

- `npm run check`
- `npm pack --dry-run`
- `npm publish --dry-run`

## Linked Requirements

- CLR-OPS-041
- CLR-OPS-065

## Workflow Log

- 2026-05-11: Opened in planned status.
- 2026-05-11: Started package dry-run validation after TASK-001 metadata audit.
  Status set to active.
- 2026-05-11: `npm pack --dry-run` and `npm publish --dry-run` passed for
  `commonloom@0.0.0`. Dry-run package contents are limited to
  `CHANGELOG.md`, `LICENSE.md`, `README.md`, `package.json`, and built
  `dist/` files. The tarball is 20.9 kB packed, 76.3 kB unpacked, with 52
  total files. Status set to done.
