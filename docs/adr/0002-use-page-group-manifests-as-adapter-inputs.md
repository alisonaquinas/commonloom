---
status: accepted
date: 2026-05-10
decision-makers: Alison Aquinas
consulted: Codex
informed: Future Commonloom contributors
---

# Use Page-Group Manifests As Adapter Inputs

## Context and Problem Statement

The upstream W8 pipeline moved public page copy from large TypeScript content
modules into Markdown documents.
The website still needed explicit route placement, group ordering, generated
output targets, metadata overrides, and validation across page groups.

The decision question is: how should Commonloom model document collections
without hard-coding one website's route system?

## Decision Drivers

- Markdown files alone do not carry enough explicit route and ordering
  information.
- One central manifest recreates the oversized registry problem W8 was meant to
  remove.
- TypeScript manifests helped the upstream adapter validate route ids and page
  groups.
- Standalone Commonloom should support manifest-shaped inputs without owning
  Flavor Grenade's manifest schema.

## Considered Options

- Support page-group manifests as adapter-owned inputs.
- Require one central manifest.
- Infer routes and output records from Markdown file paths only.
- Make Commonloom own a universal manifest schema.

## Decision Outcome

Chosen option: "Support page-group manifests as adapter-owned inputs".

Commonloom should accept explicit document entries or manifest-derived entries
from an adapter.
The adapter owns the exact manifest schema, route ids, page groups, ordering,
and output target fields.

### Consequences

- Good, because consuming projects can keep routing decisions explicit.
- Good, because page-group manifests scale better than one central registry.
- Good, because Commonloom can process normalized entries without importing
  adapter route types.
- Bad, because cross-group validation requires adapter orchestration.
- Bad, because Commonloom examples must be careful not to imply Flavor
  Grenade's manifest schema is universal.

## Confirmation

This decision is confirmed when:

- Commonloom can compile normalized document entries supplied by an adapter.
- Adapter-owned schemas validate project-specific manifest fields.
- Commonloom documentation treats page-group manifests as one adapter pattern,
  not a mandatory global file format.

## Pros and Cons of the Options

### Support Page-Group Manifests As Adapter-Owned Inputs

- Good, because it preserves upstream W8's proven pattern.
- Good, because it keeps Commonloom reusable.
- Bad, because adapters must merge and validate their own manifests.

### Require One Central Manifest

- Good, because global validation is simpler.
- Bad, because unrelated page groups collide in one file.
- Bad, because it repeats the large-registry maintenance problem.

### Infer Routes From Markdown Paths Only

- Good, because authors edit fewer files.
- Bad, because route placement and generated output targets become implicit.
- Bad, because route changes require file moves or special frontmatter
  conventions.

### Make Commonloom Own A Universal Manifest Schema

- Good, because the package can document one complete workflow.
- Bad, because route systems differ across consuming sites.
- Bad, because it would pull adapter policy into the reusable core.

## More Information

- [[sources/flavor-grenade-lsp/website/docs/adr/0002-use-page-group-markdown-manifests-for-website-copy|Flavor Grenade ADR 0002]]
- [[sources/flavor-grenade-lsp/docs/plans/phase-W8-commonloom-content-pipeline/TASK-272|TASK-272]]
- [[Commonloom Requirements]]
