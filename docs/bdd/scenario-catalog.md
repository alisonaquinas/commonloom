---
title: Commonloom BDD Scenario Catalog
tags:
  - commonloom
  - bdd
  - cucumber
  - traceability
status: active
updated: 2026-05-10
aliases:
  - Scenario Catalog
  - BDD Scenario Catalog
---

# Commonloom BDD Scenario Catalog

## Automation Levels

| Level | Use For |
| --- | --- |
| Acceptance | Actor-facing behavior and durable project rules. |
| API | Commonloom compiler inputs, outputs, diagnostics, and adapter callbacks. |
| Component | HTML policy, link classification, media validation, schema validation, and source trace builders. |
| Lower-level tests | Parser edge cases, escaping branches, exact AST traversal, hash fixtures, and filesystem corner cases. |

## Feature Map

| Feature | Primary Actor | Suggested Level | Requirement Coverage |
| --- | --- | --- | --- |
| [[bdd/features/content-authoring|Content Authoring]] | Content author | API acceptance | `CLR-USER-001..005`, `CLR-FUNC-001..006`, `CLR-FUNC-020..024` |
| [[bdd/features/adapter-integration|Adapter Integration]] | Adapter developer | API acceptance | `CLR-USER-010..014`, `CLR-FUNC-040..045`, `CLR-FUNC-080..084`, `CLR-TECH-001..005` |
| [[bdd/features/compilation-safety|Compilation Safety]] | Adapter developer, maintainer | Component/API | `CLR-FUNC-022`, `CLR-FUNC-043..045`, `CLR-TECH-060..065` |
| [[bdd/features/diagnostics-and-traces|Diagnostics And Traces]] | Reviewer, maintainer | API acceptance | `CLR-FUNC-060..064`, `CLR-TECH-040..044` |
| [[bdd/features/documentation-and-operations|Documentation And Operations]] | Maintainer, reviewer, release operator, LLM agent | Acceptance/process | `CLR-OPS-001..005`, `CLR-OPS-020..024`, `CLR-OPS-040..047`, `CLR-OPS-080..112` |

## Step Wording Rules

- Use domain terms from [[ddd/ubiquitous-language|Commonloom Vocabulary]].
- Keep route ids, renderer records, product copy, and generated TypeScript as
  adapter-owned language.
- Do not mention parser package names in Gherkin unless the behavior is about a
  public technical constraint.
- Keep exact parser edge cases in lower-level tests unless they communicate a
  shared rule.

## See Also

- [[actors|Actors]]
- [[Commonloom Requirements]]
- [[ddd/context-map|Context Map]]
