# Commonloom

Commonloom is the standalone TypeScript home for the reusable content pipeline
first proven inside
[`flavor-grenade-lsp`](https://github.com/alisonaquinas/flavor-grenade-lsp/tree/feature/w8-commonloom-content-pipeline).

The imported implementation now lives in this repository:

- `src/` for Commonloom core modules
- `test/` for Commonloom core behavior tests
- `docs/` for requirements, ADRs, DDD, BDD, and roadmap notes
- `.github/workflows/` and `.githooks/` for validation gates

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

The in-repo package currently exports:

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
- `CommonloomLimitsPolicy`

This is the `0.1.0` public surface for the first standalone release. The
package remains on the `0.x` line, so minor releases may still refine API
shape before a future `1.0.0` stability commitment.

## Status

Phase 1 imported the Commonloom package source and tests. Phase 2 added the
local and CI quality gate. Phase 3 expanded unit coverage, added integration
and end-to-end compiler tests, and added static verification for boundaries,
traceability, and phase/ticket process rules. Phase 4 added npm release
automation. Phase 5 completed audit-driven compiler, workflow security, and
documentation hardening. This `release/0.1.0` branch prepares
`commonloom@0.1.0` for merge to `main` and the `v0.1.0` release tag.

Use Node.js 24 or newer.

Install dependencies:

```bash
npm ci
```

Install the repository pre-commit hook:

```bash
npm run hooks:install
```

Run the full validation gate:

```bash
npm run check
```

Focused commands:

```bash
npm run lint
npm run lint:docs
npm run format:check
npm run verify
npm run typecheck
npm run build
npm run pack:dry-run
npm run publish:dry-run
npm run publish:dry-run:ci
npm run test:battery
npm run test:unit
npm run test:integration
npm run test:e2e
npm test
```

The design and extraction knowledge base lives in [docs/index.md](docs/index.md).

Expected next steps:

1. Merge `release/0.1.0` to `main` after CI passes.
2. Tag the resulting `main` head as `v0.1.0` to run trusted publishing.
3. Record release workflow and npm publication evidence in the vault.
4. Document adapter integration examples without moving adapter behavior into
   the core package.

## Project Layout

```text
commonloom/
├── src/                 # TypeScript library source
├── test/                # Vitest behavior tests
├── docs/                # Obsidian-style design and planning vault
├── scripts/             # Documentation validation helpers
├── .github/workflows/   # GitHub Actions quality gate
├── .githooks/           # Local pre-commit gate
├── package.json         # npm scripts, exports, and dependencies
└── tsconfig*.json       # TypeScript build and check configuration
```

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
