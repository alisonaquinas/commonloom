---
title: BDD Feature - Adapter Integration
tags:
  - commonloom
  - bdd
  - cucumber
  - feature
status: active
updated: 2026-05-10
aliases:
  - Adapter Integration Feature
---

# BDD Feature - Adapter Integration

Covered requirements: `CLR-USER-010..014`, `CLR-FUNC-040..045`,
`CLR-FUNC-080..084`, `CLR-TECH-001..005`.

Suggested automation level: API acceptance for public compiler contracts,
component tests for adapter callback behavior.

```gherkin
Feature: Adapter integration
  Adapter developers need project-specific policy to stay outside Commonloom
  so the core library remains reusable across consuming projects.

  Background:
    Given an adapter supplies normalized document entries to Commonloom

  Scenario: Adapter-owned manifest entries compile through the core
    Given a manifest entry with adapter-owned route and output metadata
    When the adapter normalizes the entry for Commonloom
    And Commonloom compiles the normalized document entry
    Then the compiled record should include generic document data
    And the adapter-owned metadata should remain available to the adapter
    And Commonloom should not require the adapter's manifest schema

  Scenario: Wiki-links are resolved by adapter policy
    Given a content source with a wiki-link target
    And the adapter provides a wiki-link policy
    When the content source is compiled
    Then Commonloom should classify the target as a wiki-link
    And the adapter policy should decide the project-specific resolved target
    And Commonloom should not import a project route registry

  Scenario: Adapter chooses its output artifact format
    Given a compiled record with body HTML, source trace, and diagnostics
    When the adapter writes an output artifact
    Then the output artifact format should be adapter-owned
    And generated TypeScript should be optional
    And the compiled record should remain useful for check-only workflows

  Scenario: Media references are mapped by the adapter
    Given a content source with a local image reference
    And Commonloom is configured with approved media roots
    When the content source is compiled
    Then Commonloom should validate the media reference
    And the adapter should receive enough source data to map the media to its runtime asset model

  Scenario: Framework-specific code stays outside the core
    Given an adapter imports framework components and renderer types
    When Commonloom core modules are reviewed
    Then the core should not import framework components
    And the core should not import project route modules
    And the core should not import project product data
```

## Lower-Level Test Candidates

- callback type narrowing
- generic adapter metadata preservation
- deterministic artifact generation in adapter tests
- static forbidden-import checks

## See Also

- [[requirements/user/adapter-development|Adapter Development Requirements]]
- [[requirements/functional/adapter-output-contract|Adapter Output Contract]]
- [[adr/0001-keep-commonloom-adapter-neutral|ADR 0001]]
- [[adr/0003-keep-generated-typescript-adapter-owned|ADR 0003]]
