---
id: TASK-005
title: Harden Path Confinement
type: task
status: done
priority: high
phase: 5
parent: FEAT-001
created: 2026-05-11
updated: 2026-05-11
dependencies: []
tags:
  - tickets/task
  - plans/phase-5
  - security
  - paths
aliases:
  - TASK-005
---

# TASK-005: Harden Path Confinement

## Description

Fix path confinement weaknesses for Windows cross-drive paths and Markdown
source symlink or junction escapes.

## Audit Findings

- [[audits/code-quality-audit#CQ-001 - High - Cross-Drive Absolute Paths Can Bypass Root Confinement|CQ-001]]
- [[audits/security-audit#Finding: Markdown Source Symlinks Bypass copyRoot Confinement|Security finding: source symlink escape]]

## Work Scope

- reject cross-drive and UNC root mismatches in `resolveInsideRoot`
- canonicalize Markdown source paths before `readFile`
- preserve useful missing-file diagnostics
- add Windows, UNC, symlink, and junction-shaped tests where practical

## Acceptance

- Cross-drive absolute targets cannot be accepted as inside a root.
- Markdown source symlinks cannot escape `copyRoot`.
- Existing media confinement behavior remains covered.
- `npm run check` passes.

## Workflow Log

- 2026-05-11: Planned from Phase 5 audit findings.

> [!SUCCESS] Done · 2026-05-11
> Status set to done. Implemented during Phase 5 execution. `npm run check` passed locally after the change.

> [!INFO] Auditor confirmation · 2026-05-11
> Code quality and security auditors confirmed the path-confinement and
> Markdown source symlink fixes. Security review identified a TOCTOU edge where
> the compiler checked the real path but read the original lexical path; the
> compiler now reads the canonical real Markdown path. Follow-up debt remains
> for explicit cross-drive and UNC regression tests.

> [!SUCCESS] Remaining finding closed · 2026-05-11
> Added explicit Windows drive and UNC path regression coverage for
> `resolveInsideRoot`, closing the path-test follow-up from the code quality
> auditor.

> [!SUCCESS] CI portability fix · 2026-05-11
> Code quality revalidation found the Windows/UNC regression would fail on
> Ubuntu because Node's default `path` module is platform-native. Path
> confinement now detects Windows-shaped absolute paths and applies `path.win32`
> semantics, so the regression can run on both Windows and Linux CI.
