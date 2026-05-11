---
title: Commonloom Test Battery
tags:
  - commonloom
  - tests
  - index
status: active
updated: 2026-05-10
aliases:
  - Test Battery
  - Testing Index
---

# Commonloom Test Battery

Commonloom currently has a Vitest battery for imported package behavior and a
repository verification gate that runs lint, typecheck, build, and tests.

> [!NOTE] Scope
> This section documents the current test surface. It does not claim missing
> integration, end-to-end, or validation suites exist.

## Test Types

| Type | Current Status | Purpose |
| --- | --- | --- |
| [[tests/unit/index|Unit Tests]] | Active | Exercise library modules and exported contracts through focused Vitest cases. |
| [[tests/integration/index|Integration Tests]] | Not dedicated yet | Future cross-module or adapter integration suites. |
| [[tests/e2e/index|End-To-End Tests]] | Not present yet | Future consumer-level workflows from content inputs to adapter-visible outputs. |
| [[tests/verification/index|Verification]] | Active | Prove repository checks run as specified. |
| [[tests/validation/index|Validation]] | Partial | Connect tested behavior to intended Commonloom outcomes and requirements. |

## Current Automated Battery

| Command | Type | What It Proves |
| --- | --- | --- |
| `npm test` | [[tests/unit/index|Unit]], [[tests/integration/index|Integration]], [[tests/e2e/index|E2E]] | Runs six Vitest files with twenty-one assertions over current package behavior. |
| `npm run lint:docs` | [[tests/verification/index|Verification]] | Checks root Markdown, Obsidian vault Markdown, and MADR ADR shape. |
| `npm run lint` | [[tests/verification/index|Verification]] | Runs documentation linting and TypeScript ESLint with warnings blocked. |
| `npm run typecheck` | [[tests/verification/index|Verification]] | Confirms TypeScript contracts typecheck without emitting output. |
| `npm run build` | [[tests/verification/index|Verification]] | Confirms the distributable TypeScript build compiles. |
| `npm run check` | [[tests/verification/index|Verification]] | Runs the full local and CI quality gate. |

## Traceability

The [[tests/requirements-matrix|Requirements Test Matrix]] maps every current
Commonloom requirement to existing unit tests, verification gates, partial
coverage, or an explicit test gap.

[[plans/phase-3-close-testing-gaps|Phase 3]] is the planned roadmap phase for
closing the current matrix gaps.

## Vitest Inventory

| File | Primary Type | Current Coverage |
| --- | --- | --- |
| [content-pipeline-core.test.ts](../../test/content-pipeline-core.test.ts) | [[tests/unit/index|Unit]] | Compiler scaffold, public exports, diagnostics, source traces, and adapter-owned link callbacks. |
| [content-pipeline-markdown.test.ts](../../test/content-pipeline-markdown.test.ts) | [[tests/unit/index|Unit]] | Frontmatter parsing, Zod validation diagnostics, CommonMark/GFM parsing, GFM autolinks, strikethrough, blockquotes, code, images, and heading extraction. |
| [content-pipeline-html.test.ts](../../test/content-pipeline-html.test.ts) | [[tests/unit/index|Unit]] | Markdown-to-HTML rendering, unsafe HTML diagnostics, static inline HTML allowlisting, sanitization, and source trace hashing. |
| [content-pipeline-links-media.test.ts](../../test/content-pipeline-links-media.test.ts) | [[tests/unit/index|Unit]] | Link classification, link extraction, wiki-link adapter resolution, unsupported schemes, media path checks, missing media, traversal rejection, and alt text diagnostics. |
| [content-pipeline-integration.test.ts](../../test/content-pipeline-integration.test.ts) | [[tests/integration/index|Integration]] | Public compiler flow across manifest input, parsing, rendering, wiki-link resolution, media validation, and source traces. |
| [content-pipeline-e2e.test.ts](../../test/content-pipeline-e2e.test.ts) | [[tests/e2e/index|E2E]] | Fixture content tree compiled through the public API into adapter-visible records. |

## Known Gaps

- No formal validation suite traces behavior directly from every requirement or
  BDD scenario.
- Generated-output reproducibility remains adapter-owned and has no local
  adapter fixture yet.

## See Also

- [test/README.md](../../test/README.md)
- [[tests/requirements-matrix|Requirements Test Matrix]]
- [[Commonloom Requirements]]
- [[bdd/index|Commonloom BDD]]
- [[requirements/operational/quality-gates|Quality Gates]]
- [[phase-2-ci-quality-gates|Phase 2 CI Quality Gates]]
