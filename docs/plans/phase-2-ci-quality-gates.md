---
title: Phase 2 - CI Quality Gates
tags:
  - commonloom
  - plans
  - phase-2
  - ci
  - quality
status: draft
updated: 2026-05-10
aliases:
  - Phase 2
  - CI Quality Gates
  - TypeScript Linting Phase
---

# Phase 2 - CI Quality Gates

Phase 2 wires Commonloom's local quality checks into CI after the package
scaffold, TypeScript source, and unit test library exist locally.

## Objective

Make every pull request prove that the standalone TypeScript package is
lint-clean and that the full unit test suite passes in CI.

## Scope

Phase 2 includes:

- strict TypeScript-aware linting for all package source and test files
- CI execution of the complete unit test suite, not a focused subset
- CI execution of the package typecheck if the package scaffold defines one
- zero-warning lint behavior
- CI evidence recorded before phase completion
- documentation updates for real commands only after scripts exist

Phase 2 does not include:

- release jobs
- package publishing
- npm trusted publishing setup
- GitHub release creation
- deployment or GitHub Pages workflows
- release dry-runs unless a later phase pulls them forward

## Preconditions

- Package scaffold exists.
- TypeScript config exists with strict settings.
- Unit test framework exists and can run the package tests locally.
- Package scripts or equivalent task runner entries exist for linting,
  typechecking, and tests.
- Source and tests are present in this repository, not only in upstream source
  imports.

## Work Items

| ID | Work Item | Acceptance |
| --- | --- | --- |
| P2-001 | Configure TypeScript-aware linting. | Lint covers source and tests, uses parser services or equivalent type-aware checks where supported, and fails on warnings. |
| P2-002 | Align lint scope with package boundaries. | Lint includes Commonloom-maintained TypeScript files and excludes generated, build, dependency, and source-import artifacts explicitly. |
| P2-003 | Run the full unit test suite in CI. | CI invokes the complete unit test task without filename filters, watch mode, or focused-only execution. |
| P2-004 | Add typecheck to the CI gate if available. | CI fails on TypeScript compile errors before merge. |
| P2-005 | Keep CI pull-request focused. | Workflow runs on pull requests and pushes to protected integration branches; no publish permissions are granted. |
| P2-006 | Document verified commands. | README or CONTRIBUTING command docs are updated only after the commands exist and pass locally. |
| P2-007 | Record gate evidence. | Phase closeout links the passing CI run and notes lint, typecheck, and unit test results. |

## CI Gate

Required Phase 2 gate:

1. Install dependencies with the repository's chosen package manager.
2. Run strict TypeScript linting with warnings treated as failures.
3. Run TypeScript typecheck when configured.
4. Run the full unit test suite.

The CI job must use Node.js 24 per [[release-and-ci]].

No job in this phase should request package publish permissions, create a
release, upload production artifacts, or require npm trusted publishing.

## Acceptance Criteria

- Pull requests cannot merge with lint errors, lint warnings, type errors, or
  unit test failures.
- The unit test CI step runs the complete suite.
- Focused test selectors, skipped CI-only shortcuts, and watch mode are absent
  from required CI checks.
- CI configuration is scoped to validation only.
- CD and publishing remain reserved for a later phase.

## Evidence

- [[quality-gates]]
- [[release-and-ci]]
- [[requirements/operational/phase-execution|phase-execution]]
- [[sources/flavor-grenade-lsp/docs/requirements/code-quality|code quality requirements]]
- [[sources/flavor-grenade-lsp/docs/requirements/ci-cd|root CI/CD requirements]]
- [[sources/flavor-grenade-lsp/docs/plans/phase-W8-commonloom-content-pipeline/TASK-275|TASK-275]]

## See Also

- [[Commonloom Extraction Plan]]
- [[Commonloom Requirements]]
