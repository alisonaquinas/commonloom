---
id: TASK-001
title: Define Shared Example Substrate
type: task
status: done
priority: high
phase: 6
parent: FEAT-001
created: 2026-05-11
updated: 2026-05-11
dependencies: []
tags:
  - tickets/task
  - plans/phase-6
  - examples
  - assets
aliases:
  - TASK-001
---

# TASK-001: Define Shared Example Substrate

## Description

Create the shared example content, SCSS, and assets that every framework
example must consume.

## Work Scope

- create `examples/shared/content/`
- create `examples/shared/styles/`
- create `examples/shared/assets/`
- reuse Commonloom logo assets where practical
- add at least one neutral example graphic if needed to demonstrate asset
  integration
- define the shared rendered content expectations

## Acceptance

- Shared Markdown/frontmatter content exists under `examples/shared/content/`.
- Shared SCSS exists under `examples/shared/styles/`.
- Shared assets exist under `examples/shared/assets/`.
- Each shared file is documented as framework-neutral.
- Later example tickets can consume the substrate without copying divergent
  content or styles.

## Linked Requirements

- CLR-USER-013
- CLR-TECH-004
- CLR-FUNC-080

## Evidence

- [[Commonloom Architecture]]
- [[requirements/user/adapter-development|Adapter Development]]
- [[requirements/technical/library-boundary|Library Boundary]]

## Workflow Log

- 2026-05-11: Planned from Phase 6 acceptance criteria.
- 2026-05-11: Started shared substrate implementation. Status set to active.
- 2026-05-11: Added `examples/shared/content/`,
  `examples/shared/styles/commonloom-example.scss`, shared Commonloom PNG
  assets under Git LFS tracking, and `examples/shared/README.md`.
  Status set to done.
