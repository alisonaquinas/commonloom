---
title: Commonloom DDD Index
tags:
  - commonloom
  - ddd
  - index
status: active
updated: 2026-05-10
aliases:
  - DDD Index
  - Commonloom Domain Model
---

# Commonloom DDD Index

This folder documents Commonloom through domain-driven design language.

Commonloom is not large enough to justify heavy DDD ceremony, but the DDD lens
is useful because the project boundary is semantic: the core compiler owns
generic Markdown content language, while adapters own project routing and
renderer language.

## Notes

| Note | Purpose |
| --- | --- |
| [[domains|Domains]] | Core, supporting, and generic subdomains. |
| [[bounded-contexts|Bounded Contexts]] | Ownership boundaries and language drift. |
| [[ubiquitous-language|Ubiquitous Language]] | Project terms and forbidden overloads. |
| [[context-map|Context Map]] | Relationships between core, adapters, safety, and operations. |
| [[tactical-model|Tactical Model]] | Entities, value objects, aggregates, services, and events. |

## DDD Thesis

Commonloom's core domain is reusable Markdown content compilation and
validation.

The product value is not a website, a renderer, or a content management system.
The value is a stable language for turning authored content into normalized
records, diagnostics, and source traces that adapters can safely map into their
own runtime.

> [!NOTE] Evidence
> This model follows [[adr/0001-keep-commonloom-adapter-neutral|ADR 0001]],
> the [[adr/0002-use-page-group-manifests-as-adapter-inputs|page-group manifest ADR]],
> and [[Commonloom Architecture]].

## See Also

- [[Commonloom]]
- [[Commonloom Architecture]]
- [[Commonloom Requirements]]
- [[adr|Commonloom ADRs]]
