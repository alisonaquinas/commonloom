---
id: TASK-005
title: Remove Website Specific Coupling
type: task
status: green
priority: high
phase: PHASE-001
parent: FEAT-001
created: 2026-05-10
updated: 2026-05-10
dependencies:
  - TASK-003
  - TASK-004
tags:
  - tickets/task
  - plans/phase-1
aliases:
  - TASK-005
---

# TASK-005: Remove Website Specific Coupling

## Description

Isolate or remove dependencies that belong to the Flavor Grenade website
adapter rather than Commonloom core.

## Work Scope

- identify website-specific route, manifest, renderer, and generated-output
  assumptions
- move adapter-owned behavior out of core tests
- replace project-specific fixtures with neutral fixtures
- document deferred adapter behavior as later roadmap work

This task keeps the standalone package from inheriting website-only contracts.

## Acceptance

- Core source remains adapter-neutral.
- Adapter-owned behavior is not presented as required Commonloom behavior.
- Deferred adapter work is linked from the phase summary or follow-up tickets.
- ADRs or requirements are updated if a durable boundary changes.

Acceptance keeps adapter decisions out of the core package surface.

## Verification

- static import review
- `npm run typecheck`
- `npm test`
- review against [[ddd/bounded-contexts|Bounded Contexts]]

Verification should leave any remaining coupling visible and intentional.

## Workflow Log

- 2026-05-10: Opened in planned status.
- 2026-05-10: Removed website-root examples from tests and moved generated
  file output settings out of the core `CommonloomConfig` surface per ADR 0003.
  Status set to green pending verification.
