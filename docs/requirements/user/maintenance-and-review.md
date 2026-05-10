---
title: Maintenance And Review User Requirements
tags:
  - commonloom
  - requirements/user
  - maintenance
status: active
updated: 2026-05-10
aliases:
  - Maintainer Requirements
---

# Maintenance And Review User Requirements

## Scope

These requirements describe what maintainers, reviewers, and release operators
need from the project.

| ID | Requirement | Acceptance |
| --- | --- | --- |
| CLR-USER-020 | Maintainers shall distinguish implemented behavior from planned extraction behavior. | Docs mark package gaps until source, tests, and scripts exist in this repository. |
| CLR-USER-021 | Reviewers shall trace requirements back to imported source evidence. | Requirement pages link to upstream source imports or local ADRs. |
| CLR-USER-022 | Maintainers shall review API changes against the adapter-neutral boundary. | Public API changes update [[adr|ADRs]], [[Commonloom Architecture]], or requirements when durable behavior changes. |
| CLR-USER-023 | Release operators shall have repeatable validation commands before publishing. | Operational requirements define test, lint, typecheck, build, and release gates once scripts exist. |

## Evidence

- [[sources/flavor-grenade-lsp/website/docs/requirements/technical/source-layout-and-documentation|source layout and documentation requirements]]
- [[sources/flavor-grenade-lsp/website/docs/requirements/technical/ci-cd|website CI/CD requirements]]
- [[sources/flavor-grenade-lsp/docs/requirements/development-process|development process requirements]]
- [[sources/flavor-grenade-lsp/docs/requirements/code-quality|code quality requirements]]
