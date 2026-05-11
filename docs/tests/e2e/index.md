---
title: Commonloom End-To-End Tests
tags:
  - commonloom
  - tests
  - e2e
status: planned
updated: 2026-05-10
aliases:
  - E2E Tests
  - End-To-End Tests
---

# Commonloom End-To-End Tests

Commonloom does not currently have an end-to-end test suite.

## Intended Definition

An end-to-end test should exercise a consumer-visible workflow from content
inputs through Commonloom output that an adapter or build system can consume.

Likely future examples:

- compile a fixture content tree into compiled document records
- validate that diagnostics, source traces, HTML, links, and media references
  survive a full compile run
- prove a sample adapter can consume Commonloom output without package-internal
  imports

## Current Status

No current test starts from a full fixture content tree and ends at
adapter-visible compiled output. The compiler entry point is still a scaffold,
so E2E coverage is intentionally deferred.

## Gap

Add E2E tests after manifest-driven compilation is implemented.

## See Also

- [[tests/index|Commonloom Test Battery]]
- [[tests/integration/index|Integration Tests]]
- [[Commonloom Requirements]]
