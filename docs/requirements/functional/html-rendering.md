---
title: HTML Rendering Functional Requirements
tags:
  - commonloom
  - requirements/functional
  - html
status: active
updated: 2026-05-10
aliases:
  - HTML Requirements
  - Sanitization Requirements
---

# HTML Rendering Functional Requirements

| ID | Requirement | Acceptance |
| --- | --- | --- |
| CLR-FUNC-020 | Commonloom shall render Markdown to semantic static HTML when requested. | Generated HTML preserves semantic output for supported Markdown constructs. |
| CLR-FUNC-021 | Commonloom shall support an explicit inline HTML policy. | Callers can choose whether and how inline HTML is processed. |
| CLR-FUNC-022 | Commonloom shall remove or reject unsafe inline HTML. | Scripts, event handlers, JavaScript URLs, iframes, and runtime embeds produce diagnostics and do not survive sanitized output. |
| CLR-FUNC-023 | Commonloom shall allow safe static inline HTML through an allowlist. | Tags such as `figure`, `figcaption`, `picture`, `source`, `img`, `span`, `div`, `kbd`, and `abbr` can be allowed by policy. |
| CLR-FUNC-024 | Commonloom shall keep sanitized HTML suitable for static rendering. | Output does not require runtime Markdown rendering in the consuming app. |

## Evidence

- [[sources/flavor-grenade-lsp/docs/plans/phase-W8-commonloom-content-pipeline/TASK-270|TASK-270]]
- [[sources/flavor-grenade-lsp/website/docs/architecture/content-pipeline|content-pipeline architecture]]
- [[sources/flavor-grenade-lsp/website/docs/requirements/technical/source-layout-and-documentation|source layout and documentation requirements]]
