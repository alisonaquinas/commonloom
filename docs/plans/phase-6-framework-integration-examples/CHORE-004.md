---
id: CHORE-004
title: Test-First Coupling Fix Control
type: chore
status: done
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
- 2026-05-11: Reviewed Phase 6 implementation and found no
  behavior-changing Commonloom source coupling fixes. Example-only and
  documentation-only work is covered by `examples:check`, docs lint, and the
  existing package test battery. Status set to done.
