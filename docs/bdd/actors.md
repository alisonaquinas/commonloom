---
title: Commonloom BDD Actors
tags:
  - commonloom
  - bdd
  - actors
status: active
updated: 2026-05-10
aliases:
  - BDD Actors
  - Commonloom Actors
---

# Commonloom BDD Actors

## Primary Actors

| Actor | Goal | Main Behaviors |
| --- | --- | --- |
| Content author | Write maintainable Markdown content without editing renderer records by hand. | Author Markdown, include frontmatter, use links and images, receive actionable diagnostics. |
| Adapter developer | Integrate Commonloom into a site or app without changing core behavior. | Provide document entries, route and wiki-link callbacks, schemas, media roots, and output mapping. |
| Maintainer | Keep the standalone library adapter-neutral and source-backed. | Review boundaries, update requirements and ADRs, keep docs honest about implementation status. |
| Reviewer | Verify changes against requirements, decisions, and source evidence. | Trace tickets to requirements, inspect diagnostics and source traces, confirm behavior evidence. |
| Release operator | Publish a trustworthy package. | Run CI gates, use Node.js 24, publish to npm through OIDC trusted publishing. |
| LLM agent | Maintain linked documentation and implementation work with traceability. | Update notes, preserve source imports, keep ticket logs, avoid invented behavior. |

## Supporting Systems

| System | Role |
| --- | --- |
| Commonloom core | Compiles content sources into compiled records, diagnostics, and source traces. |
| Adapter | Translates project-owned routes, manifests, assets, and renderer output. |
| CI system | Runs validation, test, build, release, and publishing jobs. |
| npm registry | Receives published packages through trusted publishing. |
| Obsidian vault | Maintains source imports, synthesized notes, requirements, ADRs, BDD scenarios, and logs. |

## Actor Boundaries

- Content authors do not need to know generated TypeScript structure.
- Adapter developers do not need to fork Commonloom for project routing policy.
- Maintainers do not treat source imports as implemented local behavior.
- Release operators do not publish from a workstation or long-lived npm token.

## See Also

- [[scenario-catalog|Scenario Catalog]]
- [[ddd/ubiquitous-language|Commonloom Vocabulary]]
- [[requirements/user/index|User Requirements]]
