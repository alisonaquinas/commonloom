---
id: TASK-007
title: Add Parser And Filesystem Security Tests
type: task
status: done
priority: high
phase: 3
parent: FEAT-001
created: 2026-05-10
updated: 2026-05-10
dependencies: []
tags:
  - tickets/task
  - plans/phase-3
  - tests/security
  - tests/unit
aliases:
  - TASK-007
---

# TASK-007: Add Parser And Filesystem Security Tests

## Description

Add security-focused tests for parser-sensitive and filesystem-sensitive
requirements that currently have clear gaps.

## Work Scope

- test frontmatter size or parser limit behavior, or document the missing
  control as a blocker
- test parser-sensitive regular expressions for known bad inputs where
  practical
- test symlink escapes for media or path validation if filesystem behavior
  follows symlinks
- test prototype-pollution inputs in caller-supplied objects
- test pathological input handling where practical without making CI flaky
- update security-validation matrix rows

Tests must avoid timing-dependent assertions unless they are bounded and stable.

## Acceptance

- Security-sensitive gaps have executable tests or explicit blockers.
- Tests avoid nondeterministic CI behavior.
- Any required implementation changes preserve diagnostic-first content error
  handling.
- Matrix rows CLR-TECH-060 through CLR-TECH-065 are updated.

## Verification

- targeted security test command if added
- `npm test`
- `npm run check`

## Linked Requirements

- CLR-TECH-060
- CLR-TECH-061
- CLR-TECH-062
- CLR-TECH-063
- CLR-TECH-064
- CLR-TECH-065

## Workflow Log

- 2026-05-10: Opened in planned status.
- 2026-05-11: Added
  [content-pipeline-security.test.ts](../../../test/content-pipeline-security.test.ts)
  for oversized frontmatter rejection, prototype-pollution safety, long
  wiki-link parsing, and symlinked media escape rejection. Failing tests exposed
  missing frontmatter bounds and realpath media confinement; implementation was
  updated. YAML alias/depth and broader resource-limit hardening remain partial
  in the matrix. Status set to done after targeted security tests passed.
