---
title: Quality Gates Operational Requirements
tags:
  - commonloom
  - requirements/operational
  - quality
status: active
updated: 2026-05-10
aliases:
  - Quality Gate Requirements
---

# Quality Gates Operational Requirements

| ID | Requirement | Acceptance |
| --- | --- | --- |
| CLR-OPS-001 | Commonloom shall define package scripts for install, build, test, typecheck, lint, and format checks once source exists. | README and CI reference verified commands only after the scripts exist. |
| CLR-OPS-002 | Commonloom tests shall cover core parsing, frontmatter, HTML, links, media, diagnostics, source traces, and adapter boundaries. | Unit tests exercise each functional requirement family. |
| CLR-OPS-003 | CI shall fail on TypeScript errors, lint errors, lint warnings, test failures, and build failures. | CI jobs use zero-warning lint and strict typecheck. |
| CLR-OPS-004 | Generated or disposable outputs shall be reproducible and excluded from source control unless a later ADR changes this. | Generated output checks fail on stale or committed build artifacts. |
| CLR-OPS-005 | Documentation checks shall verify requirement links and ADR structure where tooling exists. | ADR lint passes for `docs/adr/`; synthesized wikilinks resolve. |
| CLR-OPS-006 | CI shall run the complete unit test suite once the unit test library exists. | Required CI test jobs run the full suite without watch mode, filename filters, focused tests, or skip-only shortcuts. |
| CLR-OPS-007 | TypeScript linting shall be strict and warning-free. | Required lint jobs cover package source and test TypeScript files, treat warnings as failures, and document any explicit generated-output exclusions. |

## Evidence

- [[sources/flavor-grenade-lsp/website/docs/requirements/technical/ci-cd|website CI/CD requirements]]
- [[sources/flavor-grenade-lsp/docs/requirements/code-quality|code quality requirements]]
- [[sources/flavor-grenade-lsp/docs/plans/phase-W8-commonloom-content-pipeline/TASK-275|TASK-275]]
- [[phase-2-ci-quality-gates]]
