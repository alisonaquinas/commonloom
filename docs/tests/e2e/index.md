---
title: Commonloom End-To-End Tests
tags:
  - commonloom
  - tests
  - e2e
status: active
updated: 2026-05-10
aliases:
  - E2E Tests
  - End-To-End Tests
---

# Commonloom End-To-End Tests

Commonloom currently has end-to-end fixture coverage in
[content-pipeline-e2e.test.ts](../../../test/content-pipeline-e2e.test.ts).

## Definition

An end-to-end test should exercise a consumer-visible workflow from content
inputs through Commonloom output that an adapter or build system can consume.

Current E2E coverage:

- compile a fixture content tree into compiled document records
- validate that diagnostics, source traces, HTML, links, and media references
  survive a full compile run
- prove adapter-visible manifest data survives through public Commonloom output

## Command

```bash
npm run test:e2e
```

The E2E file also runs through `npm run test:battery`, `npm test`, and
`npm run check`.

## Remaining Gap

No external adapter package consumes the compiled record yet. Generated output
remains adapter-owned and out of scope for the current core E2E fixture.

## See Also

- [[tests/index|Commonloom Test Battery]]
- [[tests/integration/index|Integration Tests]]
- [[Commonloom Requirements]]
