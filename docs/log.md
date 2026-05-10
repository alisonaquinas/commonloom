---
title: Commonloom Vault Log
tags:
  - commonloom
  - log
  - llm-wiki
status: active
updated: 2026-05-10
aliases:
  - Vault Log
---

# Commonloom Vault Log

## [2026-05-10] import | Flavor Grenade Commonloom sources

Imported Commonloom-relevant source documents from
`C:\Users\aaqui\obsidian-stack\flavor-grenade-lsp` into
[[sources/index|Source Imports]].

Covered sources include W8 phase planning, W8 tickets, the content-pipeline
architecture note, ADR 0002, technical requirements, authoring guidance, and
technology research.

## [2026-05-10] scaffold | Obsidian LLM wiki

Created the `docs/` vault schema, Obsidian config, index, log, source catalog,
and synthesized notes for [[Commonloom]], [[Commonloom Architecture]],
[[Commonloom Requirements]], [[adr|Commonloom ADRs]], and
[[Commonloom Extraction Plan]].

## [2026-05-10] import | Commonloom ADRs

Imported the contextual website stack ADR 0001 and split the Commonloom-relevant
parts of website ADR 0002 into MADR-style records under [[adr]].
Removed the older synthesized `docs/decisions/` note because the ADR directory
is now the durable decision log.

## [2026-05-10] requirements | Split Commonloom requirements surface

Expanded [[Commonloom Requirements]] into user, functional, technical, and
operational requirement folders.
Imported additional Flavor Grenade source requirements for public content,
metadata, LLM wiki standards, CI/CD, code quality, parser safety, input
validation, path confinement, and supply-chain controls.

## [2026-05-10] requirements | Add Node 24 and npm trusted publishing

Added operational requirements that all Commonloom CI/CD jobs use Node.js 24
and that npm package publication uses OIDC trusted publishing.
Verified npm trusted publishing workflow requirements from current npm
documentation via Context7.

## [2026-05-10] requirements | Add git-flow branch naming

Added an operational requirement for git-flow branch naming standards:
`main`, `develop`, `feature/*`, `release/*`, and `hotfix/*`.
Imported the upstream Flavor Grenade git-flow ADR as source evidence.

## [2026-05-10] requirements | Import phase execution procedure

Imported Flavor Grenade's phase execution procedure and adapted its durable
process rules into [[phase-execution]].
Recorded requirements for sequential phases, explicit ownership, ticket
lifecycle states, test-first work, sweep ticketing, CI gate evidence, and
retrospectives.

## [2026-05-10] requirements | Import ticket templates

Imported the Flavor Grenade ticket template directory and adapted its template
and lifecycle rules into [[task-management]].
Recorded requirements for typed tickets, stable IDs, trace links, red-green
task lifecycle, append-only workflow logs, blockers, and closure evidence.

## [2026-05-10] ddd | Document Commonloom domain model

Added [[ddd/index|Commonloom DDD]] notes for domains, bounded contexts,
ubiquitous language, context map, and tactical model.
Grounded the model in the adapter-neutral ADRs, architecture boundary, and
requirements surface.
