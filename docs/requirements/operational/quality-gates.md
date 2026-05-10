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

## Evidence

- [[sources/flavor-grenade-lsp/website/docs/requirements/technical/ci-cd|website CI/CD requirements]]
- [[sources/flavor-grenade-lsp/docs/requirements/code-quality|code quality requirements]]
- [[sources/flavor-grenade-lsp/docs/plans/phase-W8-commonloom-content-pipeline/TASK-275|TASK-275]]
