# Contributing

Commonloom has imported its initial source and tests, but it is still
pre-release. Keep changes small, evidence-based, and tied to the standalone
package boundary.

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

Install the repository hook path once per clone:

```bash
npm run hooks:install
```

Run the full validation gate:

```bash
npm run check
```

Focused local commands:

```bash
npm run lint
npm run verify
npm run typecheck
npm run build
npm run test:battery
npm run test:unit
npm run test:integration
npm run test:e2e
npm test
```

`npm run check` is the required local and CI quality gate. It runs
documentation linting, TypeScript linting, static verification, typecheck,
build, and the unit, integration, and end-to-end Vitest battery.

The current validation gate is check-only. Do not add release, deployment,
package publishing, or npm trusted-publishing jobs unless a later phase
explicitly owns that work.

## Branch And Ticket Workflow

Use git-flow branch names:

- `main` for production release history
- `develop` for integration
- `feature/<short-description>` for feature work
- `release/<version>` for release preparation
- `hotfix/<short-description>` for urgent production fixes

Do not use `codex/*` branch names in this repository.

When a phase or tracked ticket is active, commit workflow-log entries, status
changes, blocker updates, and verification notes with the work that caused
them, or before unrelated follow-on work starts.

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
- Keep root docs public and concise; keep detailed design synthesis in `docs/`.
- Update `docs/index.md` when adding durable vault pages.

## Pull Request Checklist

- The change keeps the library boundary generic.
- `npm run check` passes locally.
- Public API changes are reflected in `README.md`.
- User-visible changes are reflected in `CHANGELOG.md`.
- Phase or ticket workflow changes are committed with their triggering work.
- Tests cover new parsing, rendering, validation, or diagnostic behavior.
- New docs avoid website-specific assumptions unless they are clearly adapter
  examples.
