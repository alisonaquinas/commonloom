---
title: Commonloom Roadmap
tags:
  - commonloom
  - roadmap
status: active
updated: 2026-05-10
aliases:
  - Roadmap
  - Commonloom Roadmap
---

# Commonloom Roadmap

This roadmap tracks standalone Commonloom implementation phases.

## Phases

| Phase | Status | Goal |
| --- | --- | --- |
| [[plans/phase-1-import-commonloom-package|Phase 1]] | in-review | Import the upstream Commonloom package source and tests into local `src/` and `test/`. |
| [[plans/phase-2-ci-quality-gates|Phase 2]] | active | Add strict type-aware linting and prove full package checks in CI. |

## Phase Principles

- Follow [[requirements/operational/phase-execution|Phase Execution]].
- Track work with typed tickets from
  [[requirements/operational/task-management|Task Management]].
- Keep implementation aligned with [[Commonloom Requirements]].
- Preserve the adapter-neutral boundary from
  [[adr/0001-keep-commonloom-adapter-neutral|ADR 0001]].
- Record new durable architecture decisions in [[adr|Commonloom ADRs]].

## See Also

- [[Commonloom Extraction Plan]]
- [[plans/phase-1-import-commonloom-package/index|Phase 1 Tickets]]
- [[plans/phase-2-ci-quality-gates/index|Phase 2 Tickets]]
- [[Commonloom Architecture]]
- [[ddd/index|Commonloom DDD]]
- [[bdd/index|Commonloom BDD]]
