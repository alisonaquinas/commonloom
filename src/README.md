# Source

`src/` contains the adapter-neutral Commonloom TypeScript library.

The public package surface is [index.ts](index.ts). Internal modules keep
separate responsibilities so parser, renderer, resolver, media, path, and trace
behavior can be tested independently before the first standalone release.

## Module Map

| Module | Responsibility |
| --- | --- |
| [index.ts](index.ts) | Public exports for consumers. |
| [types.ts](types.ts) | Shared contracts for diagnostics, traces, links, manifests, and compile results. |
| [compiler.ts](compiler.ts) | Top-level manifest-driven compile entry point. |
| [frontmatter.ts](frontmatter.ts) | Gray Matter parsing plus Zod validation diagnostics. |
| [markdown-processors.ts](markdown-processors.ts) | Shared CommonMark and GFM processor setup. |
| [markdown.ts](markdown.ts) | CommonMark and GFM parsing plus heading extraction. |
| [html.ts](html.ts) | Markdown-to-HTML rendering with sanitization diagnostics. |
| [links.ts](links.ts) | Link, wiki-link, and image-reference extraction and resolution. |
| [media.ts](media.ts) | Local media validation, alt-text checks, and path confinement. |
| [paths.ts](paths.ts) | Filesystem-safe path resolution inside configured roots. |
| [source-trace.ts](source-trace.ts) | Content hashes and source trace assembly. |
| [hash.ts](hash.ts) | Stable SHA-256 content hashing. |
| [diagnostics.ts](diagnostics.ts) | Narrow diagnostic enum re-exports. |

## Invariants

- Keep this package adapter-neutral.
- Do not import Flavor Grenade website modules here.
- Report validation problems as `CommonloomDiagnostic` values instead of
  throwing for normal content errors.
- Preserve source paths, line numbers, columns, and content hashes when parser
  libraries expose them.
- Add public exports through [index.ts](index.ts) and update
  [../README.md](../README.md) when the exposed surface changes.
