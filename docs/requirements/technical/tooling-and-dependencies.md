---
title: Tooling And Dependencies Technical Requirements
tags:
  - commonloom
  - requirements/technical
  - dependencies
status: active
updated: 2026-05-29
aliases:
  - Dependency Requirements
  - Tooling Requirements
---

# Tooling And Dependencies Technical Requirements

| ID | Requirement | Acceptance |
| --- | --- | --- |
| CLR-TECH-020 | Commonloom shall be implemented in TypeScript. | Source compiles under strict TypeScript settings once package scaffold exists. |
| CLR-TECH-021 | Commonloom shall use the unified ecosystem for Markdown and HTML processing. | Implementation uses `unified`, `remark-parse`, `remark-gfm`, `remark-frontmatter`, `remark-rehype`, `rehype-raw`, `rehype-sanitize`, and `rehype-stringify` or documented successors. |
| CLR-TECH-022 | Commonloom shall use AST traversal for headings, links, images, and source trace extraction. | Implementation uses syntax tree utilities rather than ad hoc whole-document string parsing. |
| CLR-TECH-023 | Commonloom shall support caller-owned schema validation with zod or a compatible validation boundary. | Frontmatter and manifest validation can be supplied by consumers. |
| CLR-TECH-024 | Commonloom shall not use MDsveX, MDSX, or Vite Markdown import plugins as the primary compiler. | These tools may appear only in adapters or experiments, not core pipeline implementation. |
| CLR-TECH-025 | Optional syntax highlighting shall remain optional. | `shiki` or equivalent highlighting does not become required for baseline compilation unless a later ADR changes this. |
| CLR-TECH-026 | Commonloom shall not use Flavor Grenade as a runtime library for Markdown flavor modes. | Flavor Grenade may remain source evidence, but Commonloom owns its implementation, dependencies, and public contracts. |
| CLR-TECH-027 | Commonloom shall build flavor-aware Markdown processors from explicit flavor ids. | Parser construction is keyed by `CommonloomMarkdownFlavor` instead of a single module-level processor. |
| CLR-TECH-028 | Commonloom shall keep flavor-specific executable regions inert. | Dependencies or plugins chosen for MDX, R Markdown, diagrams, includes, or filters must parse without execution or network access. |

## Evidence

- [[adr/0004-build-on-unified-remark-rehype-and-zod|ADR 0004]]
- [[sources/flavor-grenade-lsp/website/docs/research/w8-content-pipeline-technology-research|W8 technology research]]
- [[sources/flavor-grenade-lsp/website/docs/requirements/technical/index|website technical requirements]]
- [[sources/flavor-grenade-lsp/src/markdown-flavor/index|Markdown Flavor Source Evidence]]
- [[architecture/Markdown Flavor Modes]]
