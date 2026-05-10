---
title: Source Imports
tags:
  - commonloom
  - sources
  - imports
status: active
updated: 2026-05-10
aliases:
  - Imported Sources
  - Source Imports
---

# Source Imports

These files preserve Commonloom-relevant source material imported from
`flavor-grenade-lsp`. Treat them as evidence, not as the current standalone
documentation surface.

## Architecture, Requirements, Research, And ADRs

| Source | Why It Matters |
| --- | --- |
| [[sources/flavor-grenade-lsp/website/docs/adr/0001-use-vite-svelte-typescript-scss-and-github-pages-for-the-website|website/docs/adr/0001]] | Website stack context; leaves custom content-pipeline decisions open for W8. |
| [[sources/flavor-grenade-lsp/website/docs/architecture/content-pipeline|website/docs/architecture/content-pipeline]] | Main architecture statement for the reusable Commonloom boundary. |
| [[sources/flavor-grenade-lsp/website/docs/adr/0002-use-page-group-markdown-manifests-for-website-copy|website/docs/adr/0002]] | Accepted decision for page-group manifests, generated TypeScript, and Commonloom. |
| [[sources/flavor-grenade-lsp/website/docs/requirements/technical/source-layout-and-documentation|website/docs/requirements/technical/source-layout-and-documentation]] | Technical requirements for source layout, content generation, validation, and docs maturity. |
| [[sources/flavor-grenade-lsp/website/docs/requirements/technical/index|website/docs/requirements/technical/index]] | Higher-level website technical requirements referencing Commonloom. |
| [[sources/flavor-grenade-lsp/website/docs/authoring/content-pipeline|website/docs/authoring/content-pipeline]] | Author-facing workflow and extraction boundary note. |
| [[sources/flavor-grenade-lsp/website/docs/research/w8-content-pipeline-technology-research|website/docs/research/w8-content-pipeline-technology-research]] | Tooling research for unified, remark, rehype, and rejected alternatives. |

## Plans And Execution

| Source | Why It Matters |
| --- | --- |
| [[sources/flavor-grenade-lsp/docs/plans/phase-W8-commonloom-content-pipeline|docs/plans/phase-W8-commonloom-content-pipeline]] | Phase W8 objective, scope, workstreams, and acceptance criteria. |
| [[sources/flavor-grenade-lsp/docs/plans/phase-W8-commonloom-content-pipeline/index|docs/plans/phase-W8-commonloom-content-pipeline/index]] | Ticket index for the W8 plan. |
| [[sources/flavor-grenade-lsp/docs/roadmap|docs/roadmap]] | Roadmap entry showing W8 intent in project context. |
| [[sources/flavor-grenade-lsp/docs/plans/execution-ledger|docs/plans/execution-ledger]] | Execution status and review context. |

## W8 Tickets

| Source | Topic |
| --- | --- |
| [[sources/flavor-grenade-lsp/docs/plans/phase-W8-commonloom-content-pipeline/FEAT-041|FEAT-041]] | Feature umbrella. |
| [[sources/flavor-grenade-lsp/docs/plans/phase-W8-commonloom-content-pipeline/TASK-267|TASK-267]] | Tooling scaffold. |
| [[sources/flavor-grenade-lsp/docs/plans/phase-W8-commonloom-content-pipeline/TASK-268|TASK-268]] | Core contracts. |
| [[sources/flavor-grenade-lsp/docs/plans/phase-W8-commonloom-content-pipeline/TASK-269|TASK-269]] | Markdown and frontmatter parsing. |
| [[sources/flavor-grenade-lsp/docs/plans/phase-W8-commonloom-content-pipeline/TASK-270|TASK-270]] | HTML sanitization and source traces. |
| [[sources/flavor-grenade-lsp/docs/plans/phase-W8-commonloom-content-pipeline/TASK-271|TASK-271]] | Links, wiki-links, media, and path validation. |
| [[sources/flavor-grenade-lsp/docs/plans/phase-W8-commonloom-content-pipeline/TASK-272|TASK-272]] | Website adapter and typed manifests. |
| [[sources/flavor-grenade-lsp/docs/plans/phase-W8-commonloom-content-pipeline/TASK-273|TASK-273]] | Generated TypeScript records. |
| [[sources/flavor-grenade-lsp/docs/plans/phase-W8-commonloom-content-pipeline/TASK-274|TASK-274]] | Content migration. |
| [[sources/flavor-grenade-lsp/docs/plans/phase-W8-commonloom-content-pipeline/TASK-275|TASK-275]] | Scripts, gitignore, tests, and gates. |
| [[sources/flavor-grenade-lsp/docs/plans/phase-W8-commonloom-content-pipeline/TASK-276|TASK-276]] | Website parity and authoring docs. |
| [[sources/flavor-grenade-lsp/docs/plans/phase-W8-commonloom-content-pipeline/TASK-277|TASK-277]] | Compile generated page records. |
| [[sources/flavor-grenade-lsp/docs/plans/phase-W8-commonloom-content-pipeline/TASK-278|TASK-278]] | Switch website facades to generated content. |
| [[sources/flavor-grenade-lsp/docs/plans/phase-W8-commonloom-content-pipeline/CHORE-095|CHORE-095]] | Verification. |
| [[sources/flavor-grenade-lsp/docs/plans/phase-W8-commonloom-content-pipeline/CHORE-096|CHORE-096]] | Lint sweep. |
| [[sources/flavor-grenade-lsp/docs/plans/phase-W8-commonloom-content-pipeline/CHORE-097|CHORE-097]] | Code quality sweep. |
| [[sources/flavor-grenade-lsp/docs/plans/phase-W8-commonloom-content-pipeline/CHORE-098|CHORE-098]] | Security sweep. |
| [[sources/flavor-grenade-lsp/docs/plans/phase-W8-commonloom-content-pipeline/CHORE-099|CHORE-099]] | Final closeout. |
