---
id: TASK-002
title: Define Example Workspace Strategy
type: task
status: done
priority: high
phase: 6
parent: FEAT-001
created: 2026-05-11
updated: 2026-05-11
dependencies:
  - TASK-001
tags:
  - tickets/task
  - plans/phase-6
  - examples
  - tooling
aliases:
  - TASK-002
---

# TASK-002: Define Example Workspace Strategy

## Description

Define the `examples/` folder structure, dependency strategy, and command
conventions before framework-specific examples are implemented.

## Work Scope

- decide whether examples use npm workspaces, file dependencies, or packed
  local package artifacts
- ensure examples import Commonloom through public exports
- define consistent command names where frameworks allow it
- document Node.js 24 expectations for example development
- record framework-specific deviations, such as Angular `ng serve`

## Acceptance

- `examples/README.md` explains repository-wide example setup.
- Each example can depend on the local Commonloom package without internal
  source imports.
- Command conventions cover install, development preview, build, and
  production preview or run behavior.
- The strategy does not add framework code to Commonloom core.

## Linked Requirements

- CLR-USER-010
- CLR-USER-012
- CLR-USER-014
- CLR-TECH-001
- CLR-TECH-003
- CLR-TECH-004
- CLR-OPS-045

## Evidence

- [[adr/0001-keep-commonloom-adapter-neutral|ADR 0001]]
- [[adr/0003-keep-generated-typescript-adapter-owned|ADR 0003]]
- [[requirements/technical/library-boundary|Library Boundary]]
- [[requirements/operational/release-and-ci|Release And CI]]

## Workflow Log

- 2026-05-11: Planned from Phase 6 example setup requirements.
- 2026-05-11: Started example workspace strategy. Status set to active.
- 2026-05-11: Added root npm workspace discovery for `examples/*` and
  documented shared-contract, package, and command conventions in
  `examples/README.md`. Status set to done.
