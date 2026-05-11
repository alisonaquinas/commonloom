---
id: CHORE-004
title: Test-First Coupling Fix Control
type: chore
status: planned
priority: high
phase: 6
parent: FEAT-001
created: 2026-05-11
updated: 2026-05-11
dependencies: []
tags:
  - tickets/chore
  - plans/phase-6
  - testing
  - coupling
aliases:
  - CHORE-004
---

# CHORE-004: Test-First Coupling Fix Control

## Description

Ensure behavior-changing Commonloom source fixes discovered by examples follow
the test-first phase rule.

## Linked Requirements

- CLR-OPS-083

## Acceptance

- Each behavior-changing coupling fix records failing test or verification
  evidence before implementation.
- Documentation-only and example-only changes explain why no source test is
  required.
- `npm run check` passes after coupling fixes.

## Workflow Log

- 2026-05-11: Planned during Phase 6 planning.
