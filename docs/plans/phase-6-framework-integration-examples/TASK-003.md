---
id: TASK-003
title: Build React Example
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
  - examples
  - react
aliases:
  - TASK-003
---

# TASK-003: Build React Example

## Description

Build a minimal React TypeScript example that renders the shared Commonloom
content and style substrate.

## Work Scope

- create the React example under `examples/react/`
- use shared content, styles, and assets
- keep React-specific code limited to component and bootstrapping glue
- document install, dev, build, and preview commands

## Acceptance

- The React example renders the shared content with the shared SCSS.
- The example imports Commonloom through public package exports.
- Local instructions include Vite-style dev, build, and preview commands.
- Build verification passes locally or a blocker is recorded.

## Workflow Log

- 2026-05-11: Planned from Phase 6 acceptance criteria.
