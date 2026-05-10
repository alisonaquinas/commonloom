---
title: Commonloom Ubiquitous Language
tags:
  - commonloom
  - ddd
  - ubiquitous-language
status: active
updated: 2026-05-10
aliases:
  - Ubiquitous Language
  - Commonloom Vocabulary
---

# Commonloom Ubiquitous Language

Use these terms consistently in Commonloom docs, tickets, APIs, tests, and
future source code.

## Core Terms

| Term | Meaning |
| --- | --- |
| Commonloom | Adapter-neutral TypeScript library for Markdown content compilation and validation. |
| Adapter | Consumer-owned integration layer that maps Commonloom records into project-specific routes, assets, renderer data, and generated artifacts. |
| Content source | Authored Markdown file or equivalent input accepted for compilation. |
| Document | One content source after Commonloom has associated path, body, optional frontmatter, and adapter metadata. |
| Markdown body | The author-owned Markdown content after frontmatter is separated. |
| Frontmatter block | YAML metadata at the top of a content source; Commonloom parses it, callers validate its schema. |
| Compiled document | Normalized result for one document, including body output, metadata, trace data, and diagnostics. |
| Compiled record | Stable adapter-usable data object emitted by Commonloom. Prefer this over renderer-specific names. |
| Source trace | Review data that ties compiled output back to source path, content hash, headings, links, images, and positions when available. |
| Diagnostic | Structured report with code, severity, message, and optional source location. |
| Diagnostic code | Stable symbolic identifier for a diagnostic family. |
| Severity | Diagnostic importance level, normally error, warning, or info. |
| Heading | Markdown heading with level, text, generated id, and optional source position. |
| Link reference | Extracted Markdown link target with classification and optional source position. |
| Image reference | Extracted Markdown image target, alt text, and optional source position. |
| Content hash | Stable hash of source content used for reproducibility and traceability. |
| HTML policy | Caller-selected rule for whether inline HTML is rejected, sanitized, or allowlisted. |
| Approved root | Filesystem root where local content or media references may resolve. |

## Adapter Terms

| Term | Meaning |
| --- | --- |
| Manifest | Adapter-owned declaration of document entries, route placement, grouping, ordering, output targets, or metadata. |
| Manifest entry | Adapter-provided input that Commonloom can normalize into a document entry. |
| Page group | Adapter concept for grouping routeable content. Commonloom may accept derived entries but does not own page-group semantics. |
| Route id | Adapter-owned stable identifier for project navigation. Not a Commonloom core concept. |
| Wiki-link policy | Adapter-owned callback or rule that resolves wiki-style links into project targets. |
| Output artifact | Adapter-owned generated file, module, JSON payload, or renderer data created from Commonloom records. |
| Generated TypeScript | One possible adapter output artifact. It is not required by Commonloom core. |

## Documentation And Operations Terms

| Term | Meaning |
| --- | --- |
| Source import | Raw upstream Flavor Grenade Markdown copied into `docs/sources/` for evidence. |
| Synthesized note | Maintained Commonloom wiki note that summarizes and links evidence. |
| Requirement | Testable statement of desired user outcome, behavior, technical constraint, or operation. |
| ADR | Accepted architecture decision record; successor ADRs should supersede instead of rewriting history. |
| Ticket | Tracked work item with type, status, trace links, workflow log, and closure evidence. |
| Phase gate | Ordered validation point for planned work. |

## Avoid These Overloads

| Avoid | Use Instead | Reason |
| --- | --- | --- |
| Page | Document or adapter routeable page | Page is renderer and route dependent. |
| Record, without qualifier | Compiled record or output artifact | Core and adapter records differ. |
| Manifest schema, as universal | Adapter-owned manifest schema | Commonloom does not own one global manifest model. |
| Route, in core APIs | Link reference or adapter-resolved target | Routes belong to adapters. |
| Website pipeline | Commonloom core or adapter integration | The standalone project must not inherit Flavor Grenade website scope. |

## Naming Rules

- Use `Commonloom`, not `commonloon`.
- Use `adapter-neutral` for the core boundary.
- Use `adapter-owned` for route, manifest, generated output, and renderer
  behavior.
- Use `diagnostic` for expected content validation failures.
- Reserve `throw`, `exception`, or `programmer error` for unexpected API misuse
  or implementation failures.

## See Also

- [[domains|Domains]]
- [[bounded-contexts|Bounded Contexts]]
- [[Commonloom Architecture]]

