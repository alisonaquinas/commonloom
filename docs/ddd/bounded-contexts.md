---
title: Commonloom Bounded Contexts
tags:
  - commonloom
  - ddd
  - bounded-contexts
status: active
updated: 2026-05-10
aliases:
  - Bounded Contexts
  - Domain Boundaries
  - Commonloom Boundaries
---

# Commonloom Bounded Contexts

Bounded contexts define where a term has one stable meaning.

They are semantic boundaries first. They may become modules or packages later,
but DDD contexts are not automatically microservices.

## Contexts

| Context | Owns | Does Not Own |
| --- | --- | --- |
| Content Compilation Core | Markdown body, frontmatter block, AST-derived features, rendered HTML, links, images, source traces, diagnostics, compiled records. | Route ids, page group ordering, generated module names, renderer compatibility, product data. |
| Adapter Integration | manifest schema, route ids, wiki-link policy, asset mapping, output artifacts, generated TypeScript formatting. | generic parsing, HTML safety defaults, diagnostic shape, source trace semantics. |
| Content Safety | HTML policy, approved roots, local path confinement, unsupported URI handling, parser limits, validation failure classification. | project routing, renderer layout, CI policy. |
| Documentation Governance | requirements, ADRs, source imports, wiki notes, task workflow, phase evidence. | runtime compilation behavior unless linked through a requirement or ADR. |
| Package Operations | CI jobs, release tags, npm trusted publishing, dependency review, branch naming. | content semantics or adapter output contracts. |

## Language Drift Signals

These terms are intentionally context-sensitive:

| Term | Core Meaning | Adapter Meaning |
| --- | --- | --- |
| Document | Authored Markdown source plus optional frontmatter. | A routeable page, article, help page, or other project output. |
| Manifest | Optional source of normalized document entries. | Project-owned route, group, ordering, and output metadata. |
| Link | Extracted Markdown target with classification and source position. | Resolved project navigation target or rendered href. |
| Media | Local or external reference extracted from content. | Bundler asset, static public file, CDN resource, or runtime import. |
| Record | Normalized compiled document data. | Generated TypeScript, JSON, module export, or renderer payload. |

## Core Boundary Invariants

- Core modules must not import Svelte components, Flavor Grenade route modules,
  product data, or renderer modules.
- Adapter data must enter the core through configuration, callbacks, generics,
  or normalized document entries.
- Expected invalid content must produce diagnostics, not project-specific
  exceptions.
- Generated outputs are adapter-owned artifacts, not the source of truth.

## Translation Boundaries

### Adapter To Core

Adapters translate project manifests into normalized document entries and
caller-owned validation policies.

### Core To Adapter

Commonloom publishes compiled records, diagnostics, links, images, headings,
source traces, and sanitized output.

### Docs To Runtime

Requirements and ADRs influence runtime behavior only when implemented by code
or accepted as durable design constraints.

## See Also

- [[context-map|Context Map]]
- [[tactical-model|Tactical Model]]
- [[adr/0001-keep-commonloom-adapter-neutral|ADR 0001]]
- [[adr/0003-keep-generated-typescript-adapter-owned|ADR 0003]]

