---
id: TASK-003
title: Import Commonloom Source Into Src
type: task
status: green
priority: high
phase: PHASE-001
parent: FEAT-001
created: 2026-05-10
updated: 2026-05-10
dependencies:
  - TASK-001
  - TASK-002
tags:
  - tickets/task
  - plans/phase-1
aliases:
  - TASK-003
---

# TASK-003: Import Commonloom Source Into Src

## Description

Move the upstream Commonloom compiler modules into this repository's `src/`
folder with minimal behavior changes.

## Work Scope

- copy upstream core modules into `src/`
- preserve public exports from upstream `index.ts`
- adjust relative imports for the new package layout
- keep source modules adapter-neutral
- avoid importing website adapter modules

This task is a source import, not an adapter rewrite.

## Acceptance

- `src/` contains the imported Commonloom core.
- Core source compiles under local TypeScript settings.
- No source file imports Flavor Grenade website routes, Svelte components,
  product data, or generated renderer files.
- Behavior changes are deferred to explicit follow-up tickets unless required
  for standalone compilation.

Acceptance requires local ownership of all imported source paths.

## Verification

- `npm run typecheck`
- static import review for forbidden website modules
- source diff against upstream inventory

Verification should show no website-only import leakage.

## Workflow Log

- 2026-05-10: Opened in planned status.
- 2026-05-10: Imported the twelve upstream Commonloom core modules into
  `src/` and adapted internal imports for standalone Node ESM output. Status
  set to green pending verification.
