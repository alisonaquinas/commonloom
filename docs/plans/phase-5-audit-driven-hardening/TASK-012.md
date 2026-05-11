---
id: TASK-012
title: Diagnose Unsafe HTML Attributes
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
  - html
  - diagnostics
  - security
aliases:
  - TASK-012
---

# TASK-012: Diagnose Unsafe HTML Attributes

## Description

Emit diagnostics for unsafe HTML attributes and JavaScript URLs, not only unsafe
HTML tags.

## Audit Findings

- [[audits/security-audit#Finding: Unsafe Inline HTML Attributes Are Sanitized Without Diagnostics|Security finding: unsafe HTML attributes]]
- [[audits/requirements-audit#REQ-AUDIT-001 - Unsafe Attribute Diagnostics Are Overstated|REQ-AUDIT-001]]
- Split or clarify candidates for `CLR-FUNC-022` and `CLR-USER-004`

## Work Scope

- detect event handler attributes and blocked URL protocols before or during
  sanitization
- emit `HTML_UNSAFE` diagnostics for detected unsafe attributes
- add tests for `onclick`, `onerror`, `javascript:`, and unsafe source URLs
- split or clarify requirements if diagnostic and sanitization guarantees are
  tracked separately

## Acceptance

- Unsafe attributes and JavaScript URLs are both sanitized and diagnosed.
- Requirements matrix no longer overstates coverage.
- `npm run check` passes.

## Workflow Log

- 2026-05-11: Planned from Phase 5 audit findings.

> [!SUCCESS] Done · 2026-05-11
> Status set to done. Implemented during Phase 5 execution. `npm run check` passed locally after the change.

> [!INFO] Auditor confirmation · 2026-05-11
> Security and requirements reviewers confirmed unsafe event-attribute and
> literal JavaScript URL diagnostics. Review requested broader representative
> evidence, so the HTML test now also covers `src=\"javascript:\"` and
> `onerror`. Obfuscated or entity-encoded protocols remain follow-up debt for a
> parser or sanitizer-diff based diagnostic pass.

> [!SUCCESS] Remaining finding closed · 2026-05-11
> Added detection and pre-sanitize stripping for numeric-entity, `&colon;`, and
> whitespace-obfuscated JavaScript URL attributes. Tests now cover encoded
> `href` and `srcset` values as well as literal unsafe attributes.
