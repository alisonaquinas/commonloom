---
title: Adapter Development User Requirements
tags:
  - commonloom
  - requirements/user
  - adapters
status: active
updated: 2026-05-10
aliases:
  - Adapter Developer Requirements
---

# Adapter Development User Requirements

## Scope

These requirements describe what Commonloom must enable for developers building
site, app, or publishing adapters.

| ID | Requirement | Acceptance |
| --- | --- | --- |
| CLR-USER-010 | Adapter developers shall provide project-specific route and wiki-link resolution without modifying Commonloom core. | Link resolution is configurable through callbacks or typed policies. |
| CLR-USER-011 | Adapter developers shall validate project-specific frontmatter and manifest data with their own schemas. | Commonloom returns parsed data and diagnostics without hard-coding Flavor Grenade fields. |
| CLR-USER-012 | Adapter developers shall choose their output artifact format. | Commonloom exposes normalized records; generated TypeScript remains adapter-owned. |
| CLR-USER-013 | Adapter developers shall map content media to their bundler or runtime asset model. | Commonloom validates local media references and returns source data needed by an adapter-owned asset step. |
| CLR-USER-014 | Adapter developers shall keep framework-specific code outside the reusable core. | Integrations can import framework modules while Commonloom core does not. |

## Evidence

- [[adr/0001-keep-commonloom-adapter-neutral|ADR 0001]]
- [[adr/0002-use-page-group-manifests-as-adapter-inputs|ADR 0002]]
- [[adr/0003-keep-generated-typescript-adapter-owned|ADR 0003]]
- [[sources/flavor-grenade-lsp/website/docs/architecture/content-pipeline|content-pipeline architecture]]
