---
title: Commonloom Tactical Model
tags:
  - commonloom
  - ddd
  - tactical-model
status: active
updated: 2026-05-10
aliases:
  - Tactical Model
  - Commonloom Tactical Design
---

# Commonloom Tactical Model

This note sketches useful tactical DDD concepts for future source design.

It is a model aid, not a mandate to create one class per term.

## Entities

| Entity | Identity | Lifecycle |
| --- | --- | --- |
| Document | source path plus adapter-provided stable entry identity when present | loaded, parsed, validated, compiled |
| Compile job | caller request id or invocation boundary | configured, executed, summarized |
| Ticket | stable ticket id | opened, blocked, in progress, verified, closed |
| ADR | ADR number | proposed, accepted, superseded |
| Requirement | requirement id | drafted, active, superseded |

## Value Objects

| Value Object | Attributes |
| --- | --- |
| Source path | normalized path, original path, approved root relation |
| Frontmatter block | raw YAML text, parsed data, parse diagnostics |
| Markdown body | raw body text, source offsets |
| Heading reference | level, text, generated id, position |
| Link reference | raw target, classification, label, position |
| Image reference | raw target, alt text, classification, position |
| Diagnostic | code, severity, message, source path, line, column |
| Source trace | source path, manifest path, content hash, headings, links, images |
| Content hash | algorithm, digest |
| HTML policy | mode, allowlist, rejection behavior |
| Approved root | canonical path, purpose |

## Aggregates

### Compiled Document

The compiled document aggregate owns the consistency of one content source's
compiled result.

Invariants:

- frontmatter parse failures become diagnostics
- Markdown parse output and rendered output refer to the same source content
- extracted headings, links, and images are reflected in the source trace
- content hash is stable for the same source content
- expected content validation failures do not crash compilation

### Compile Result

The compile result aggregate summarizes a compile job across one or more
documents.

Invariants:

- all document diagnostics are included or intentionally filtered by caller
  policy
- summary severity reflects contained diagnostics
- check-only compilation does not require generated output
- partial failure remains inspectable through structured results

### Ticket

The ticket aggregate belongs to documentation governance and operations.

Invariants:

- id is stable and type-prefixed
- frontmatter status matches latest workflow state
- workflow log is append-only
- closure includes verification or cancellation evidence

## Domain Services

| Service | Responsibility |
| --- | --- |
| Markdown compiler | parse Markdown, apply GFM support, and coordinate AST transforms. |
| Frontmatter parser | separate and parse YAML metadata without owning caller schemas. |
| HTML sanitizer | apply the selected inline HTML policy. |
| Link classifier | classify external, internal, same-document, wiki-link, and unsupported targets. |
| Media validator | validate local media references against approved roots. |
| Schema validator adapter | invoke caller-owned schema validation and convert failures into diagnostics. |
| Source trace builder | collect paths, content hashes, headings, links, images, and positions. |

## Domain Events

Domain events are useful for logs, adapter hooks, or future plugin APIs. They
should describe business facts, not generic CRUD changes.

| Event | Meaning |
| --- | --- |
| DocumentCompiled | One document produced a compiled record. |
| ContentValidationFailed | Expected validation found one or more error diagnostics. |
| UnsafeHtmlRejected | Inline HTML policy rejected unsafe markup. |
| LinkResolutionDeferred | A wiki-link or project-specific target requires adapter resolution. |
| MediaReferenceRejected | A media target was missing, unsupported, or escaped approved roots. |
| CompileJobCompleted | A compile job finished with summary counts and highest severity. |
| RequirementAccepted | A requirement entered the active requirements surface. |
| DecisionAccepted | An ADR became accepted. |

## Repository Boundaries

Repositories should be introduced only when they protect domain meaning.

Likely useful repository-like abstractions:

- document source loader
- media existence checker
- source import catalog reader
- ticket or requirement index reader

Avoid one repository per file type if it only mirrors the filesystem.

## See Also

- [[ubiquitous-language|Ubiquitous Language]]
- [[context-map|Context Map]]
- [[Commonloom Requirements]]
