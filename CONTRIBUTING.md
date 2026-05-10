# Contributing

Commonloom is in extraction. Keep changes small, evidence-based, and tied to
the standalone package boundary.

## Source of Truth

When changing imported behavior, verify it against:

- `flavor-grenade-lsp/website/src/content/pipeline/commonloom`
- `flavor-grenade-lsp/website/tests/content-pipeline-*.test.ts`
- `flavor-grenade-lsp/website/docs/architecture/content-pipeline.md`

Do not document or implement new behavior unless it is visible in those files,
implemented locally, or explicitly accepted for the standalone package.

## Development Workflow

Use Node.js 24 or newer.

Install dependencies:

```bash
npm ci
```

Run the full validation gate:

```bash
npm run check
```

Focused local commands:

```bash
npm run lint
npm run typecheck
npm run build
npm test
```

Phase 2 is validation-only. Do not add release, deployment, package publishing,
or npm trusted-publishing jobs unless a later phase explicitly owns that work.

## Design Rules

- Keep Commonloom adapter-neutral.
- Do not import Flavor Grenade website modules from library code.
- Use callbacks or typed interfaces for project-specific routing decisions.
- Preserve source paths, source positions, diagnostics, and content hashes where
  the parser can provide them.
- Treat path traversal, unsafe HTML, unresolved links, and unresolved media as
  diagnostic cases, not silent failures.
- Prefer stable, narrow public types over exposing internal parser details.

## Documentation Rules

- Keep docs synchronized with implemented behavior.
- Mark planned behavior as planned.
- Link to source evidence when the standalone package has not caught up yet.
- Remove bootstrap wording once the package is real and commands are verified.

## Pull Request Checklist

- The change keeps the library boundary generic.
- `npm run check` passes locally.
- Public API changes are reflected in `README.md`.
- User-visible changes are reflected in `CHANGELOG.md`.
- Tests cover new parsing, rendering, validation, or diagnostic behavior.
- New docs avoid website-specific assumptions unless they are clearly adapter
  examples.
