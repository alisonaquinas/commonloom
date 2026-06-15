# Commonloom

Commonloom is the standalone TypeScript home for the reusable Markdown content
pipeline maintained in this repository.

The imported implementation now lives in this repository:

- `src/` for Commonloom core modules
- `test/` for Commonloom core behavior tests
- `examples/` for shared-content adopter examples
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

This is the current `0.1.4` public surface. The `0.1.0` release was the first
standalone release. The
package remains on the `0.x` line, so minor releases may still refine API
shape before a future `1.0.0` stability commitment.

## Status

Commonloom `0.1.4` is prepared for release through npm trusted publishing. The
repository includes shared-content integration examples that exercise the
package from React, Vue, Svelte, Next.js, Angular, and Node without moving
framework glue into the core library.

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
npm run examples:check
npm run examples:build
npm run examples:verify
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

## Examples

Adopter examples live in [examples/](examples/). They all use the same shared
Markdown, SCSS, and Commonloom logo assets; only the backing technology changes.

Available examples:

- [React](examples/react/README.md)
- [Vue](examples/vue/README.md)
- [Svelte](examples/svelte/README.md)
- [Next.js](examples/nextjs/README.md)
- [Angular](examples/angular/README.md)
- [Node](examples/node/README.md)

Run all example parity checks and builds from the repository root:

```bash
npm run examples:check
```

The framework examples are integration patterns, not Commonloom runtime
requirements. Commonloom core remains adapter-neutral; consuming projects own
routes, components, generated modules, and renderer-specific record transforms.

## Project Layout

```text
commonloom/
├── examples/            # Shared-content framework and Node examples
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

- consuming-application route ids
- Svelte components
- website navigation models
- product copy and media
- generated website module names
- renderer-specific record transforms

## License

MIT. See [LICENSE.md](LICENSE.md).
