---
title: Quality Gates Operational Requirements
tags:
  - commonloom
  - requirements/operational
  - quality
status: active
updated: 2026-05-28
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
| CLR-OPS-006 | Pre-commit hooks shall run the available local quality gates for touched work. | Documentation-only commits run `npm run lint:docs`; package commits also run package gates once those scripts exist. |
| CLR-OPS-007 | Lint warnings are blocking findings, not advisory output. | A commit, PR, or phase gate is not green while any configured lint warning remains. |
| CLR-OPS-008 | Quality gates shall be fixed by correcting files, not by weakening rules, unless a rule change is approved as its own documented decision. | Rule relaxations require explicit approval and a linked rationale. |
| CLR-OPS-009 | CI shall run the complete test battery once the test library exists. | Required CI test jobs run unit, integration, and E2E test commands without watch mode, focused-only execution, or skip-only shortcuts. |
| CLR-OPS-010 | TypeScript linting shall be strict and warning-free. | Required lint jobs cover package source and test TypeScript files, treat warnings as failures, and document any explicit generated-output exclusions. |
| CLR-OPS-011 | CI shall run the example compatibility battery when examples exist. | Required CI jobs verify example parity and build every example workspace on Node.js 24 before reporting success. |
| CLR-OPS-012 | CI shall include a dedicated static code quality inspection workflow. | A required workflow runs documentation lint, TypeScript lint, process verification, and typecheck on Node.js 24 without publishing permissions. |
| CLR-OPS-013 | CI shall include free SAST inspection for JavaScript, TypeScript, workflow, and configuration risk where supported by free tooling. | CodeQL and Semgrep Community Edition run in GitHub Actions, block on findings, and upload SARIF evidence when GitHub code scanning accepts it. |
| CLR-OPS-014 | SAST suppressions shall be narrow, local, and justified where a scanner cannot infer Commonloom's sanitization or trust boundary. | Suppression comments document the safety reason adjacent to the finding and broad repository-level ignores are limited to imported sources, dependencies, and generated outputs. |

## Evidence

- [[sources/flavor-grenade-lsp/website/docs/requirements/technical/ci-cd|website CI/CD requirements]]
- [[sources/flavor-grenade-lsp/docs/requirements/code-quality|code quality requirements]]
- [[sources/flavor-grenade-lsp/docs/plans/phase-W8-commonloom-content-pipeline/TASK-275|TASK-275]]
- [[phase-2-ci-quality-gates]]
- [[tests/verification/index|Commonloom Verification]]
