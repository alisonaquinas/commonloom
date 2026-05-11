---
id: TASK-007
title: Build Angular Example
type: task
status: planned
priority: medium
phase: 6
parent: FEAT-001
created: 2026-05-11
updated: 2026-05-11
dependencies:
  - TASK-001
  - TASK-002
tags:
  - tickets/task
  - plans/phase-6
  - angular
  - examples
aliases:
  - TASK-007
---

# TASK-007: Build Angular Example

## Description

Build a minimal Angular TypeScript example that renders the shared Commonloom
content and style substrate.

## Work Scope

- create the Angular example under `examples/angular/`
- use shared content, styles, and assets
- keep Angular-specific code limited to component, service, and app glue
- document install, serve, and build commands

## Acceptance

- The Angular example renders the shared content with the shared SCSS.
- The example imports Commonloom through public package exports.
- Local instructions include `ng serve` and `ng build` or package-script
  equivalents.
- Build verification passes locally or a blocker is recorded.

## Workflow Log

- 2026-05-11: Planned from Phase 6 acceptance criteria.
