---
title: Content Authoring User Requirements
tags:
  - commonloom
  - requirements/user
  - authoring
status: active
updated: 2026-05-10
aliases:
  - Authoring Requirements
---

# Content Authoring User Requirements

## Scope

These requirements describe what Commonloom must enable for Markdown content
authors and LLM agents that maintain documentation or public copy.

| ID | Requirement | Acceptance |
| --- | --- | --- |
| CLR-USER-001 | Content authors shall write page body content in Markdown rather than hand-maintained TypeScript records. | A content source can be authored as Markdown and compiled without editing renderer data structures by hand. |
| CLR-USER-002 | Content authors shall use CommonMark and GitHub Flavored Markdown constructs expected in public documentation. | Headings, lists, tables, blockquotes, links, images, code, emphasis, and task lists compile into semantic output. |
| CLR-USER-003 | Content authors shall keep page-local metadata near the source copy when an adapter supports frontmatter. | Frontmatter can be parsed and returned for adapter schema validation. |
| CLR-USER-004 | Content authors shall receive actionable diagnostics for broken links, unsafe HTML, missing media, invalid frontmatter, and unsafe paths. | Diagnostics include code, severity, message, source path, and source position when available. |
| CLR-USER-005 | LLM agents shall be able to maintain small, linked concept pages without losing source traceability. | Compiled records preserve headings, links, images, source path, and content hash. |

## Evidence

- [[sources/flavor-grenade-lsp/website/docs/authoring/content-pipeline|content-pipeline authoring]]
- [[sources/flavor-grenade-lsp/website/docs/requirements/functional/public-pages|public page requirements]]
- [[sources/flavor-grenade-lsp/website/docs/requirements/functional/llm-wiki-standards|LLM wiki standards]]
- [[sources/flavor-grenade-lsp/website/docs/requirements/user/concepts|concept user requirements]]
