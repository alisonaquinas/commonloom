---
title: Links And Media Functional Requirements
tags:
  - commonloom
  - requirements/functional
  - links
  - media
status: active
updated: 2026-05-10
aliases:
  - Link Requirements
  - Media Requirements
---

# Links And Media Functional Requirements

| ID | Requirement | Acceptance |
| --- | --- | --- |
| CLR-FUNC-040 | Commonloom shall extract Markdown links and image references. | Compiled records include link and image reference lists with raw targets and source positions when available. |
| CLR-FUNC-041 | Commonloom shall classify link targets before resolution. | External, internal, same-document, wiki-link, and unsupported targets are distinguishable. |
| CLR-FUNC-042 | Commonloom shall resolve wiki-links only through adapter-owned callbacks. | The core does not hard-code one project's route registry or page naming policy. |
| CLR-FUNC-043 | Commonloom shall validate local media references against approved roots. | Missing media produces a diagnostic; valid media resolves to a confined local path or adapter-usable reference. |
| CLR-FUNC-044 | Commonloom shall reject path traversal and unsupported URI schemes. | References escaping approved roots produce diagnostics and do not reach filesystem reads. |
| CLR-FUNC-045 | Commonloom shall report missing image alt text unless the adapter supplies an explicit decorative policy. | Non-decorative images without useful alt text produce diagnostics. |

## Evidence

- [[sources/flavor-grenade-lsp/docs/plans/phase-W8-commonloom-content-pipeline/TASK-271|TASK-271]]
- [[sources/flavor-grenade-lsp/docs/requirements/functional/ofmarkdown-parity|OFMarkdown parity requirements]]
- [[sources/flavor-grenade-lsp/docs/requirements/security/vault-confinement|vault confinement requirements]]
- [[sources/flavor-grenade-lsp/website/docs/requirements/functional/navigation-and-routing|navigation and routing requirements]]
