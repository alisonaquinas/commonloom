---
title: Commonloom
tags:
  - commonloom
  - concept
  - content-pipeline
status: draft
updated: 2026-05-10
aliases:
  - Commonloom Core
  - Commonloom Library
---

# Commonloom

Commonloom is the planned standalone TypeScript library for reusable Markdown
content compilation.

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

The prototype source is still upstream in
[[sources/flavor-grenade-lsp/website/docs/architecture/content-pipeline|Flavor Grenade's content pipeline design]]
and `website/src/content/pipeline/commonloom` in the source repository.

This standalone repository currently has documentation and source imports, but
not the package source, tests, or scripts.

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
