---
title: Commonloom Integration Tests
tags:
  - commonloom
  - tests
  - integration
status: active
updated: 2026-05-10
aliases:
  - Integration Tests
---

# Commonloom Integration Tests

Commonloom currently has integration coverage in
[content-pipeline-integration.test.ts](../../../test/content-pipeline-integration.test.ts).

## Definition

An integration test should exercise multiple Commonloom modules together across
a realistic package boundary without becoming a full consumer application test.

Current integration coverage:

- parses frontmatter and Markdown through the public compiler
- renders sanitized HTML
- extracts references
- validates local media
- resolves wiki-links through adapter callbacks
- assembles source traces
- preserves adapter data on manifest entries

## Command

```bash
npm run test:integration
```

The integration file also runs through `npm run test:battery`, `npm test`, and
`npm run check`.

## Remaining Gaps

- Multi-manifest compilation has not been covered yet.
- Adapter package tests remain future work because no adapter package exists in
  this repository.

## See Also

- [[tests/index|Commonloom Test Battery]]
- [[tests/unit/index|Unit Tests]]
- [[Commonloom Architecture]]
