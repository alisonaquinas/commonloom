# Contributing

Commonloom is in extraction. Keep changes small, evidence-based, and tied to
the current prototype until this repository has its own implementation.

## Source of Truth

Until the migration is complete, verify behavior against:

- `flavor-grenade-lsp/website/src/content/pipeline/commonloom`
- `flavor-grenade-lsp/website/tests/content-pipeline-*.test.ts`
- `flavor-grenade-lsp/website/docs/architecture/content-pipeline.md`

Do not document or implement behavior here unless it is visible in those files
or has been explicitly accepted for the standalone package.

## Development Workflow

This repository does not yet define setup or validation commands.

Once the package scaffold exists, update this section with exact commands for:

- installing dependencies
- building the package
- running unit tests
- checking types
- linting and formatting
- publishing or dry-running releases

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
- Public API changes are reflected in `README.md`.
- User-visible changes are reflected in `CHANGELOG.md`.
- Tests cover new parsing, rendering, validation, or diagnostic behavior.
- New docs avoid website-specific assumptions unless they are clearly adapter
  examples.
