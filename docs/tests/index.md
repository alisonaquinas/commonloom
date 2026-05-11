---
title: Commonloom Test Battery
tags:
  - commonloom
  - tests
  - index
status: active
updated: 2026-05-11
aliases:
  - Test Battery
  - Testing Index
---

# Commonloom Test Battery

Commonloom currently has a Vitest battery for package behavior and a repository
verification gate that runs lint, static verification, typecheck, build, and
tests.

> [!NOTE] Scope
> This section documents the current test surface. It distinguishes executable
> coverage from requirements that remain intentionally visible as gaps.

## Test Types

| Type | Current Status | Purpose |
| --- | --- | --- |
| [[tests/unit/index|Unit Tests]] | Active | Exercise library modules and exported contracts through focused Vitest cases. |
| [[tests/integration/index|Integration Tests]] | Active | Exercise public compiler behavior across parser, renderer, resolver, media, and trace modules. |
| [[tests/e2e/index|End-To-End Tests]] | Active | Exercise fixture workflows from content inputs to adapter-visible compiled records. |
| [[tests/verification/index|Verification]] | Active | Prove repository checks run as specified. |
| [[tests/validation/index|Validation]] | Partial | Connect tested behavior to intended Commonloom outcomes and requirements. |

## Current Automated Battery

| Command | Type | What It Proves |
| --- | --- | --- |
| `npm run test:battery` | [[tests/unit/index|Unit]], [[tests/integration/index|Integration]], [[tests/e2e/index|E2E]] | Runs the typed unit, integration, and E2E Vitest commands used by CI. |
| `npm run test:unit` | [[tests/unit/index|Unit]] | Runs five Vitest files with twenty-seven assertions over module and helper behavior. |
| `npm run test:integration` | [[tests/integration/index|Integration]] | Runs the public compiler integration flow. |
| `npm run test:e2e` | [[tests/e2e/index|E2E]] | Runs the fixture content tree through adapter-visible compiled records. |
| `npm test` | [[tests/unit/index|Unit]], [[tests/integration/index|Integration]], [[tests/e2e/index|E2E]] | Runs every Vitest file without category filtering. |
| `npm run lint:docs` | [[tests/verification/index|Verification]] | Checks root Markdown, Obsidian vault Markdown, and MADR ADR shape. |
| `npm run lint` | [[tests/verification/index|Verification]] | Runs documentation linting and TypeScript ESLint with warnings blocked. |
| `npm run verify` | [[tests/verification/index|Verification]] | Runs static boundary, dependency, generated-output, traceability, and phase/ticket process checks. |
| `npm run typecheck` | [[tests/verification/index|Verification]] | Confirms TypeScript contracts typecheck without emitting output. |
| `npm run build` | [[tests/verification/index|Verification]] | Confirms the distributable TypeScript build compiles. |
| `npm run check` | [[tests/verification/index|Verification]] | Runs the full local quality gate and mirrors the CI step sequence. |

## Traceability

The [[tests/requirements-matrix|Requirements Test Matrix]] maps every current
Commonloom requirement to existing unit tests, verification gates, partial
coverage, or an explicit test gap.

[[plans/phase-3-close-testing-gaps|Phase 3]] closed the first set of test
matrix gaps. [[plans/phase-5-audit-driven-hardening|Phase 5]] added audit
regressions for security, traceability, diagnostics, and source positions.

## Vitest Inventory

| File | Primary Type | Current Coverage |
| --- | --- | --- |
| [content-pipeline-core.test.ts](../../test/content-pipeline-core.test.ts) | [[tests/unit/index|Unit]] | Public exports, diagnostics, source traces, compiler no-manifest behavior, and adapter-owned link callbacks. |
| [content-pipeline-markdown.test.ts](../../test/content-pipeline-markdown.test.ts) | [[tests/unit/index|Unit]] | Frontmatter parsing, Zod validation diagnostics, CommonMark/GFM parsing, GFM autolinks, strikethrough, blockquotes, code, images, and heading extraction. |
| [content-pipeline-html.test.ts](../../test/content-pipeline-html.test.ts) | [[tests/unit/index|Unit]] | Markdown-to-HTML rendering, unsafe HTML tag and attribute diagnostics, static inline HTML allowlisting, sanitization, and source trace hashing. |
| [content-pipeline-links-media.test.ts](../../test/content-pipeline-links-media.test.ts) | [[tests/unit/index|Unit]] | Link classification, link extraction, source positions, internal and wiki-link adapter resolution, unsupported schemes, media path checks, traversal rejection, and alt text diagnostics. |
| [content-pipeline-security.test.ts](../../test/content-pipeline-security.test.ts) | [[tests/unit/index|Unit]] | Frontmatter bounds, prototype-pollution safety, long wiki-link parsing, Markdown/media symlink escape rejection, and compile resource limits. |
| [content-pipeline-integration.test.ts](../../test/content-pipeline-integration.test.ts) | [[tests/integration/index|Integration]] | Public compiler flow across manifest input, parsing, rendering, wiki-link resolution, media validation, and source traces. |
| [content-pipeline-e2e.test.ts](../../test/content-pipeline-e2e.test.ts) | [[tests/e2e/index|E2E]] | Fixture content tree compiled through the public API into adapter-visible records. |

## Known Gaps

- No formal validation suite traces behavior directly from every requirement or
  BDD scenario.
- Generated-output reproducibility remains adapter-owned and has no local
  adapter fixture yet.
- Remote CI and release dry-run evidence remains pending for the trusted
  publishing workflow.

## See Also

- [test/README.md](../../test/README.md)
- [[tests/requirements-matrix|Requirements Test Matrix]]
- [[Commonloom Requirements]]
- [[bdd/index|Commonloom BDD]]
- [[requirements/operational/quality-gates|Quality Gates]]
- [[phase-2-ci-quality-gates|Phase 2 CI Quality Gates]]
