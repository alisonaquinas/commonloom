---
id: TASK-006
title: Add Release Guardrails
type: task
status: planned
priority: high
phase: 4
parent: FEAT-001
created: 2026-05-11
updated: 2026-05-11
dependencies:
  - TASK-005
tags:
  - tickets/task
  - plans/phase-4
  - release
  - guardrails
aliases:
  - TASK-006
---

# TASK-006: Add Release Guardrails

## Description

Add checks that prevent accidental or unauthorized production publishes.

## Work Scope

- verify production tags resolve to commits reachable from `main`
- verify package version and git tag agree
- block publishing from `develop`, `feature/*`, test tags, or unapproved
  environments
- ensure release jobs rebuild from source at the tag commit
- record branch protection or environment protection assumptions
- document failure modes and operator response

## Acceptance

- Production publish attempts fail when tag ancestry or version agreement is
  invalid.
- Workflow cannot publish from the wrong branch family.
- Guardrail behavior is documented and tested where practical.

## Verification

- local script tests or workflow dry-run checks where practical
- test-tag validation
- GitHub Actions evidence

## Linked Requirements

- CLR-OPS-040
- CLR-OPS-041
- CLR-OPS-043
- CLR-OPS-047

## Workflow Log

- 2026-05-11: Opened in planned status.
