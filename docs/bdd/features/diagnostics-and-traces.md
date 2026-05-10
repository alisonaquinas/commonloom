---
title: BDD Feature - Diagnostics And Traces
tags:
  - commonloom
  - bdd
  - cucumber
  - feature
status: active
updated: 2026-05-10
aliases:
  - Diagnostics And Traces Feature
---

# BDD Feature - Diagnostics And Traces

Covered requirements: `CLR-FUNC-060..064`, `CLR-TECH-040..044`.

Suggested automation level: API acceptance for result contracts, lower-level
tests for exact position and hash fixtures.

```gherkin
Feature: Diagnostics and source traces
  Reviewers and maintainers need compiled output to explain where it came from
  so content problems can be fixed without guessing.

  Scenario: Diagnostics use stable codes and severities
    Given a content source with an invalid local media reference
    When the content source is compiled
    Then the result should include a diagnostic code
    And the result should include a diagnostic severity
    And the adapter should not need to parse the diagnostic message text

  Scenario: Diagnostics include source location when available
    Given a content source with an unsafe inline HTML element on a known line
    When the content source is compiled
    Then the unsafe HTML diagnostic should include the source path
    And the unsafe HTML diagnostic should include the line when available
    And the unsafe HTML diagnostic should include the column when available

  Scenario: Source traces connect output to authored input
    Given a content source with headings, links, and images
    When the content source is compiled
    Then the compiled record should include a source trace
    And the source trace should include the Markdown source path
    And the source trace should include extracted headings, links, and images

  Scenario: Content hashes are stable for identical source content
    Given two content sources with identical Markdown body and frontmatter
    When both content sources are compiled with the same hash policy
    Then their content hashes should match

  Scenario: Check-only workflows return inspectable results
    Given a content source with one warning diagnostic
    When the adapter runs Commonloom in check-only mode
    Then the result should include the warning diagnostic
    And no output artifact should be required
```

## Lower-Level Test Candidates

- exact line and column fixture expectations
- hash algorithm and normalization rules
- severity ordering
- diagnostic code exhaustiveness tests

## See Also

- [[requirements/functional/diagnostics-and-source-traces|Diagnostics And Source Traces]]
- [[requirements/technical/schema-and-type-contracts|Schema And Type Contracts]]
- [[ddd/tactical-model|Tactical Model]]

