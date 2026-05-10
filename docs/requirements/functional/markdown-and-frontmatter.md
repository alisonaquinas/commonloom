---
title: Markdown And Frontmatter Functional Requirements
tags:
  - commonloom
  - requirements/functional
  - markdown
status: active
updated: 2026-05-10
aliases:
  - Markdown Requirements
  - Frontmatter Requirements
---

# Markdown And Frontmatter Functional Requirements

| ID | Requirement | Acceptance |
| --- | --- | --- |
| CLR-FUNC-001 | Commonloom shall parse CommonMark Markdown. | Standard block and inline Markdown constructs produce a parsed document representation. |
| CLR-FUNC-002 | Commonloom shall support GitHub Flavored Markdown. | Tables, task lists, autolinks, and strikethrough are parsed in fixtures. |
| CLR-FUNC-003 | Commonloom shall extract heading text, level, generated id, and source position when available. | Parsed headings are present in the compiled record and source trace. |
| CLR-FUNC-004 | Commonloom shall parse YAML frontmatter separately from Markdown body content. | Frontmatter data and Markdown body can be consumed independently. |
| CLR-FUNC-005 | Commonloom shall let callers validate frontmatter with caller-owned schemas. | Invalid caller schema results produce diagnostics without throwing for normal validation failures. |
| CLR-FUNC-006 | Commonloom shall report malformed frontmatter as a diagnostic. | Malformed frontmatter returns `FRONTMATTER_INVALID` or successor diagnostic code and does not crash compilation. |

## Evidence

- [[sources/flavor-grenade-lsp/docs/plans/phase-W8-commonloom-content-pipeline/TASK-269|TASK-269]]
- [[sources/flavor-grenade-lsp/website/docs/requirements/technical/source-layout-and-documentation|source layout and documentation requirements]]
- [[sources/flavor-grenade-lsp/website/docs/requirements/functional/public-pages|public page requirements]]
