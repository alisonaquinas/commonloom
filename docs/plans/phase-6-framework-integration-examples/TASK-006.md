---
id: TASK-006
title: Build Next.js Example
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
  - nextjs
aliases:
  - TASK-006
---

# TASK-006: Build Next.js Example

## Description

Build a minimal Next.js TypeScript example that renders the shared Commonloom
content and style substrate.

## Work Scope

- create the Next.js example under `examples/nextjs/`
- use shared content, styles, and assets
- keep Next.js-specific code limited to app routing, component, and data glue
- document install, dev, build, and local start commands

## Acceptance

- The Next.js example renders the shared content with the shared SCSS.
- The example imports Commonloom through public package exports.
- Local instructions include `next dev`, `next build`, and a local production
  preview or start command.
- Build verification passes locally or a blocker is recorded.

## Workflow Log

- 2026-05-11: Planned from Phase 6 acceptance criteria.
