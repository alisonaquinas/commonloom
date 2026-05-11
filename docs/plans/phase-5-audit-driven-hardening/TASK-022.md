---
id: TASK-022
title: Verify BDD Requirement Ranges
type: task
status: planned
priority: medium
phase: 5
parent: FEAT-001
created: 2026-05-11
updated: 2026-05-11
dependencies: []
tags:
  - tickets/task
  - plans/phase-5
  - requirements
  - bdd
  - traceability
aliases:
  - TASK-022
---

# TASK-022: Verify BDD Requirement Ranges

## Description

Make BDD requirement range notation verifiable or replace it with explicit
requirement IDs.

## Audit Findings

- [[audits/requirements-audit#REQ-AUDIT-005 - BDD Requirement Ranges Are Not Fully Verified|REQ-AUDIT-005]]

## Work Scope

- expand range parsing in `verify-traceability.mjs`, or
- replace BDD ranges with explicit requirement IDs
- update evidence catalog wording to match verifier behavior

## Acceptance

- BDD requirement references are fully verified, including range notation if
  retained.
- Requirements matrix evidence accurately describes traceability verification.
- `npm run check` passes.

## Workflow Log

- 2026-05-11: Planned from Phase 5 audit findings.
