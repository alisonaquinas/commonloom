---
title: Schema And Type Contracts Technical Requirements
tags:
  - commonloom
  - requirements/technical
  - types
status: active
updated: 2026-05-10
aliases:
  - Type Contract Requirements
---

# Schema And Type Contracts Technical Requirements

| ID | Requirement | Acceptance |
| --- | --- | --- |
| CLR-TECH-040 | Commonloom shall publish typed diagnostic codes and severities. | Consumers can narrow diagnostics without inspecting freeform messages. |
| CLR-TECH-041 | Commonloom shall publish typed link, image, heading, source trace, manifest entry, and result contracts. | Public types are exported and covered by compile-time usage tests. |
| CLR-TECH-042 | Commonloom shall keep adapter data generic. | Manifest and compiled document types can carry adapter-specific data through generics or equivalent typed extension points. |
| CLR-TECH-043 | Commonloom shall keep schema validation failures distinct from programmer errors. | Expected invalid content returns diagnostics; unexpected API misuse can throw or reject. |
| CLR-TECH-044 | Commonloom shall preserve source positions as optional fields. | Consumers can handle parsers or transforms that cannot supply exact line and column values. |

## Evidence

- [[sources/flavor-grenade-lsp/docs/plans/phase-W8-commonloom-content-pipeline/TASK-268|TASK-268]]
- [[sources/flavor-grenade-lsp/website/docs/architecture/content-pipeline|content-pipeline architecture]]
- [[Commonloom Architecture]]
