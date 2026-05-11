---
title: Commonloom
tags:
  - commonloom
  - concept
  - content-pipeline
status: active
updated: 2026-05-11
aliases:
  - Commonloom Core
  - Commonloom Library
---

# Commonloom

Commonloom is the standalone TypeScript library for reusable Markdown content
compilation.

It began as the reusable core boundary inside the Flavor Grenade website W8
content pipeline. This repository is intended to become its standalone home.

## Responsibility

Commonloom should own generic content processing:

- Markdown and frontmatter parsing
- CommonMark and GitHub Flavored Markdown support
- safe inline HTML rendering
- heading, link, image, and source trace extraction
- local media and path validation
- normalized diagnostics
- adapter hooks for project-specific route or wiki-link resolution

## Non-Responsibility

Commonloom should not own:

- Svelte components
- Flavor Grenade route ids
- Flavor Grenade product data
- website navigation structures
- generated module names for one consuming website
- renderer-specific compatibility records

## Current Status

The Commonloom core source now lives in local `src/`, with core behavior tests
in local `test/`.
The upstream Flavor Grenade W8 source remains evidence for the import in
[[sources/flavor-grenade-lsp/website/docs/architecture/content-pipeline|Flavor Grenade's content pipeline design]]
and `website/src/content/pipeline/commonloom` in the source repository.

Local verification is available through `npm run check`, which runs
documentation lint, package lint, boundary and traceability verification,
typecheck, build, and tests.

> [!NOTE] Evidence
> ADR 0002 names Commonloom as the reusable Markdown compilation and validation
> core, while the website adapter owns Flavor Grenade route and renderer
> concerns.

## See Also

- [[Commonloom Architecture]]
- [[Commonloom Requirements]]
- [[adr|Commonloom ADRs]]
- [[Commonloom Extraction Plan]]
- [[sources/index|Source Imports]]
