---
id: TASK-001
title: Inventory Upstream Source Tests And Dependencies
type: task
status: planned
priority: high
phase: PHASE-001
parent: FEAT-001
created: 2026-05-10
updated: 2026-05-10
dependencies: []
tags:
  - tickets/task
  - plans/phase-1
aliases:
  - TASK-001
---

# TASK-001: Inventory Upstream Source Tests And Dependencies

## Description

Create the exact import inventory for Commonloom source modules, tests,
fixtures, and package dependencies before moving code.

## Work Scope

- list upstream source files under `website/src/content/pipeline/commonloom`
- classify upstream `content-pipeline*.test.ts` files as core, adapter, or
  website-only
- identify fixture and media dependencies used by tests
- record package dependencies required by imported source
- identify any Flavor Grenade website imports that must not enter `src/`

This inventory gates all copy and rewrite work in later tasks.

## Acceptance

- Inventory is recorded in the phase summary or a linked note.
- Test classification names files to port, rewrite, defer, or exclude.
- Dependency list distinguishes runtime and development dependencies.
- Blockers are opened as follow-up tickets if import cannot proceed.

Acceptance requires the inventory to be concrete enough for direct import work.

## Verification

- Compare inventory against the upstream filesystem.
- Review against [[Commonloom Architecture]] and
  [[requirements/technical/library-boundary|Library Boundary]].

Verification should happen before any source files are copied.

## Workflow Log

- 2026-05-10: Opened in planned status.
