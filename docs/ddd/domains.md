---
title: Commonloom Domains
tags:
  - commonloom
  - ddd
  - domains
status: active
updated: 2026-05-10
aliases:
  - Domains
  - Commonloom Subdomains
---

# Commonloom Domains

## Core Subdomain

### Markdown Content Compilation

Commonloom's core subdomain is compiling authored Markdown content into
normalized, adapter-usable records.

It includes:

- Markdown and GFM parsing
- YAML frontmatter extraction
- sanitized static HTML rendering
- heading, link, and image extraction
- source trace construction
- normalized diagnostics
- stable content hashes

This is the differentiating model because it defines the reusable library
language. If this language drifts into Flavor Grenade route or renderer terms,
Commonloom stops being standalone.

## Supporting Subdomains

### Adapter Integration

Adapters translate between Commonloom's published language and a consuming
project's routing, manifest, renderer, asset, and output model.

Adapter integration is important, but project-specific. Commonloom should
support it with typed extension points rather than own its vocabulary.

### Content Safety And Validation

Content safety defines policies for inline HTML, local paths, unsupported URI
schemes, frontmatter validation, parser limits, and filesystem confinement.

This subdomain supports compilation by turning unsafe or invalid content into
diagnostics instead of silent acceptance.

### Documentation Governance

The docs vault, requirements, ADRs, source imports, and task workflow preserve
the project intent while the package is extracted from Flavor Grenade.

This is a supporting project domain, not runtime library behavior.

## Generic Subdomains

### Package Operations

CI, release tagging, Node.js version selection, npm publishing, dependency
review, and git-flow branch naming are generic operational concerns.

They matter for trust and repeatability, but they should not appear in the
runtime content model.

### Markdown Infrastructure

The unified, remark, rehype, and zod ecosystem is generic infrastructure used
to implement the model.

Commonloom should not rename those tools into domain concepts. The domain terms
remain document, frontmatter, rendered HTML, diagnostic, and source trace.

## Boundary Rule

A concept belongs in the core domain only when it is meaningful to more than
one consuming project without importing that project's routes, renderer types,
copy, or build outputs.

## See Also

- [[bounded-contexts|Bounded Contexts]]
- [[ubiquitous-language|Ubiquitous Language]]
- [[Commonloom Requirements]]

