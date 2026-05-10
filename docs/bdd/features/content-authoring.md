---
title: BDD Feature - Content Authoring
tags:
  - commonloom
  - bdd
  - cucumber
  - feature
status: active
updated: 2026-05-10
aliases:
  - Content Authoring Feature
---

# BDD Feature - Content Authoring

Covered requirements: `CLR-USER-001..005`, `CLR-FUNC-001..006`,
`CLR-FUNC-020..024`.

Suggested automation level: API acceptance, with lower-level parser tests for
syntax edge cases.

```gherkin
Feature: Content authoring
  Content authors need Markdown sources to compile into reviewable output
  so they can maintain documentation without editing renderer records by hand.

  Background:
    Given Commonloom is configured with the default Markdown compilation policy

  Scenario: Markdown body compiles into semantic static HTML
    Given a content source with CommonMark headings, lists, links, and code
    When the content source is compiled
    Then the compiled document should include semantic static HTML
    And the compiled document should include extracted headings
    And no renderer-specific record should be required

  Scenario: GitHub Flavored Markdown is accepted
    Given a content source with a table, task list, autolink, and strikethrough
    When the content source is compiled
    Then the compiled document should preserve the supported GFM constructs
    And the compilation should not require a framework markdown plugin

  Scenario: Frontmatter stays near the authored content
    Given a content source with YAML frontmatter and a Markdown body
    When the content source is compiled
    Then the frontmatter block should be returned separately from the Markdown body
    And the adapter should be able to validate the frontmatter with its own schema

  Scenario: Malformed frontmatter becomes a diagnostic
    Given a content source with malformed YAML frontmatter
    When the content source is compiled
    Then the compilation should return a frontmatter diagnostic
    And the diagnostic should identify the source path when available
    And the expected validation failure should not crash the compile job

  Scenario: Inline HTML follows the selected policy
    Given a content source with safe static inline HTML
    And an HTML policy that allows safe static markup
    When the content source is compiled
    Then the compiled document should include sanitized static HTML
    And unsafe runtime markup should not survive in the output
```

## Lower-Level Test Candidates

- exact CommonMark fixture coverage
- exact GFM table and task-list rendering
- heading slug collision behavior
- HTML allowlist tag and attribute matrix

## See Also

- [[requirements/user/content-authoring|Content Authoring Requirements]]
- [[requirements/functional/markdown-and-frontmatter|Markdown And Frontmatter]]
- [[requirements/functional/html-rendering|HTML Rendering]]
