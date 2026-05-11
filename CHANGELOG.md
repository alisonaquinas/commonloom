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

### Changed

- Updated root documentation to describe the imported package, current quality
  gate, and pre-release API status.

### Fixed

- Nothing yet.
