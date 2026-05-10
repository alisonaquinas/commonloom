---
id: TASK-001
title: Configure Type-Aware TypeScript Linting
type: task
status: planned
priority: high
phase: 2
parent: FEAT-001
created: 2026-05-10
updated: 2026-05-10
dependencies: []
tags:
  - tickets/task
  - plans/phase-2
  - lint
aliases:
  - TASK-001
---

# TASK-001: Configure Type-Aware TypeScript Linting

## Description

Update ESLint so package TypeScript files are linted with type information and
warnings remain blocking.

## Work Scope

- use current `typescript-eslint` flat-config guidance for typed linting
- enable a type-checked preset for `src/**/*.ts` and `test/**/*.ts`
- keep JavaScript config files linted without requiring type information
- keep generated, build, dependency, and source-import artifacts excluded

This task does not change application behavior.

## Acceptance

- `npm run lint` uses type-aware TypeScript rules for package source and tests.
- `eslint.config.js` remains lintable.
- Lint warnings fail the command.
- Documentation lint still runs as part of `npm run lint`.

## Verification

- `npm run lint`
- `npm run typecheck`

## Workflow Log

- 2026-05-10: Opened in planned status.
