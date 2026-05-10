---
title: Commonloom Requirements
tags:
  - commonloom
  - requirements
  - content-pipeline
status: draft
updated: 2026-05-10
aliases:
  - Commonloom Technical Requirements
---

# Commonloom Requirements

These requirements are imported and synthesized from the Flavor Grenade W8
architecture, ADR, technical requirements, and authoring docs.

## Content Support

Commonloom should support CommonMark plus GitHub Flavored Markdown:

- headings H1 through H6
- paragraphs and line breaks
- emphasis, strong, strikethrough, and inline code
- fenced code blocks
- ordered, unordered, and task lists
- blockquotes
- links, autolinks, and images
- tables
- thematic breaks
- escaped characters and HTML entities

## Frontmatter

Commonloom should parse frontmatter and let adapters validate schema-specific
fields. Flavor Grenade currently requires `title` and `description`, with
optional `h1`, `summary`, `related`, `seo`, `structuredData`, and `images`.

Standalone Commonloom should not hard-code those exact website fields as global
requirements.

## HTML Policy

Inline HTML is allowed only through an explicit safety policy. The Flavor
Grenade source allows static document structures such as figures, captions,
responsive images, `kbd`, and abbreviations, while rejecting scripts, event
handlers, iframes, JavaScript URLs, and runtime embeds.

## Links And Media

Commonloom should:

- classify standard links, internal links, same-document links, wiki-links, and
  unsupported targets
- resolve wiki-links only through adapter-owned callbacks
- validate media references inside approved roots
- reject path traversal
- report missing media
- report missing alt text unless an adapter records an explicit decorative
  policy

## Output

The upstream website chose generated TypeScript as renderer input. For
standalone Commonloom, the durable requirement is narrower:

- expose normalized content records
- expose diagnostics
- preserve source traces
- let adapters choose generated TypeScript, JSON diagnostics, or another output
  format

## Validation Gates

Expected validation failures include:

- missing copy files
- duplicate manifest ids
- invalid frontmatter
- unsafe inline HTML
- unresolved wiki-links
- broken image references
- path traversal
- missing image alt text
- stale generated output when an adapter owns generation

## Evidence

- [[sources/flavor-grenade-lsp/website/docs/requirements/technical/source-layout-and-documentation|source layout and documentation requirements]]
- [[sources/flavor-grenade-lsp/website/docs/requirements/technical/index|technical requirements index]]
- [[sources/flavor-grenade-lsp/website/docs/authoring/content-pipeline|authoring content-pipeline note]]
- [[sources/flavor-grenade-lsp/docs/plans/phase-W8-commonloom-content-pipeline/TASK-269|TASK-269]]
- [[sources/flavor-grenade-lsp/docs/plans/phase-W8-commonloom-content-pipeline/TASK-270|TASK-270]]
- [[sources/flavor-grenade-lsp/docs/plans/phase-W8-commonloom-content-pipeline/TASK-271|TASK-271]]

## See Also

- [[Commonloom]]
- [[Commonloom Architecture]]
- [[adr|Commonloom ADRs]]
