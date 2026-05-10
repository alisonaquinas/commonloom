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
| [[sources/flavor-grenade-lsp/website/docs/requirements/technical/ci-cd|website/docs/requirements/technical/ci-cd]] | CI, release, Pages, and artifact gate requirements. |
| [[sources/flavor-grenade-lsp/website/docs/authoring/content-pipeline|website/docs/authoring/content-pipeline]] | Author-facing workflow and extraction boundary note. |
| [[sources/flavor-grenade-lsp/website/docs/research/w8-content-pipeline-technology-research|website/docs/research/w8-content-pipeline-technology-research]] | Tooling research for unified, remark, rehype, and rejected alternatives. |

## Website Requirement Sources

| Source | Why It Matters |
| --- | --- |
| [[sources/flavor-grenade-lsp/website/docs/requirements/user/index|website/docs/requirements/user/index]] | User audience and content journey context. |
| [[sources/flavor-grenade-lsp/website/docs/requirements/user/concepts|website/docs/requirements/user/concepts]] | LLM wiki concept-page user intent. |
| [[sources/flavor-grenade-lsp/website/docs/requirements/user/how-to|website/docs/requirements/user/how-to]] | Task-page authoring and example expectations. |
| [[sources/flavor-grenade-lsp/website/docs/requirements/user/seo-discovery|website/docs/requirements/user/seo-discovery]] | Search and discovery expectations for generated content. |
| [[sources/flavor-grenade-lsp/website/docs/requirements/functional/index|website/docs/requirements/functional/index]] | Functional website requirements overview. |
| [[sources/flavor-grenade-lsp/website/docs/requirements/functional/public-pages|website/docs/requirements/functional/public-pages]] | Markdown copy, manifests, generated records, and page coverage. |
| [[sources/flavor-grenade-lsp/website/docs/requirements/functional/navigation-and-routing|website/docs/requirements/functional/navigation-and-routing]] | Route, navigation, and link behavior context. |
| [[sources/flavor-grenade-lsp/website/docs/requirements/functional/seo-and-metadata|website/docs/requirements/functional/seo-and-metadata]] | Metadata, structured data, sitemap, and robots requirements. |
| [[sources/flavor-grenade-lsp/website/docs/requirements/functional/llm-wiki-standards|website/docs/requirements/functional/llm-wiki-standards]] | Small linked concept page requirements. |

## Core And Security Requirement Sources

| Source | Why It Matters |
| --- | --- |
| [[sources/flavor-grenade-lsp/docs/requirements/ci-cd|docs/requirements/ci-cd]] | Repository CI/CD and release gate source. |
| [[sources/flavor-grenade-lsp/docs/requirements/code-quality|docs/requirements/code-quality]] | Strict type, lint, and quality expectations. |
| [[sources/flavor-grenade-lsp/docs/requirements/development-process|docs/requirements/development-process]] | Development process and review behavior. |
| [[sources/flavor-grenade-lsp/docs/requirements/diagnostics|docs/requirements/diagnostics]] | Diagnostic behavior and severity model. |
| [[sources/flavor-grenade-lsp/docs/requirements/embed-resolution|docs/requirements/embed-resolution]] | Media and embed reference behavior. |
| [[sources/flavor-grenade-lsp/docs/requirements/wiki-link-resolution|docs/requirements/wiki-link-resolution]] | Wiki-link resolution behavior. |
| [[sources/flavor-grenade-lsp/docs/requirements/functional/ofmarkdown-parity|docs/requirements/functional/ofmarkdown-parity]] | Standard Markdown link and attachment parity requirements. |
| [[sources/flavor-grenade-lsp/docs/requirements/security/index|docs/requirements/security/index]] | Security requirement index. |
| [[sources/flavor-grenade-lsp/docs/requirements/security/input-validation|docs/requirements/security/input-validation]] | Input validation and prototype-pollution requirements. |
| [[sources/flavor-grenade-lsp/docs/requirements/security/parser-safety|docs/requirements/security/parser-safety]] | Parser resource and YAML safety requirements. |
| [[sources/flavor-grenade-lsp/docs/requirements/security/supply-chain|docs/requirements/security/supply-chain]] | Dependency and publishing security requirements. |
| [[sources/flavor-grenade-lsp/docs/requirements/security/vault-confinement|docs/requirements/security/vault-confinement]] | Path traversal and root confinement requirements. |
| [[sources/flavor-grenade-lsp/docs/adr/ADR007-git-flow-branching|docs/adr/ADR007]] | Git-flow branch naming and release branch policy. |
| [[sources/flavor-grenade-lsp/docs/adr/ADR012-parser-safety-policy|docs/adr/ADR012]] | Parser safety decision source. |
| [[sources/flavor-grenade-lsp/docs/adr/ADR013-vault-root-confinement|docs/adr/ADR013]] | Path confinement decision source. |
| [[sources/flavor-grenade-lsp/docs/adr/ADR014-dependency-security-policy|docs/adr/ADR014]] | Dependency security decision source. |
| [[sources/flavor-grenade-lsp/docs/adr/ADR017-standard-markdown-link-intelligence|docs/adr/ADR017]] | Standard Markdown link decision source. |

## Plans And Execution

| Source | Why It Matters |
| --- | --- |
| [[sources/flavor-grenade-lsp/docs/plans/phase-W8-commonloom-content-pipeline|docs/plans/phase-W8-commonloom-content-pipeline]] | Phase W8 objective, scope, workstreams, and acceptance criteria. |
| [[sources/flavor-grenade-lsp/docs/plans/phase-W8-commonloom-content-pipeline/index|docs/plans/phase-W8-commonloom-content-pipeline/index]] | Ticket index for the W8 plan. |
| [[sources/flavor-grenade-lsp/docs/plans/phase-execution|docs/plans/phase-execution]] | Phase execution lifecycle and operational gate procedure. |
| [[sources/flavor-grenade-lsp/docs/templates/tickets/index|docs/templates/tickets/index]] | Ticket template catalog and ID conventions. |
| [[sources/flavor-grenade-lsp/docs/roadmap|docs/roadmap]] | Roadmap entry showing W8 intent in project context. |
| [[sources/flavor-grenade-lsp/docs/plans/execution-ledger|docs/plans/execution-ledger]] | Execution status and review context. |

## Ticket Template Sources

| Source | Why It Matters |
| --- | --- |
| [[sources/flavor-grenade-lsp/docs/templates/tickets/feature|feature template]] | Feature ticket structure. |
| [[sources/flavor-grenade-lsp/docs/templates/tickets/task|task template]] | Task ticket structure and definition of done. |
| [[sources/flavor-grenade-lsp/docs/templates/tickets/bug|bug template]] | Bug ticket structure. |
| [[sources/flavor-grenade-lsp/docs/templates/tickets/spike|spike template]] | Spike ticket structure. |
| [[sources/flavor-grenade-lsp/docs/templates/tickets/chore|chore template]] | Chore ticket structure. |
| [[sources/flavor-grenade-lsp/docs/templates/tickets/lifecycle/feature-lifecycle|feature lifecycle]] | Feature state machine. |
| [[sources/flavor-grenade-lsp/docs/templates/tickets/lifecycle/task-lifecycle|task lifecycle]] | Task state machine and red-green-refactor rules. |
| [[sources/flavor-grenade-lsp/docs/templates/tickets/lifecycle/bug-lifecycle|bug lifecycle]] | Bug state machine. |
| [[sources/flavor-grenade-lsp/docs/templates/tickets/lifecycle/spike-lifecycle|spike lifecycle]] | Spike state machine. |
| [[sources/flavor-grenade-lsp/docs/templates/tickets/lifecycle/chore-lifecycle|chore lifecycle]] | Chore state machine. |

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
