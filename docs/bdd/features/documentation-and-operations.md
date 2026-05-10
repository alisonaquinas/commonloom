---
title: BDD Feature - Documentation And Operations
tags:
  - commonloom
  - bdd
  - cucumber
  - feature
status: active
updated: 2026-05-10
aliases:
  - Documentation And Operations Feature
---

# BDD Feature - Documentation And Operations

Covered requirements: `CLR-OPS-001..005`, `CLR-OPS-020..024`,
`CLR-OPS-040..047`, `CLR-OPS-080..112`.

Suggested automation level: process acceptance checks, documentation lint, CI
workflow tests, and release dry-runs where tooling exists.

```gherkin
Feature: Documentation and operations
  Maintainers, reviewers, release operators, and LLM agents need traceable
  project operations so Commonloom can be extracted and released safely.

  Scenario: Durable documentation claims are evidence-backed
    Given a synthesized Commonloom note makes a durable behavior claim
    When a reviewer inspects the note
    Then the claim should link to source imports, local code, requirements, or ADRs
    And raw source imports should remain separate from synthesized notes

  Scenario: Behavior-changing tickets record test-first evidence
    Given a task ticket changes observable Commonloom behavior
    And test infrastructure exists for that behavior
    When the ticket moves into implementation
    Then the workflow log should record failing test evidence before implementation evidence
    And the ticket status should match the latest workflow state

  Scenario: Blocked tickets name their blockers
    Given a Commonloom ticket cannot proceed
    When the ticket is marked blocked
    Then the ticket should identify the blocker
    And the workflow log should preserve prior state for resumption

  Scenario: Phase completion requires terminal tickets and gate evidence
    Given a Commonloom implementation phase has planned tickets
    When the phase is evaluated for completion
    Then every phase ticket should be in a terminal status
    And CI gate evidence should be recorded before the phase is complete
    And the phase record should include a retrospective

  Scenario: Release publishing uses trusted npm publishing
    Given a production release tag points to a commit on main
    When the release workflow publishes the package to npm
    Then the workflow should use Node.js 24
    And the workflow should request OIDC id-token permission
    And the workflow should publish without a long-lived npm token

  Scenario: Branch names follow git-flow conventions
    Given a contributor opens a branch for Commonloom work
    When the branch is reviewed
    Then the branch name should use an accepted git-flow prefix
    And changes should merge through a pull request gate
```

## Lower-Level Test Candidates

- markdown link resolver checks
- ADR structure lint
- workflow YAML static checks
- package provenance dry-run evidence
- ticket frontmatter and workflow-log consistency checks

## See Also

- [[requirements/operational/documentation-maintenance|Documentation Maintenance]]
- [[requirements/operational/task-management|Task Management]]
- [[requirements/operational/phase-execution|Phase Execution]]
- [[requirements/operational/release-and-ci|Release And CI]]
- [[requirements/operational/supply-chain|Supply Chain]]
