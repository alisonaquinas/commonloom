---
title: Documentation Maintenance Operational Requirements
tags:
  - commonloom
  - requirements/operational
  - documentation
status: active
updated: 2026-05-10
aliases:
  - Documentation Requirements
---

# Documentation Maintenance Operational Requirements

| ID | Requirement | Acceptance |
| --- | --- | --- |
| CLR-OPS-020 | Commonloom documentation shall stay evidence-first. | Durable claims link to source imports, local code, or ADRs. |
| CLR-OPS-021 | The Obsidian vault shall keep raw imports separate from synthesized notes. | `docs/sources/` preserves upstream material; topic folders contain maintained synthesis. |
| CLR-OPS-022 | Requirements updates shall update the central requirements map and affected category indexes. | New requirement pages are reachable from [[requirements/Commonloom Requirements]] and category indexes. |
| CLR-OPS-023 | ADR-impacting changes shall update or add ADRs rather than rewriting accepted history. | Architectural reversals create successor ADRs and mark older ADRs superseded when needed. |
| CLR-OPS-024 | Root README command claims shall remain absent until commands are verified. | README does not document install/build/test commands before package scaffold exists. |

## Evidence

- [[sources/flavor-grenade-lsp/website/docs/requirements/technical/source-layout-and-documentation|source layout and documentation requirements]]
- [[AGENTS|vault agent guidance]]
- [[adr|ADR index]]
