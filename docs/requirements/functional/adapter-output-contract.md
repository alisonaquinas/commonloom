---
title: Adapter Output Contract Functional Requirements
tags:
  - commonloom
  - requirements/functional
  - adapters
  - output
status: active
updated: 2026-05-10
aliases:
  - Output Contract Requirements
---

# Adapter Output Contract Functional Requirements

| ID | Requirement | Acceptance |
| --- | --- | --- |
| CLR-FUNC-080 | Commonloom shall expose normalized compiled document records. | Adapters can consume frontmatter, sanitized body HTML, source trace, diagnostics, links, images, and manifest data. |
| CLR-FUNC-081 | Commonloom shall accept adapter-supplied manifest entries or normalized document entries. | The core can compile content without importing one project's manifest type. |
| CLR-FUNC-082 | Commonloom shall keep generated TypeScript optional and adapter-owned. | The core API is useful even when no generated file writer is present. |
| CLR-FUNC-083 | Commonloom shall support check-only workflows. | A caller can validate content and collect diagnostics without writing generated output. |
| CLR-FUNC-084 | Commonloom shall make generated output reproducible when an adapter writes files from Commonloom records. | Normalized records include enough stable data for deterministic generation. |

## Evidence

- [[adr/0002-use-page-group-manifests-as-adapter-inputs|ADR 0002]]
- [[adr/0003-keep-generated-typescript-adapter-owned|ADR 0003]]
- [[sources/flavor-grenade-lsp/docs/plans/phase-W8-commonloom-content-pipeline/TASK-273|TASK-273]]
- [[sources/flavor-grenade-lsp/website/docs/adr/0002-use-page-group-markdown-manifests-for-website-copy|website ADR 0002]]
