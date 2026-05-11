---
title: Commonloom Validation
tags:
  - commonloom
  - tests
  - validation
status: partial
updated: 2026-05-10
aliases:
  - Validation Tests
  - Validation Battery
---

# Commonloom Validation

Validation asks whether Commonloom's tested behavior matches the intended user,
domain, and requirements outcomes.

## Current Status

Commonloom has partial validation through behavior-oriented unit tests, BDD
documentation, and a blocking requirements traceability check. It does not yet
have a dedicated validation test suite.

## Current Evidence

| Evidence | Validation Meaning |
| --- | --- |
| [[bdd/index|Commonloom BDD]] | Describes expected actor behavior and Cucumber-style scenarios. |
| [[Commonloom Requirements]] | Defines user, functional, technical, and operational requirements. |
| [content-pipeline-markdown.test.ts](../../../test/content-pipeline-markdown.test.ts) | Confirms Markdown and frontmatter behavior expected by content authors and adapter developers. |
| [content-pipeline-html.test.ts](../../../test/content-pipeline-html.test.ts) | Confirms renderer safety and source trace behavior expected by maintainers. |
| [content-pipeline-links-media.test.ts](../../../test/content-pipeline-links-media.test.ts) | Confirms link, media, and path safety behavior expected by adapters and reviewers. |
| [content-pipeline-core.test.ts](../../../test/content-pipeline-core.test.ts) | Confirms current public contracts remain adapter-neutral. |
| [content-pipeline-integration.test.ts](../../../test/content-pipeline-integration.test.ts) | Confirms the public compiler combines parser, renderer, resolver, media, and trace behavior. |
| [content-pipeline-e2e.test.ts](../../../test/content-pipeline-e2e.test.ts) | Confirms a fixture content tree compiles into adapter-visible records. |
| [verify-traceability.mjs](../../../scripts/verify-traceability.mjs) | Confirms every requirement appears in the matrix, matrix IDs are current, matrix rows are unique, and BDD requirement links resolve. |

## Requirements Traceability

The [[tests/requirements-matrix|Requirements Test Matrix]] is the current
validation map from requirements to executable tests, process verification, and
known gaps.

`npm run verify` runs the traceability check as a blocking local and CI
verification step.

## Future Validation Suite

A dedicated validation suite should trace tests to requirements or BDD
scenarios. Candidate labels:

- content author validation
- adapter developer validation
- maintainer and reviewer validation
- release operator validation

## Gap

No automated validation report currently proves that every requirement or BDD
scenario has executable coverage. The current traceability check proves that
the map itself is complete and current, then leaves intentional gaps visible in
the matrix.

## See Also

- [[tests/index|Commonloom Test Battery]]
- [[bdd/scenario-catalog|Scenario Catalog]]
- [[Commonloom Requirements]]
