# Commonloom Examples Changelog

All notable changes to the Commonloom example suite are documented in this
file.

The examples changelog is separate from the root Commonloom changelog because
example updates do not necessarily indicate a Commonloom API release.

## [0.1.0] - 2026-05-11

### Added

- Added shared example Markdown under `examples/shared/content/`.
- Added shared example SCSS under `examples/shared/styles/`.
- Added shared Commonloom logo assets under `examples/shared/assets/`.
- Added React, Vue, Svelte, Next.js, Angular, and Node examples that render
  the same shared Commonloom content, styling, and assets.
- Added local README instructions for install, development, build, and preview
  commands in each example.
- Added example compatibility validation through `npm run examples:verify`,
  `npm run examples:build`, and `npm run examples:check`.
- Wired the example compatibility battery into `npm run check`, pre-commit,
  and GitHub Actions.

### Changed

- Updated example packages to depend on published `commonloom@0.1.0` instead
  of the local workspace package.
