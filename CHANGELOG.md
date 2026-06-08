# Changelog

All notable changes to Commonloom will be documented in this file.

Commonloom follows a `0.x` release line while the standalone public API settles.

## Unreleased

- Documented the proposed Markdown flavor mode specification, including the
  one-flavor compile-run rule and reference-only Flavor Grenade evidence.
- Corrected documentation drift found during reviewer audit for current package
  version, example dependency policy, frontmatter tooling, and flavor evidence.

## [0.1.3] - 2026-05-29

- Updated library tooling with the current TypeScript major update.
- Updated Vue example type checking with the latest `vue-tsc` patch.

## [0.1.2] - 2026-05-29

- Collected the open Dependabot updates for production dependencies,
  development dependencies, GitHub Actions, TypeScript, and the Next.js
  example canary into a single validated update set.
- Updated the tracked Next.js generated type reference for the newer canary
  build output.

## [0.1.1] - 2026-05-29

- Added Phase 6 planning for shared-content framework integration examples
  covering React, Vue, Svelte, Next.js, Angular, and Node.
- Added React, Vue, Svelte, Next.js, Angular, and Node examples under
  `examples/` using shared Commonloom Markdown, SCSS, and logo assets.
- Added `npm run examples:verify`, `npm run examples:build`, and
  `npm run examples:check` to keep example parity and builds in local and CI
  validation.
- Closed Phase 4 release documentation with `v0.1.0` trusted-publishing
  evidence.
- Tightened Phase 6 plan review findings for Node styling parity, Angular
  production preview instructions, lifecycle status definitions, and ticket
  traceability.
- Added a dedicated Code Quality and SAST GitHub Actions workflow with
  Dependency Review, npm audit, CodeQL, and Semgrep Community Edition checks.
- Added Dependabot version-update configuration for npm and GitHub Actions,
  OpenSSF Scorecard scanning, security reporting policy, and repository
  CODEOWNERS metadata.
- Clarified that Dependabot version-update work targets `develop` and merged
  the existing Svelte Dependabot PR into the GitHub-native security branch
  without downgrading the newer audit-clean dependency state.

## [0.1.0] - 2026-05-11

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
- Added configurable Commonloom compile limits for manifest count, Markdown
  bytes, reference count, and rendered HTML bytes.
- Added compiler hardening tests for Markdown symlink escapes, unsafe HTML
  attributes, internal link diagnostics, source-position offsets, and resource
  limits.
- Added a `format:check` script for the root Markdown format gate.

### Changed

- Updated root documentation to describe the imported package, current quality
  gate, and `0.1.0` public API status.
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
- Pinned GitHub Actions workflow actions to reviewed full-length commit SHAs.
- Consolidated Markdown processor setup shared by parser and renderer paths.
- Normalized phase ticket metadata to numeric phase values.
- Refactored compiler trace resolution helpers to return diagnostics with
  values instead of mutating caller-owned diagnostic arrays.

### Fixed

- Corrected source positions for links and images when Markdown frontmatter is
  present.
- Ensured standard internal links can be resolved by adapter callbacks before
  unresolved diagnostics are emitted.
- Stripped entity-encoded and whitespace-obfuscated unsafe HTML URL attributes
  before rendering sanitized output.
