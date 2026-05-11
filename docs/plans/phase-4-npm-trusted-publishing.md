---
title: Phase 4 - npm Trusted Publishing
tags:
  - commonloom
  - plans
  - phase-4
  - release
  - npm
  - oidc
status: active
updated: 2026-05-11
aliases:
  - Phase 4
  - npm Trusted Publishing
  - Trusted Publishing
---

# Phase 4 - npm Trusted Publishing

Phase 4 establishes Commonloom release and npm publishing automation using
GitHub Actions and npm OIDC trusted publishing.

This phase has implemented the release workflow, package dry-runs, release
guardrails, and operator runbook. The manual bootstrap package now exists on
npm, and npm trusted publisher setup is user-reported configured. Final closeout
still needs remote CI and release dry-run evidence.

## Objective

Make Commonloom publishable to npm without long-lived npm tokens, while keeping
release validation gated by the existing quality battery and git-flow process.

## Scope

Phase 4 includes:

- package metadata and publish-file readiness
- `npm pack` and `npm publish --dry-run` validation
- a manual `0.0.0` bootstrap publish so the npm package exists before trusted
  publisher authorization is configured
- npm trusted publisher authorization for the GitHub Actions release workflow
- a release workflow that uses Node.js 24, `id-token: write`, npm registry
  setup, and OIDC trusted publishing
- tag and release guardrails so production publishes come from version tags
  that point at the current head of `main`
- test-tag or dry-run release validation that exercises packaging without
  publishing production artifacts
- release operator documentation

Phase 4 does not include:

- changing Commonloom's adapter-neutral source boundary
- publishing from a developer workstation after the trusted publisher is active
- storing long-lived npm tokens in GitHub Secrets
- building a Flavor Grenade adapter package

## Preconditions

- Phase 1 imported source and tests.
- Phase 2 established the CI quality gate.
- Phase 3 closed the first testing gaps and added traceability/process checks.
- A human package owner can perform the one-time manual `0.0.0` npm publish.
- A human package owner can configure npm trusted publishing after the package
  exists.

## External Facts Verified

Current npm documentation says GitHub Actions trusted publishing:

- uses an npm trusted publisher relationship with the authorized workflow
- requires `id-token: write` so GitHub Actions can mint an OIDC token
- should set `registry-url` to `https://registry.npmjs.org`
- allows `npm publish` to authenticate through OIDC without an npm token

Current GitHub Actions documentation says OIDC jobs need `id-token: write`; the
checkout action also needs `contents: read`.

## Work Items

| ID | Work Item | Acceptance |
| --- | --- | --- |
| P4-001 | Audit publication readiness. | Package name, privacy flag, license, files list, exports, version, package contents, and README/changelog/license inclusion are documented. |
| P4-002 | Prepare package metadata and dry-run packaging. | `npm pack --dry-run` and `npm publish --dry-run` expose only intended files and no secrets, generated debris, or docs-only assets. |
| P4-003 | Perform manual bootstrap publish. | A package owner manually publishes `0.0.0` from the verified commit and records npm package URL, dist-tag, and command evidence. |
| P4-004 | Configure npm trusted publisher. | npm is configured to trust the exact GitHub repository, workflow file, and protected environment that will publish Commonloom. |
| P4-005 | Add release workflow. | GitHub Actions publishes on approved version tags or releases using Node.js 24, `contents: read`, `id-token: write`, npm registry setup, and no npm token. |
| P4-006 | Add release guardrails. | Workflow verifies the tag commit equals the current head of `main`, package version/tag agreement, full quality battery, and protected environment approval before publish. |
| P4-007 | Add test-tag or dry-run release validation. | A safe non-production path exercises packaging and workflow guardrails without publishing production artifacts. |
| P4-008 | Document release operations. | Maintainers have a release runbook covering manual bootstrap, trusted publisher setup, release execution, rollback/deprecation, and evidence capture. |
| P4-009 | Update traceability and closeout evidence. | Requirements matrix, roadmap, phase tickets, and vault log reflect release and publishing coverage after local and remote CI pass. |

## Tickets

- [[plans/phase-4-npm-trusted-publishing/FEAT-001]]
- [[plans/phase-4-npm-trusted-publishing/TASK-001]]
- [[plans/phase-4-npm-trusted-publishing/TASK-002]]
- [[plans/phase-4-npm-trusted-publishing/TASK-003]]
- [[plans/phase-4-npm-trusted-publishing/TASK-004]]
- [[plans/phase-4-npm-trusted-publishing/TASK-005]]
- [[plans/phase-4-npm-trusted-publishing/TASK-006]]
- [[plans/phase-4-npm-trusted-publishing/TASK-007]]
- [[plans/phase-4-npm-trusted-publishing/TASK-008]]
- [[plans/phase-4-npm-trusted-publishing/CHORE-001]]

## Release Gate

Required Phase 4 gate:

1. Run `npm run check` before package dry runs.
2. Run `npm pack --dry-run`.
3. Run `npm publish --dry-run`.
4. Perform the manual `0.0.0` bootstrap publish only from a verified commit.
5. Configure npm trusted publishing for the exact workflow before enabling
   automated production publishing.
6. Run GitHub Actions release workflow dry-run or test-tag validation.
7. Record local quality-gate evidence and GitHub Actions CI evidence before
   closing the phase.

## Acceptance Criteria

- [ ] Package metadata is ready for public npm publication.
- [x] Manual `0.0.0` bootstrap publish evidence is recorded.
- [x] npm trusted publisher authorization is configured without long-lived npm
  tokens.
- [x] Release workflow uses Node.js 24 and least-privilege permissions.
- [x] Release workflow is gated by the full Commonloom quality battery.
- [x] Production publishes are limited to approved version tags at the head of
  `main`.
- [x] Test-tag or dry-run release validation exists.
- [x] Release operator runbook is documented.
- [x] Requirements matrix release and publishing gaps are updated.
- [ ] GitHub Actions CI and release dry-run evidence is captured before phase
  completion.

## Evidence

- [[requirements/operational/release-and-ci|Release And CI]]
- [[requirements/operational/supply-chain|Supply Chain]]
- [[requirements/operational/quality-gates|Quality Gates]]
- [[release|Release Operations]]
- [[tests/requirements-matrix|Requirements Test Matrix]]
- npm trusted publishing documentation, verified 2026-05-11.
- GitHub Actions OIDC documentation, verified 2026-05-11.

## See Also

- [[roadmap|Commonloom Roadmap]]
- [[plans/phase-4-npm-trusted-publishing/index|Phase 4 Tickets]]
- [[requirements/operational/phase-execution|Phase Execution]]
- [[requirements/operational/task-management|Task Management]]

## Workflow Log

> [!INFO] Planned · 2026-05-11
> Phase 4 was authored to close the remaining release, npm publishing,
> provenance, and test-tag workflow gaps. Execution has not started.

> [!INFO] Active · 2026-05-11
> Phase 4 execution started on `feature/phase-4-npm-trusted-publishing`.

> [!SUCCESS] Publication metadata audit · 2026-05-11
> TASK-001 confirmed the npm package name is not currently published and added
> public package metadata required before npm dry-run validation.

> [!SUCCESS] Package dry-runs · 2026-05-11
> TASK-002 passed `npm pack --dry-run` and `npm publish --dry-run` for
> `commonloom@0.0.0`. The publish set is limited to package metadata, root
> public docs, and built `dist/` files.

> [!WARNING] npm owner action required · 2026-05-11
> TASK-003 and TASK-004 are blocked because `npm whoami` returns `E401` locally.
> A package owner must authenticate, perform the manual `0.0.0` bootstrap
> publish, and configure npm trusted publishing before Phase 4 can close.

> [!SUCCESS] Release automation · 2026-05-11
> TASK-005 through TASK-008 added the npm trusted publishing workflow,
> release-tag guardrails, package dry-run scripts, release runbook, and
> requirements matrix updates. At that point CHORE-001 still needed npm owner
> and remote evidence.

> [!SUCCESS] CI publish dry-run guard · 2026-05-11
> The main CI workflow now runs `npm run pack:dry-run` and
> `npm run publish:dry-run:ci`. The release guard now requires version tags to
> point at the exact `origin/main` head before publishing.

> [!INFO] Evidence boundary · 2026-05-11
> Local dry-runs are useful preflight checks only. Phase 4 release dry-run
> evidence must come from GitHub Actions workflow output.

> [!SUCCESS] PR CI evidence · 2026-05-11
> PR 10 GitHub Actions passed for commit `2afbd03`:
> <https://github.com/alisonaquinas/commonloom/actions/runs/25670022163/job/75352512283>.
> The job includes the package tarball dry-run and CI-safe npm publish dry-run
> steps. Manual release workflow dispatch is unavailable until
> `.github/workflows/npm-publish.yml` is present on the default branch.

> [!SUCCESS] Bootstrap and trusted publisher setup · 2026-05-11
> `npm view commonloom version dist-tags --json` confirms `commonloom@0.0.0`
> exists with `latest` set to `0.0.0`. The package owner reported npm trusted
> publishing has been configured. CHORE-001 is active pending local verification
> and remote CI/release dry-run evidence.
