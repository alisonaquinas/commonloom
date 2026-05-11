---
id: TASK-002
title: Broaden HTML Safety Unit Tests
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
  - tests/unit
  - security
aliases:
  - TASK-002
---

# TASK-002: Broaden HTML Safety Unit Tests

## Description

Expand HTML rendering tests so sanitizer and inline HTML policy behavior is
covered beyond safe `kbd` and unsafe `script` examples.

## Work Scope

- test event-handler attributes such as `onclick`
- test JavaScript URL removal or rejection
- test unsafe tags already named by policy
- test safe static tags that are intentionally allowed
- assert sanitized output remains static-renderer friendly
- update matrix rows for HTML rendering and security coverage

If implementation does not yet support a required allowlist tag, test-drive the
expected behavior or document a blocker in the matrix.

## Acceptance

- Unsafe inline HTML cases produce diagnostics or sanitized output according to
  the current policy.
- Safe allowlisted inline HTML remains available when policy allows HTML.
- CLR-FUNC-022 and CLR-FUNC-023 matrix rows are updated accurately.
- No unsafe runtime HTML survives expected sanitized output.

## Verification

- `npm test`
- `npm run check`

## Linked Requirements

- CLR-FUNC-020
- CLR-FUNC-021
- CLR-FUNC-022
- CLR-FUNC-023
- CLR-FUNC-024
- CLR-TECH-060

## Workflow Log

- 2026-05-10: Opened in planned status.
- 2026-05-11: Added HTML sanitizer assertions for unsafe attributes,
  JavaScript URLs, high-risk embed tags, and static inline allowlist tags.
  Failing tests exposed missing `abbr` and `source srcSet` allowlist entries;
  implementation was updated without relaxing test expectations. `npm test`,
  `npm run lint`, and `npm run typecheck` pass. Status set to done.
