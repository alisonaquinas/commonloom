# Commonloom

Commonloom is the planned standalone home for the reusable content pipeline
currently being proven inside
[`flavor-grenade-lsp`](https://github.com/alisonaquinas/flavor-grenade-lsp/tree/feature/w8-commonloom-content-pipeline).

The implementation source of record is currently:

- `website/src/content/pipeline/commonloom` in the source repository
- `website/tests/content-pipeline-*.test.ts` for the current behavior contract
- `website/docs/architecture/content-pipeline.md` for the extraction boundary

This repository is a bootstrap shell. It does not yet contain the package
scaffold, source files, build scripts, or published release artifacts.

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
- `CommonloomOutputConfig`

Treat this list as an extraction target, not a locked public API. Stabilize it
here before the first standalone release.

## Status

No install, build, test, lint, or release commands are defined in this
repository yet.

The design and extraction knowledge base lives in [docs/index.md](docs/index.md).

Expected next steps:

1. Add the package scaffold.
2. Move or copy the prototype implementation from the source repository.
3. Port the content-pipeline tests.
4. Define the supported runtime, package manager, and build output.
5. Start release notes in `CHANGELOG.md` once changes are versioned here.

## Design Boundary

Commonloom should stay adapter-neutral.

Keep inside this package:

- Markdown/frontmatter parsing
- HTML sanitization policy hooks
- diagnostics and source traces
- link and media reference extraction
- filesystem-safe path resolution
- generic manifest and output contracts

Keep outside this package:

- Flavor Grenade route ids
- Svelte components
- website navigation models
- product copy and media
- generated website module names
- renderer-specific record transforms

## License

MIT. See [LICENSE.md](LICENSE.md).
