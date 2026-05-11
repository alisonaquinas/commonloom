---
title: Phase 3 - Close Testing Gaps
tags:
  - commonloom
  - plans
  - phase-3
  - tests
  - quality
status: in-review
updated: 2026-05-11
aliases:
  - Phase 3
  - Close Testing Gaps
  - Testing Gap Closure
---

# Phase 3 - Close Testing Gaps

Phase 3 turns the [[tests/requirements-matrix|Requirements Test Matrix]] into
actionable test work.

The phase closes high-value gaps in unit, integration, end-to-end,
verification, and validation coverage while preserving the adapter-neutral
Commonloom boundary.

## Objective

Add or improve automated tests and verification checks so Commonloom's
implemented behavior is covered by executable evidence, and so remaining
future-behavior gaps are clearly represented by tickets or blockers.

## Scope

Phase 3 includes:

- broader Markdown and GFM parser tests
- broader HTML sanitization and allowlist tests
- link and media edge-case tests
- manifest-driven compiler and compiled-record tests where implementation is
  required to close the gap
- integration tests for parse, render, reference, media, and source trace flow
- an end-to-end fixture workflow once the compiler can compile manifests
- security hardening tests for parser and path-sensitive behavior
- static verification checks for adapter-neutral boundaries and dependency
  exclusions
- traceability validation between requirements, BDD scenarios, and tests
- ticket and phase process verification where practical

Phase 3 does not include:

- package publishing
- release automation
- npm trusted publishing
- production deployment
- adapter implementation for a specific website

## Preconditions

- Phase 1 imported the package source and test scaffold.
- Phase 2 established the local and CI `npm run check` gate.
- [[tests/requirements-matrix|Requirements Test Matrix]] identifies covered,
  partial, verified, and gap rows.
- Current source remains adapter-neutral.

## Work Items

| ID | Work Item | Acceptance |
| --- | --- | --- |
| P3-001 | Broaden Markdown and GFM parser coverage. | Tests cover autolinks, strikethrough, blockquotes, code, emphasis, images, and existing heading/frontmatter behavior. |
| P3-002 | Broaden HTML safety coverage. | Tests cover event handlers, JavaScript URLs, unsafe tags, safe static tags, and sanitized static output. |
| P3-003 | Broaden link and media boundary coverage. | Tests cover same-document links, unsupported link schemes, unsupported media URI schemes, encoded traversal, absolute paths, and missing internal-link diagnostics or documented deferral. |
| P3-004 | Test manifest-driven compiled records. | Compiler tests prove manifest input, frontmatter, sanitized HTML, diagnostics, source trace, links, images, and adapter data flow through compiled records. |
| P3-005 | Add integration test suite. | A dedicated integration command or test grouping exercises parse, render, link/media validation, adapter callback resolution, and source trace assembly together. |
| P3-006 | Add end-to-end fixture workflow. | A fixture content tree compiles into adapter-visible records without importing adapter-specific code. |
| P3-007 | Add parser and filesystem security tests. | Tests cover frontmatter bounds, parser-sensitive regex behavior, symlink escapes, prototype pollution, and pathological input handling where practical. |
| P3-008 | Add static boundary verification. | Verification checks detect forbidden source imports, disallowed Markdown compiler dependencies, generated-output drift, and dependency policy violations where practical. |
| P3-009 | Add requirements and BDD traceability validation. | A maintained validation check or report maps requirements and BDD scenarios to tests and flags unmapped executable expectations. |
| P3-010 | Add phase and ticket process verification. | Checks validate ticket metadata, phase ticket indexes, ID uniqueness, terminal status before closeout, and status/log agreement where practical. |
| P3-011 | Record Phase 3 closeout evidence. | Local and remote CI evidence, updated matrix status, and remaining deferred gaps are recorded before the phase is done. |

## Tickets

- [[plans/phase-3-close-testing-gaps/FEAT-001]]
- [[plans/phase-3-close-testing-gaps/TASK-001]]
- [[plans/phase-3-close-testing-gaps/TASK-002]]
- [[plans/phase-3-close-testing-gaps/TASK-003]]
- [[plans/phase-3-close-testing-gaps/TASK-004]]
- [[plans/phase-3-close-testing-gaps/TASK-005]]
- [[plans/phase-3-close-testing-gaps/TASK-006]]
- [[plans/phase-3-close-testing-gaps/TASK-007]]
- [[plans/phase-3-close-testing-gaps/TASK-008]]
- [[plans/phase-3-close-testing-gaps/TASK-009]]
- [[plans/phase-3-close-testing-gaps/TASK-010]]
- [[plans/phase-3-close-testing-gaps/CHORE-001]]

## Test Gate

Required Phase 3 gate:

1. Run the tests introduced or changed by each ticket.
2. Run `npm run lint:docs` after every ticket documentation update.
3. Run `npm run check` before moving tickets to review.
4. Record CI evidence before closing the phase.

If a gap cannot close because the required product behavior is out of scope,
the ticket must update [[tests/requirements-matrix|Requirements Test Matrix]]
with a clear blocker or deferral instead of silently marking it covered.

## Acceptance Criteria

- [x] New or expanded tests cover all Phase 3 testable functional gaps.
- [x] Security-sensitive gaps have executable tests or explicit documented
  blockers.
- [x] Integration and E2E test categories are either active or explicitly
  blocked by missing compiler behavior.
- [x] Verification checks cover adapter-neutral source boundaries where
  practical.
- [x] Requirements matrix status is updated after each ticket.
- [x] `npm run check` passes locally.
- [ ] Remote CI evidence is captured before phase completion.

## Evidence

- [[tests/requirements-matrix|Requirements Test Matrix]]
- [[tests/index|Commonloom Test Battery]]
- [[requirements/operational/quality-gates|Quality Gates]]
- [[requirements/technical/security-validation|Security Validation]]
- [[requirements/technical/library-boundary|Library Boundary]]
- [[Commonloom Requirements]]

## See Also

- [[roadmap|Commonloom Roadmap]]
- [[plans/phase-3-close-testing-gaps/index|Phase 3 Tickets]]
- [[bdd/index|Commonloom BDD]]

## Workflow Log

> [!INFO] Planned · 2026-05-10
> Phase 3 was authored from the current requirements test matrix. Execution has
> not started.

> [!INFO] Active · 2026-05-11
> Phase 3 execution started on `feature/document-test-battery`.

> [!SUCCESS] Unit gap group · 2026-05-11
> TASK-001, TASK-002, and TASK-003 expanded Markdown/GFM, HTML safety, and
> link/media boundary tests. `npm test`, `npm run lint`, and `npm run
> typecheck` pass locally.

> [!SUCCESS] Compiler flow group · 2026-05-11
> TASK-004, TASK-005, and TASK-006 added manifest-driven compiler behavior,
> integration coverage, and E2E fixture coverage. `npm test`, `npm run lint`,
> and `npm run typecheck` pass locally with 21 tests across six files.

> [!SUCCESS] Security and boundary group · 2026-05-11
> TASK-007 and TASK-008 added parser/filesystem security coverage and static
> boundary verification. `npm test -- content-pipeline-security.test.ts` and
> `npm run verify` pass locally.

> [!SUCCESS] Traceability and process group · 2026-05-11
> TASK-009 and TASK-010 added requirements/BDD traceability validation and
> phase/ticket process verification to `npm run verify`. The gate passes
> locally after correcting terminal ticket workflow log wording.

> [!SUCCESS] Local closeout · 2026-05-11
> CHORE-001 recorded local closeout evidence. `npm run check` passes locally
> with documentation lint, traceability/process verification, typecheck, build,
> and 25 Vitest tests. Phase 3 is in review pending remote CI evidence.
