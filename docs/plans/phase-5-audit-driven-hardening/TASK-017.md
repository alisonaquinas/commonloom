---
id: TASK-017
title: Normalize Durable Document Frontmatter Policy
type: task
status: done
priority: medium
phase: 5
parent: FEAT-001
created: 2026-05-11
updated: 2026-05-11
dependencies: []
tags:
  - tickets/task
  - plans/phase-5
  - documentation
  - frontmatter
aliases:
  - TASK-017
---

# TASK-017: Normalize Durable Document Frontmatter Policy

## Description

Clarify or normalize frontmatter expectations for durable vault notes, ADRs,
and `docs/AGENTS.md`.

## Audit Findings

- [[audits/documentation-audit#Medium Durable docs frontmatter does not consistently match vault schema|Documentation finding: frontmatter schema drift]]

## Work Scope

- decide whether ADRs and `docs/AGENTS.md` are schema exceptions
- document exceptions or add missing frontmatter fields
- keep MADR compatibility for ADRs
- consider adding verification for durable-note frontmatter consistency

## Acceptance

- Frontmatter rules are explicit and enforceable or documented as exceptions.
- Obsidian and ADR lint remain green.
- `npm run check` passes.

## Workflow Log

- 2026-05-11: Planned from Phase 5 audit findings.

> [!SUCCESS] Done · 2026-05-11
> Status set to done. Implemented during Phase 5 execution. `npm run check` passed locally after the change.

> [!SUCCESS] Auditor confirmation · 2026-05-11
> Documentation review confirmed `docs/AGENTS.md` now has vault frontmatter and
> documents ADR files as the MADR-compatible frontmatter exception checked by
> ADR lint.
