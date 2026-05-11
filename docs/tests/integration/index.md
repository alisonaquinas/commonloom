---
title: Commonloom Integration Tests
tags:
  - commonloom
  - tests
  - integration
status: planned
updated: 2026-05-10
aliases:
  - Integration Tests
---

# Commonloom Integration Tests

Commonloom does not currently have a dedicated integration test directory or
script.

## Intended Definition

An integration test should exercise multiple Commonloom modules together across
a realistic package boundary without becoming a full consumer application test.

Likely future examples:

- parse frontmatter and Markdown, render HTML, extract references, validate
  media, resolve wiki-links, and assemble source traces in one flow
- compile multiple manifest entries once `compileCommonloom` owns manifest
  traversal
- verify adapter callbacks can resolve routes without importing adapter code
  into `src/`

## Current Related Coverage

Some existing unit tests are integration-adjacent:

- [content-pipeline-html.test.ts](../../../test/content-pipeline-html.test.ts)
  exercises Markdown parsing, rendering, sanitization, and source tracing.
- [content-pipeline-links-media.test.ts](../../../test/content-pipeline-links-media.test.ts)
  exercises parsing, reference extraction, adapter callbacks, filesystem media
  checks, and path confinement.

They remain classified as unit tests until there is a dedicated integration
suite or script.

## Gap

No automated command currently runs integration tests separately from
`npm test`.

## See Also

- [[tests/index|Commonloom Test Battery]]
- [[tests/unit/index|Unit Tests]]
- [[Commonloom Architecture]]
