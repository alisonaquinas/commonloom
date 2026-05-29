---
title: Flavor Grenade Markdown Flavor Source Evidence
tags:
  - commonloom
  - sources
  - flavor-grenade
  - markdown-flavors
status: imported
updated: 2026-05-29
aliases:
  - Markdown Flavor Source Evidence
---

# Flavor Grenade Markdown Flavor Source Evidence

This note records the Flavor Grenade source files inspected for Commonloom
Markdown flavor-mode planning. The source repository remains reference-only;
Commonloom must not import Flavor Grenade runtime code.

## Inspected Files

| Source Path | Evidence |
| --- | --- |
| `src/markdown-flavor/markdown-flavor-contract.ts` | Defines the explicit flavor ids, selector values, labels, and id guard. |
| `src/markdown-flavor/markdown-flavor-profiles.ts` | Defines one source-backed profile per explicit flavor with active syntax, inert syntax, host-specific syntax, opaque regions, and safety metadata. |
| `src/markdown-flavor/structured-profiles.ts` | Defines Keep a Changelog, Common Changelog, and MADR as structured profile flags, not base flavor ids. |
| `src/markdown-flavor/markdown-flavor-state.ts` | Resolves Flavor Grenade selector state to one effective flavor per Markdown resource. |
| `src/markdown-flavor/syntax-inference.ts` | Infers a flavor only from strong syntax evidence when Flavor Grenade is in Auto Detect mode. |
| `src/markdown-flavor/README.md` | States that the flavor model is static profile metadata consumed by parsers and handlers. |

## Explicit Flavor IDs

Flavor Grenade's explicit Markdown flavor ids are:

| ID | Label |
| --- | --- |
| `original` | Original Markdown |
| `commonmark` | CommonMark |
| `obsidian` | Obsidian |
| `gfm` | GitHub Flavored Markdown |
| `glfm` | GitLab Flavored Markdown |
| `pandoc` | Pandoc Markdown |
| `multimarkdown` | MultiMarkdown |
| `mdx` | MDX |
| `kramdown` | kramdown |
| `markdown-extra` | Markdown Extra |
| `r-markdown` | R Markdown |
| `reddit` | Reddit Markdown |
| `stack-overflow` | Stack Overflow Markdown |

## Planning Notes For Commonloom

- `auto` is selector state in Flavor Grenade, not a concrete flavor profile.
- The inspected model resolves an active Markdown document to one effective
  flavor before parser and handler behavior run.
- Host-specific syntax is descriptive metadata until a parser or handler
  explicitly consumes it.
- The safety profile records no network access and no execution for flavor
  analysis.
- Structured profiles are separate flags. They should not expand the base
  Commonloom flavor list unless a later decision explicitly changes that.

## See Also

- [[architecture/Markdown Flavor Modes]]
- [[requirements/functional/markdown-and-frontmatter]]
- [[requirements/technical/schema-and-type-contracts]]
