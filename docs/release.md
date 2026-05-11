---
title: Release Operations
tags:
  - commonloom
  - release
  - npm
  - oidc
status: active
updated: 2026-05-11
aliases:
  - Release Runbook
  - npm Publishing
---

# Release Operations

Commonloom publishes to npm through GitHub Actions and npm OIDC trusted
publishing.

> [!NOTE] Bootstrap Status
> `commonloom@0.0.0` exists on npm with `latest` pointing to `0.0.0`. The
> package owner has reported trusted publishing is configured; the next release
> workflow run validates the end-to-end OIDC path.

> [!INFO] Current Release Candidate
> `release/0.1.0` prepares `commonloom@0.1.0` for merge to `main`. Create the
> `v0.1.0` tag only after the release branch is merged and the tag can point at
> the current head of `main`.

## Release Boundary

Production npm publishing shall:

- run from a version tag that points at the current head of `main`
- use Node.js 24
- rebuild from source at the tag commit
- run `npm run check`
- run `npm run pack:dry-run`
- run `npm run publish:dry-run`
- publish with `npm publish`
- use the GitHub Actions `npm` environment
- grant `id-token: write` only to the publish job
- avoid `NODE_AUTH_TOKEN` and long-lived npm secrets

## One-Time Bootstrap Publish

The one-time `0.0.0` bootstrap publish has been completed. Future maintainers
should not repeat it for the same version because npm package versions are
immutable.

The historical bootstrap procedure was:

1. Check out the verified commit intended for `commonloom@0.0.0`.
2. Run `npm ci --ignore-scripts`.
3. Run `npm run check`.
4. Run `npm run pack:dry-run`.
5. Run `npm run publish:dry-run`.
6. Authenticate with `npm login`.
7. Confirm the owner identity with `npm whoami`.
8. Run `npm publish`.
9. Record the npm package URL, version, dist-tag, and command evidence in
   [[plans/phase-4-npm-trusted-publishing/TASK-003|TASK-003]].

Use this section only as historical context for why the trusted publisher could
be configured after the package name existed on npm.

## Trusted Publisher Setup

Trusted publishing is reported configured for the exact GitHub Actions
publisher:

| Setting | Value |
| --- | --- |
| npm package | `commonloom` |
| GitHub repository | `alisonaquinas/commonloom` |
| Workflow file | `.github/workflows/npm-publish.yml` |
| Environment | `npm` |

Record the setup evidence in
[[plans/phase-4-npm-trusted-publishing/TASK-004|TASK-004]].

## Production Release

Normal releases happen through a version tag that points at the current head of
`main`.

1. Prepare the release through the git-flow `release/<version>` branch.
2. Confirm `package.json` version matches the planned tag.
3. Confirm `CHANGELOG.md`, root docs, and durable vault docs describe the
   release accurately.
4. Merge the release branch to `main`.
5. Create a tag named `vX.Y.Z` or `vX.Y.Z-prerelease` on the current head of
   `main`.
6. Push the tag.
7. Confirm `.github/workflows/npm-publish.yml` completes the dry-run job.
8. Approve the protected `npm` environment when the publish should proceed.
9. Confirm the package version appears on npm.
10. Record GitHub Actions and npm evidence in the phase or release ticket.

The release workflow rejects production publishing when the tag name does not
match the package version or the tag commit is not exactly the current
`origin/main` head.

## Dry-Run Validation

Authoritative dry-run evidence comes from GitHub Actions, not a local
workstation. Maintainers validate release machinery without publishing by
starting the `npm Trusted Publishing` workflow with `workflow_dispatch`.

The dry-run job installs dependencies, runs `npm run check`, validates the
package tarball, and runs `npm run publish:dry-run:ci`. That CI script
temporarily uses a unique prerelease version so dry-runs still work after the
current package version already exists on npm. The publish job is disabled for
`workflow_dispatch`, so this path cannot publish a production artifact.

Local dry-run commands are useful preflight checks only:

```bash
npm run check
npm run pack:dry-run
npm run publish:dry-run
npm run publish:dry-run:ci
```

Use `npm run publish:dry-run` when validating a not-yet-published release
version. Use `npm run publish:dry-run:ci` when validating publish mechanics
without depending on the current `package.json` version being unpublished.
Do not treat local command output as Phase 4 closeout evidence.

## Failure Response

If a release validation step fails, do not approve the `npm` environment.
Fix the cause through a normal git-flow branch and restart the release.

If `npm publish` fails after validation:

- keep the failed GitHub Actions run as evidence
- verify whether npm created a version before retrying
- avoid republishing an already-created immutable npm version
- document the incident and recovery in the active release ticket

If a bad version is published, prefer npm deprecation and a corrective release
over history rewriting.

## See Also

- [[plans/phase-4-npm-trusted-publishing|Phase 4 npm Trusted Publishing]]
- [[requirements/operational/release-and-ci|Release And CI]]
- [[requirements/operational/supply-chain|Supply Chain]]
- [[tests/requirements-matrix|Requirements Test Matrix]]
