---
title: Markdown And Frontmatter Functional Requirements
tags:
  - commonloom
  - requirements/functional
  - markdown
status: active
updated: 2026-05-29
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
| CLR-FUNC-007 | Commonloom shall support one explicit Markdown flavor per compile run. | A run resolves one effective flavor before compiling manifests, and manifests cannot override it. |
| CLR-FUNC-008 | Commonloom shall expose optional modes for every explicit Markdown flavor modeled by Flavor Grenade. | The public flavor union includes `original`, `commonmark`, `obsidian`, `gfm`, `glfm`, `pandoc`, `multimarkdown`, `mdx`, `kramdown`, `markdown-extra`, `r-markdown`, `reddit`, and `stack-overflow`. |
| CLR-FUNC-009 | Commonloom shall preserve no-config Markdown behavior with a `gfm` default flavor. | When no flavor is configured, output matches existing CommonMark plus GFM fixtures and baselines. |
| CLR-FUNC-010 | Commonloom shall apply the selected flavor consistently across parsing, rendering, source traces, links, and media extraction. | Parser output, rendered HTML, source traces, link records, image/media records, and diagnostics all use the same effective flavor state. |
| CLR-FUNC-011 | Commonloom shall classify flavor-specific host syntax without resolving it inside core. | Host references are surfaced as adapter-resolvable or unsupported diagnostics rather than converted into product-specific routes. |
| CLR-FUNC-012 | Commonloom shall treat executable flavor constructs as non-executing content pipeline input. | MDX JavaScript, JSX expressions, ESM declarations, R chunks, diagram directives, includes, filters, and host references are not executed or fetched by Commonloom. |
| CLR-FUNC-013 | Commonloom shall report invalid or conflicting flavor policy with stable diagnostics. | Unsupported flavor values and multiple effective base flavors return dedicated diagnostics before document compilation proceeds. |

## Evidence

- [[sources/flavor-grenade-lsp/docs/plans/phase-W8-commonloom-content-pipeline/TASK-269|TASK-269]]
- [[sources/flavor-grenade-lsp/website/docs/requirements/technical/source-layout-and-documentation|source layout and documentation requirements]]
- [[sources/flavor-grenade-lsp/website/docs/requirements/functional/public-pages|public page requirements]]
- [[sources/flavor-grenade-lsp/src/markdown-flavor/index|Markdown Flavor Source Evidence]]
- [[architecture/Markdown Flavor Modes]]
