# Changelog

All notable changes to Commonloom will be documented in this file.

This project is not yet released as a standalone package. Version entries should
start once the package is ready for npm publication.

## Unreleased

### Added

- Bootstrap repository documentation for the standalone Commonloom extraction.
- Documented the current source-of-record location in `flavor-grenade-lsp`.
- Imported the initial Commonloom TypeScript source into `src/`.
- Imported Commonloom behavior tests into `test/`.
- Added npm scripts for linting, typechecking, building, testing, and the full
  `npm run check` validation gate.
- Added GitHub Actions validation on `main`, `develop`, and git-flow support
  branches with Node.js 24.
- Added a pre-commit hook path that runs `npm run check`.
- Added documentation linting for root Markdown, Obsidian vault notes, and ADRs.
- Added Phase 1 and Phase 2 planning, tickets, and closeout evidence in `docs/`.
- Added source and test folder documentation plus JSDoc for public source
  contracts and helpers.
- Added `docs/tests/` with unit, integration, end-to-end, verification, and
  validation taxonomy for the current test battery.
- Added a requirements-to-tests matrix that records covered, partial, verified,
  and untested requirements.
- Added Phase 3 roadmap and tickets for closing documented testing gaps.
- Added manifest-driven compiler behavior plus integration and E2E tests for
  adapter-visible compiled records.
- Added parser and filesystem security tests plus static boundary verification
  in `npm run check`.
- Added requirements traceability, BDD requirement-link, and phase/ticket
  process verification to `npm run verify`.
- Added typed unit, integration, E2E, and aggregate test-battery npm scripts
  and wired them into CI as explicit steps.
- Added Phase 4 roadmap and tickets for npm OIDC trusted publishing.
- Added Git LFS tracking for Commonloom documentation PNG assets.
- Added a GitHub-facing `.github/README.md` that uses the new light and dark
  Commonloom logo assets.

### Changed

- Updated root documentation to describe the imported package, current quality
  gate, and pre-release API status.
- Updated CI documentation so the test battery is described by category instead
  of only by the catch-all Vitest command.
- Updated package metadata for public npm publication readiness.
- Added npm package dry-run scripts, a release tag verifier, and an npm trusted
  publishing workflow that uses Node.js 24 and GitHub Actions OIDC.
- Added release operations documentation for manual bootstrap publishing,
  trusted publisher setup, dry runs, and production releases.
- Added package dry-run validation to the CI workflow and tightened release
  tag validation so publishing only runs for tags at the current `main` head.
- Added a CI-safe npm publish dry-run script that uses a temporary prerelease
  version after `commonloom@0.0.0` has been published.

### Fixed

- Nothing yet.
