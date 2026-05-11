---
id: TASK-008
title: Build Node Example
type: task
status: done
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
  - node
aliases:
  - TASK-008
---

# TASK-008: Build Node Example

## Description

Build a minimal Node.js example that compiles the shared Commonloom content
without a browser framework.

## Work Scope

- create the Node example under `examples/node/`
- use shared content, SCSS, and assets
- demonstrate direct Commonloom compilation from a Node script
- document install, build or typecheck, and run commands
- emit static HTML or another inspectable artifact that applies the shared
  styling for preview

## Acceptance

- The Node example compiles the same shared content used by the framework
  examples.
- The Node example applies the same shared SCSS or compiled CSS used by the
  framework examples.
- The example imports Commonloom through public package exports.
- Local instructions explain how to run the Node example and inspect output.
- Build or typecheck verification passes locally or a blocker is recorded.

## Linked Requirements

- CLR-USER-012
- CLR-USER-013
- CLR-USER-014
- CLR-TECH-003
- CLR-TECH-004
- CLR-FUNC-080
- CLR-FUNC-082
- CLR-OPS-045

## Evidence

- [[adr/0001-keep-commonloom-adapter-neutral|ADR 0001]]
- [[adr/0003-keep-generated-typescript-adapter-owned|ADR 0003]]
- [[requirements/user/adapter-development|Adapter Development]]
- [[requirements/technical/library-boundary|Library Boundary]]
- [[requirements/operational/release-and-ci|Release And CI]]
- Context7 implementation baseline: `/websites/nodejs_latest-v24_x_api`.

## Workflow Log

- 2026-05-11: Planned from Phase 6 acceptance criteria.
- 2026-05-11: Started Node example implementation. Status set to active.
- 2026-05-11: Added `examples/node/` with direct Commonloom compilation from
  Node, Sass compilation of the shared SCSS, shared asset copying, static HTML
  output, and a small Node HTTP preview server. Status set to done.
