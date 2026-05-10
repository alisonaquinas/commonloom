---
title: Commonloom BDD Index
tags:
  - commonloom
  - bdd
  - cucumber
  - index
status: active
updated: 2026-05-10
aliases:
  - BDD Index
  - Commonloom Behaviors
---

# Commonloom BDD Index

This folder documents Commonloom behavior with Cucumber-style examples.

The scenarios are acceptance specifications for shared review. They are not yet
bound to executable step definitions because this repository does not yet have
the package source, test runner, or Cucumber dependency scaffold.

## Notes

| Note | Purpose |
| --- | --- |
| [[actors|Actors]] | People and systems that interact with Commonloom. |
| [[scenario-catalog|Scenario Catalog]] | Feature map, automation level, and requirement traceability. |
| [[bdd/features/content-authoring|Content Authoring Feature]] | Markdown author behavior and content outcomes. |
| [[bdd/features/adapter-integration|Adapter Integration Feature]] | Adapter-owned routing, schemas, outputs, and media mapping. |
| [[bdd/features/compilation-safety|Compilation Safety Feature]] | HTML, path, URI, and malformed frontmatter behavior. |
| [[bdd/features/diagnostics-and-traces|Diagnostics And Traces Feature]] | Diagnostics, severities, source traces, and stable hashes. |
| [[bdd/features/documentation-and-operations|Documentation And Operations Feature]] | Docs governance, tickets, phase gates, CI, and publishing workflow. |

## BDD Rule

Use Gherkin for behavior that project contributors, adapter developers, and
reviewers should be able to discuss in domain language.

Use lower-level tests for parser edge cases, AST traversal branches, escaping
details, hash algorithm fixtures, and implementation-specific error branches.

> [!NOTE] Evidence
> These scenarios synthesize [[Commonloom Requirements]],
> [[ddd/ubiquitous-language|Commonloom Vocabulary]], and
> [[ddd/bounded-contexts|Commonloom Bounded Contexts]].

## See Also

- [[Commonloom Requirements]]
- [[ddd/index|Commonloom DDD]]
- [[Commonloom Architecture]]
