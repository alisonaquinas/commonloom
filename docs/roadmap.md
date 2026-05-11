---
title: Commonloom Roadmap
tags:
  - commonloom
  - roadmap
status: active
updated: 2026-05-11
aliases:
  - Roadmap
  - Commonloom Roadmap
---

# Commonloom Roadmap

This roadmap tracks standalone Commonloom implementation phases.

## Phases

| Phase | Status | Goal |
| --- | --- | --- |
| [[plans/phase-1-import-commonloom-package|Phase 1]] | done | Import the upstream Commonloom package source and tests into local `src/` and `test/`. |
| [[plans/phase-2-ci-quality-gates|Phase 2]] | done | Add strict type-aware linting and prove full package checks in CI. |
| [[plans/phase-3-close-testing-gaps|Phase 3]] | done | Close documented unit, integration, E2E, verification, and validation test gaps. |
| [[plans/phase-4-npm-trusted-publishing|Phase 4]] | done | Add release automation and npm OIDC trusted publishing. |
| [[plans/phase-5-audit-driven-hardening|Phase 5]] | done | Audit code quality, security, documentation, and requirements evidence before hardening. |
| [[plans/phase-6-framework-integration-examples|Phase 6]] | done | Prove framework independence with shared-content examples for React, Vue, Svelte, Next.js, Angular, and Node. |

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
- [[plans/phase-3-close-testing-gaps/index|Phase 3 Tickets]]
- [[plans/phase-4-npm-trusted-publishing/index|Phase 4 Tickets]]
- [[plans/phase-5-audit-driven-hardening/index|Phase 5 Tickets]]
- [[plans/phase-6-framework-integration-examples/index|Phase 6 Tickets]]
- [[Commonloom Architecture]]
- [[ddd/index|Commonloom DDD]]
- [[bdd/index|Commonloom BDD]]
