---
title: Commonloom Across Frameworks
summary: A shared Commonloom example rendered by multiple TypeScript stacks.
heroImage: ../assets/commonloom-logo-light-transparent.png
tags:
  - commonloom
  - examples
  - framework-neutral
---

## Commonloom Across Frameworks

Commonloom compiles Markdown, frontmatter, links, media references, source
traces, and diagnostics before a framework sees the content.

This page is intentionally shared by every Phase 6 example. React, Vue, Svelte,
Next.js, Angular, and Node should render the same message with the same styling
and assets.

## What The Adapter Owns

- Loading the shared example files.
- Mapping Commonloom records into a framework view.
- Resolving project routes and bundled assets.

## What Commonloom Owns

- Parsing Markdown and frontmatter.
- Rendering safe static HTML.
- Extracting links, images, headings, and source traces.
- Reporting normalized diagnostics.

See [the integration note](./integration-note.md) for the shared checklist.
