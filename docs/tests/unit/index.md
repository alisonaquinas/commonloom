---
title: Commonloom Unit Tests
tags:
  - commonloom
  - tests
  - unit
status: active
updated: 2026-05-11
aliases:
  - Unit Tests
---

# Commonloom Unit Tests

Unit tests are the active executable behavior suite for Commonloom.
They run through Vitest with `npm run test:unit` and through the full
`npm run test:battery` gate.

## Current Definition

A Commonloom unit test exercises one module, exported contract, or tightly
bounded helper behavior with minimal external state.

The current suite allows small library stacks and local filesystem fixtures when
they are the behavior under test, such as unified Markdown processing or local
media validation.

## Current Files

| File | Assertions | Coverage |
| --- | --- | --- |
| [content-pipeline-core.test.ts](../../../test/content-pipeline-core.test.ts) | 3 | Compiler no-manifest behavior, diagnostics, source traces, and adapter-owned callbacks. |
| [content-pipeline-markdown.test.ts](../../../test/content-pipeline-markdown.test.ts) | 4 | Frontmatter parsing, invalid and malformed frontmatter diagnostics, heading extraction, CommonMark constructs, and GFM constructs. |
| [content-pipeline-html.test.ts](../../../test/content-pipeline-html.test.ts) | 5 | Safe inline HTML, unsafe inline HTML diagnostics, static tag allowlisting, sanitization, and stable source trace hashes. |
| [content-pipeline-links-media.test.ts](../../../test/content-pipeline-links-media.test.ts) | 10 | Link classification, link extraction, source positions, internal and wiki-link resolution, unsupported schemes, local media validation, traversal rejection, Windows/UNC root rejection, and alt text diagnostics. |
| [content-pipeline-security.test.ts](../../../test/content-pipeline-security.test.ts) | 6 | Oversized frontmatter, prototype-pollution safety, long wiki-link parsing, symlinked media and Markdown escape rejection, and compile resource limits. |

## Local Gate

```bash
npm run test:unit
```

The current unit battery contains five Vitest files and twenty-eight tests.

## Invariants

- Keep unit tests adapter-neutral.
- Use adapter callbacks to model project-owned routing decisions.
- Keep fixtures local to the test that needs them.
- Add or update unit tests when parser, renderer, resolver, diagnostics,
  source trace, path, or media behavior changes.

## See Also

- [[tests/index|Commonloom Test Battery]]
- [test/README.md](../../../test/README.md)
- [[requirements/operational/quality-gates|Quality Gates]]
