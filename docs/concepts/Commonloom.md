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

![[assets/commonloom-logo-light-transparent.png]]

Commonloom is the standalone TypeScript library for reusable Markdown content
compilation.

It began as a reusable core boundary in an upstream website pipeline. This
repository is now its standalone home and is preparing `commonloom@0.1.0` as
the first standalone release.

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
- consuming-application route ids
- consuming-application product data
- website navigation structures
- generated module names for one consuming website
- renderer-specific compatibility records

## Current Status

The Commonloom core source lives in local `src/`, with unit, integration,
end-to-end, security, verification, and validation coverage documented through
[[tests/index|Commonloom Test Battery]].
Historical import evidence remains preserved under [[sources/index|Source Imports]],
but maintainers should treat local `src/`, `test/`, and maintained vault notes
as the active source of truth.

Local verification is available through `npm run check`, which runs
documentation lint, package lint, boundary and traceability verification,
typecheck, build, and tests.

> [!NOTE] Evidence
> ADR 0002 names Commonloom as the reusable Markdown compilation and validation
> core, while consuming adapters own route, product, and renderer
> concerns.

## See Also

- [[Commonloom Architecture]]
- [[assets/index|Commonloom Assets]]
- [[Commonloom Requirements]]
- [[adr|Commonloom ADRs]]
- [[Commonloom Extraction Plan]]
- [[sources/index|Source Imports]]
