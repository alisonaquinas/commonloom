# Commonloom

Commonloom is the standalone home for the reusable content pipeline first
proven inside
[`flavor-grenade-lsp`](https://github.com/alisonaquinas/flavor-grenade-lsp/tree/feature/w8-commonloom-content-pipeline).

The imported implementation now lives in this repository:

- `src/` for Commonloom core modules
- `test/` for Commonloom core behavior tests
- `docs/` for requirements, ADRs, DDD, BDD, and roadmap notes

## Purpose

Commonloom is intended to be a reusable TypeScript library for compiling
Markdown content into validated, traceable, renderer-ready records.

It owns generic content-pipeline behavior:

- parse Markdown and frontmatter
- render safe static HTML
- extract headings, links, images, and source trace data
- validate local media references and path confinement
- report normalized diagnostics
- expose adapter hooks for project-specific route and link resolution

It should not own website-specific behavior. Product routes, renderer record
shapes, generated module names, and Svelte integration belong in consuming
adapters.

## Current API Snapshot

The in-repo prototype currently exports:

- `compileCommonloom`
- `parseFrontmatter`
- `parseMarkdown`
- `renderMarkdownHtml`
- `extractMarkdownReferences`
- `resolveLinkReferences`
- `classifyLinkTarget`
- `validateMediaReference`
- `resolveInsideRoot`
- `createSourceTrace`
- `hashContent`

Core public types include:

- `CommonloomConfig`
- `CommonloomResult`
- `CommonloomDiagnostic`
- `CommonloomSourceTrace`
- `CommonloomManifestEntry`
- `CommonloomCompiledDocument`
- `CommonloomLinkPolicy`
- `CommonloomHtmlPolicy`

Treat this list as an extraction target, not a locked public API. Stabilize it
here before the first standalone release.

## Status

Local package commands now exist:

```bash
npm run lint
npm run typecheck
npm run build
npm test
npm run check
```

The design and extraction knowledge base lives in [docs/index.md](docs/index.md).

Expected next steps:

1. Capture remote CI evidence for Phase 2.
2. Stabilize the public API before the first standalone release.
3. Add release automation and npm trusted publishing in a later phase.

## Design Boundary

Commonloom should stay adapter-neutral.

Keep inside this package:

- Markdown/frontmatter parsing
- HTML sanitization policy hooks
- diagnostics and source traces
- link and media reference extraction
- filesystem-safe path resolution
- generic manifest and compiled record contracts

Keep outside this package:

- Flavor Grenade route ids
- Svelte components
- website navigation models
- product copy and media
- generated website module names
- renderer-specific record transforms

## License

MIT. See [LICENSE.md](LICENSE.md).
