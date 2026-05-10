---
title: BDD Feature - Compilation Safety
tags:
  - commonloom
  - bdd
  - cucumber
  - feature
status: active
updated: 2026-05-10
aliases:
  - Compilation Safety Feature
---

# BDD Feature - Compilation Safety

Covered requirements: `CLR-FUNC-022`, `CLR-FUNC-043..045`,
`CLR-TECH-060..065`.

Suggested automation level: component tests for safety services, API
acceptance tests for observable diagnostics.

```gherkin
Feature: Compilation safety
  Maintainers and adapter developers need unsafe content to fail safely
  so compiled output can be trusted by consuming projects.

  Scenario: Unsafe inline HTML is rejected or removed
    Given a content source with a script tag and an event handler attribute
    And an HTML policy that rejects unsafe inline HTML
    When the content source is compiled
    Then the compiled output should not include the unsafe markup
    And the result should include an unsafe HTML diagnostic

  Scenario: Path traversal cannot escape approved roots
    Given a content source with a media reference outside the approved roots
    When the content source is compiled
    Then the media reference should be rejected
    And the result should include a path safety diagnostic
    And Commonloom should not read the escaped filesystem path

  Scenario: Unsupported URI schemes are reported
    Given a content source with a link target using an unsupported URI scheme
    When the content source is compiled
    Then the link reference should be classified as unsupported
    And the result should include a diagnostic for the unsupported target

  Scenario: Missing non-decorative image alt text is reported
    Given a content source with a non-decorative image missing alt text
    And the adapter has not supplied a decorative image policy for that image
    When the content source is compiled
    Then the result should include a missing alt text diagnostic

  Scenario: Expected validation failures do not exhaust the process
    Given a content source that exceeds configured parser safety limits
    When the content source is compiled
    Then the compile job should fail safely
    And the result should include a bounded-work diagnostic when available
    And the process should remain available for later compile jobs
```

## Lower-Level Test Candidates

- encoded traversal variants
- symlink escape handling
- URI scheme classification table
- prototype pollution fixtures
- parser size and alias limits
- ReDoS-focused regex review tests

## See Also

- [[requirements/technical/security-validation|Security Validation]]
- [[requirements/functional/links-and-media|Links And Media]]
- [[requirements/functional/html-rendering|HTML Rendering]]

