---
status: accepted
date: 2026-05-10
decision-makers: Alison Aquinas
consulted: Codex
informed: Future Commonloom contributors
---

# Keep Generated TypeScript Adapter-Owned

## Context and Problem Statement

Flavor Grenade W8 chose generated TypeScript records as the canonical renderer
input.
That choice works for a Vite and Svelte website because generated modules can
use TypeScript contracts and Vite asset imports.

The decision question is: should standalone Commonloom require generated
TypeScript output, or should generated artifacts belong to adapters?

## Decision Drivers

- Generated TypeScript is valuable for the first website adapter.
- Generated JSON is more portable but weaker for renderer type contracts.
- Other consumers may want JSON, direct records, build artifacts, or framework
  integrations.
- Commonloom's durable responsibility is normalized content plus diagnostics,
  not one renderer's artifact format.

## Considered Options

- Keep generated TypeScript adapter-owned.
- Make generated TypeScript the required Commonloom output.
- Generate JSON as the required Commonloom output.
- Generate both TypeScript and JSON from Commonloom core.

## Decision Outcome

Chosen option: "Keep generated TypeScript adapter-owned".

Commonloom should expose normalized compiled records, diagnostics, source
traces, links, images, and metadata.
Adapters may transform those records into generated TypeScript, JSON reports,
framework content collections, or in-memory build outputs.

### Consequences

- Good, because Commonloom remains usable outside Vite and Svelte.
- Good, because the Flavor Grenade adapter can still generate TypeScript.
- Good, because generated artifacts can vary by consumer without changing core
  parsing logic.
- Bad, because Commonloom cannot promise a single batteries-included renderer
  output.
- Bad, because adapter authors must write or reuse generation code.

## Confirmation

This decision is confirmed when:

- Commonloom public APIs return normalized records without requiring generated
  files.
- Any generated TypeScript writer lives in an adapter package, example, or
  optional helper outside the core boundary.
- Documentation describes generated TypeScript as the upstream website adapter
  decision, not the universal Commonloom contract.

## Pros and Cons of the Options

### Keep Generated TypeScript Adapter-Owned

- Good, because it preserves reusable core boundaries.
- Good, because it allows multiple output formats.
- Bad, because adapters carry output responsibility.

### Make Generated TypeScript Required

- Good, because it matches the first upstream adapter.
- Bad, because it ties Commonloom to TypeScript build graphs and app bundlers.
- Bad, because non-TypeScript consumers get a poor fit.

### Generate JSON As Required Output

- Good, because JSON is portable.
- Bad, because it loses TypeScript `satisfies` checks and literal route
  guarantees.
- Bad, because Vite asset imports need a TypeScript wrapper anyway.

### Generate Both TypeScript And JSON

- Good, because it serves app and tooling consumers.
- Bad, because two generated artifacts can drift.
- Bad, because it expands the core before the standalone API is stable.

## More Information

- [[sources/flavor-grenade-lsp/website/docs/adr/0002-use-page-group-markdown-manifests-for-website-copy|Flavor Grenade ADR 0002]]
- [[sources/flavor-grenade-lsp/docs/plans/phase-W8-commonloom-content-pipeline/TASK-273|TASK-273]]
- [[Commonloom Architecture]]
