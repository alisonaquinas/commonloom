# Commonloom

![Commonloom logo for light mode](../docs/assets/commonloom-logo-light-transparent.png#gh-light-mode-only)
![Commonloom logo for dark mode](../docs/assets/commonloom-logo-dark-transparent.png#gh-dark-mode-only)

[![Commonloom quality and test battery][ci-badge]][ci-workflow]
[![npm package][npm-badge]][npm-package]
[![Node.js 24][node-badge]][node-docs]
[![TypeScript][ts-badge]][ts-docs]
[![MIT License][license-badge]][license]

Commonloom is the standalone TypeScript home for a reusable Markdown content
pipeline.

It turns Markdown, frontmatter, links, media, source traces, and diagnostics
into normalized records that adapters can map into framework-specific renderer
outputs.

## Why It Exists

Commonloom keeps reusable content compilation separate from website-specific
delivery concerns.

| Commonloom owns | Adapters own |
| --- | --- |
| Markdown and frontmatter parsing | Routes and page groups |
| Safe static HTML rendering | Framework-specific rendering |
| Link, image, and media analysis | Generated module formatting |
| Diagnostics and source traces | Product copy and public navigation |
| Manifest-driven compiled records | Deployment and release surfaces |

## Current Battery

The repository has an explicit quality and test battery:

- `npm run lint`
- `npm run verify`
- `npm run typecheck`
- `npm run build`
- `npm run examples:check`
- `npm run test:unit`
- `npm run test:integration`
- `npm run test:e2e`

The aggregate local gate is:

```bash
npm run check
```

CI runs the same categories as named GitHub Actions steps on Node.js 24.

## Integration Examples

The [`examples/`](../examples) workspace demonstrates Commonloom with shared
content, shared SCSS, and shared logo assets across:

- [`React`](../examples/react/README.md)
- [`Vue`](../examples/vue/README.md)
- [`Svelte`](../examples/svelte/README.md)
- [`Next.js`](../examples/nextjs/README.md)
- [`Angular`](../examples/angular/README.md)
- [`Node`](../examples/node/README.md)

These examples show adapter patterns. They are not framework dependencies of
the Commonloom core package.

## Documentation Surface

The `docs/` vault is maintained as an Obsidian-flavored LLM wiki:

- [`docs/index.md`](../docs/index.md) is the main vault index.
- [`docs/requirements/`](../docs/requirements) defines the requirements
  surface.
- [`docs/adr/`](../docs/adr) records architecture decisions.
- [`docs/ddd/`](../docs/ddd) documents the domain model and language.
- [`docs/bdd/`](../docs/bdd) documents actors and behavior scenarios.
- [`docs/tests/`](../docs/tests) maps requirements to executable evidence.
- [`docs/assets/`](../docs/assets) contains Git LFS-managed brand assets.

## Start Here

```bash
npm ci
npm run hooks:install
npm run check
```

Then read:

1. [`README.md`](../README.md)
2. [`docs/index.md`](../docs/index.md)
3. [`docs/tests/requirements-matrix.md`](../docs/tests/requirements-matrix.md)
4. [`docs/roadmap.md`](../docs/roadmap.md)

> [!NOTE]
> Commonloom `0.1.6` is the current package version. `0.1.0` is the
> first standalone release. The public API is tested
> and visible, but the package remains on the `0.x` line until a future `1.0.0`
> stability commitment.

[ci-badge]: https://img.shields.io/github/actions/workflow/status/alisonaquinas/commonloom/documentation-lint.yml?branch=develop&label=quality%20battery
[ci-workflow]: https://github.com/alisonaquinas/commonloom/actions/workflows/documentation-lint.yml
[license]: ../LICENSE.md
[license-badge]: https://img.shields.io/badge/license-MIT-blue
[node-badge]: https://img.shields.io/badge/node-24.x-43853d
[node-docs]: https://nodejs.org/
[npm-badge]: https://img.shields.io/npm/v/commonloom?label=npm
[npm-package]: https://www.npmjs.com/package/commonloom
[ts-badge]: https://img.shields.io/badge/TypeScript-6.x-3178c6
[ts-docs]: https://www.typescriptlang.org/
