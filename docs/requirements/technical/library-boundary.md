---
title: Library Boundary Technical Requirements
tags:
  - commonloom
  - requirements/technical
  - boundary
status: active
updated: 2026-05-10
aliases:
  - Boundary Requirements
---

# Library Boundary Technical Requirements

| ID | Requirement | Acceptance |
| --- | --- | --- |
| CLR-TECH-001 | Commonloom core shall not import Svelte components, Flavor Grenade route modules, product data, or website renderer modules. | Static import checks or review confirm no forbidden imports in core source. |
| CLR-TECH-002 | Commonloom shall expose a stable public entrypoint once source exists. | Public exports are declared from a root module and covered by API tests. |
| CLR-TECH-003 | Website-specific adapters shall live outside the reusable core boundary. | Adapter modules may import project routes and renderer types; core modules may not. |
| CLR-TECH-004 | Commonloom examples shall distinguish adapter examples from core requirements. | Docs do not present Flavor Grenade route ids or frontmatter fields as universal. |
| CLR-TECH-005 | Generated output directories shall be treated as build output when adapters write files. | Generated records are reproducible from source content and not treated as source of truth. |

## Evidence

- [[adr/0001-keep-commonloom-adapter-neutral|ADR 0001]]
- [[sources/flavor-grenade-lsp/website/docs/architecture/content-pipeline|content-pipeline architecture]]
- [[sources/flavor-grenade-lsp/website/docs/requirements/technical/source-layout-and-documentation|source layout and documentation requirements]]
