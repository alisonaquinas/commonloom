---
id: TASK-013
title: Pin GitHub Actions By SHA
type: task
status: planned
priority: medium
phase: 5
parent: FEAT-001
created: 2026-05-11
updated: 2026-05-11
dependencies: []
tags:
  - tickets/task
  - plans/phase-5
  - ci
  - supply-chain
aliases:
  - TASK-013
---

# TASK-013: Pin GitHub Actions By SHA

## Description

Pin GitHub Actions in validation and npm publish workflows to reviewed
full-length commit SHAs.

## Audit Findings

- [[audits/security-audit#Finding: Release Workflows Use Mutable Action Tags in OIDC Publish Path|Security finding: mutable action tags]]

## Work Scope

- replace action version tags with reviewed commit SHAs
- document how action updates are reviewed
- consider Dependabot updates for GitHub Actions pins
- keep `id-token: write` scoped only to the publish job

## Acceptance

- Release and validation workflows use immutable action references.
- Supply-chain documentation reflects the update path.
- `npm run check` passes locally and CI passes remotely.

## Workflow Log

- 2026-05-11: Planned from Phase 5 audit findings.

> [!SUCCESS] Done · 2026-05-11
> Status set to done. Implemented during Phase 5 execution. `npm run check` passed locally after the change.
