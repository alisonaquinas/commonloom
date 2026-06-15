---
title: Commonloom Requirements
tags:
  - commonloom
  - requirements
status: active
updated: 2026-05-29
aliases:
  - Commonloom Requirements Surface
---

# Commonloom Requirements

This is the central requirements map for the standalone Commonloom project.

Detailed requirements live in four folders:

| Area | Purpose |
| --- | --- |
| [[requirements/user/index|User requirements]] | Who Commonloom serves and what outcomes they need. |
| [[requirements/functional/index|Functional requirements]] | What the library must do. |
| [[requirements/technical/index|Technical requirements]] | How the implementation must be shaped. |
| [[requirements/operational/index|Operational requirements]] | How the project is validated, released, and maintained. |

## Source Basis

These requirements synthesize the Commonloom-relevant parts of the Flavor
Grenade W8 content pipeline:

- [[sources/flavor-grenade-lsp/website/docs/architecture/content-pipeline|content-pipeline architecture]]
- [[sources/flavor-grenade-lsp/website/docs/adr/0002-use-page-group-markdown-manifests-for-website-copy|website ADR 0002]]
- [[sources/flavor-grenade-lsp/website/docs/requirements/technical/source-layout-and-documentation|source layout and documentation requirements]]
- [[sources/flavor-grenade-lsp/website/docs/requirements/technical/index|website technical requirements]]
- [[sources/flavor-grenade-lsp/website/docs/authoring/content-pipeline|content-pipeline authoring]]
- [[sources/flavor-grenade-lsp/website/docs/research/w8-content-pipeline-technology-research|W8 technology research]]
- [[sources/flavor-grenade-lsp/docs/plans/phase-W8-commonloom-content-pipeline|Phase W8 plan]]
- [[sources/flavor-grenade-lsp/src/markdown-flavor/index|Markdown flavor source evidence]]

## Requirement Model

Requirement IDs use this shape:

- `CLR-USER-*` for user outcomes
- `CLR-FUNC-*` for functional behavior
- `CLR-TECH-*` for implementation constraints
- `CLR-OPS-*` for project operation and validation

Each detailed page keeps requirements short, testable, and linked back to
source evidence.

## Current Boundary

Commonloom shall be a reusable TypeScript library for Markdown content
compilation.
It shall expose generic parsing, validation, diagnostics, and normalized content
records.
It shall not import Flavor Grenade route modules, Svelte components, product
copy, Markdown flavor runtime modules, or renderer-specific generated module
contracts.

## See Also

- [[Commonloom]]
- [[Commonloom Architecture]]
- [[Markdown Flavor Modes]]
- [[adr|Commonloom ADRs]]
- [[Commonloom Extraction Plan]]
