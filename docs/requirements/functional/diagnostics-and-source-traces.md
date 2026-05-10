---
title: Diagnostics And Source Traces Functional Requirements
tags:
  - commonloom
  - requirements/functional
  - diagnostics
  - source-trace
status: active
updated: 2026-05-10
aliases:
  - Diagnostics Requirements
  - Source Trace Requirements
---

# Diagnostics And Source Traces Functional Requirements

| ID | Requirement | Acceptance |
| --- | --- | --- |
| CLR-FUNC-060 | Commonloom shall expose normalized diagnostics. | Diagnostics include code, severity, message, and optional source path, line, and column. |
| CLR-FUNC-061 | Commonloom shall use severities compatible with error, warning, and info workflows. | Diagnostics can be filtered by severity without string parsing. |
| CLR-FUNC-062 | Commonloom shall preserve source trace data for compiled documents. | Trace data includes Markdown path, optional manifest path, content hash, headings, links, and images. |
| CLR-FUNC-063 | Commonloom shall generate stable content hashes from source Markdown. | The same source produces the same hash across runs. |
| CLR-FUNC-064 | Commonloom shall return diagnostics instead of throwing for expected content validation failures. | Invalid content produces structured diagnostics while unexpected programming errors may still throw. |

## Evidence

- [[sources/flavor-grenade-lsp/docs/plans/phase-W8-commonloom-content-pipeline/TASK-268|TASK-268]]
- [[sources/flavor-grenade-lsp/docs/plans/phase-W8-commonloom-content-pipeline/TASK-270|TASK-270]]
- [[sources/flavor-grenade-lsp/docs/requirements/diagnostics|diagnostics requirements]]
- [[sources/flavor-grenade-lsp/website/docs/architecture/content-pipeline|content-pipeline architecture]]
