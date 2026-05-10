---
title: Release And CI Operational Requirements
tags:
  - commonloom
  - requirements/operational
  - ci
  - release
status: active
updated: 2026-05-10
aliases:
  - Release Requirements
  - CI Requirements
---

# Release And CI Operational Requirements

| ID | Requirement | Acceptance |
| --- | --- | --- |
| CLR-OPS-040 | Production releases shall be created from version tags whose commits are on `main`. | Release workflow verifies tag ancestry before publishing. |
| CLR-OPS-041 | Release jobs shall rebuild from source at the tag commit. | Published artifacts are produced in CI, not copied from a workstation. |
| CLR-OPS-042 | Pull requests shall run the checks relevant to changed package, docs, and generated-output behavior. | CI path filters, if used, cannot skip required checks for changed artifacts. |
| CLR-OPS-043 | Release workflows shall use least-privilege permissions. | Publish permissions are scoped per job and protected environment. |
| CLR-OPS-044 | Test tags may exercise release machinery without publishing production artifacts. | Test-tag workflows dry-run or produce draft/prerelease artifacts only. |
| CLR-OPS-045 | All CI/CD jobs shall use Node.js 24. | Every GitHub Actions job that installs, tests, builds, validates, packs, publishes, or releases Commonloom configures Node 24 before running Node or npm commands. |
| CLR-OPS-046 | npm publishing shall use OIDC trusted publishing. | Production npm publish workflows use npm trusted publishers, grant `id-token: write`, configure the npm registry URL, and publish with `npm publish` without long-lived npm tokens. |
| CLR-OPS-047 | Commonloom shall use git-flow branch naming standards. | Long-lived branches are `main` and `develop`; supporting branches use `feature/<short-description>`, `release/<version>`, and `hotfix/<short-description>`, with PRs as the merge gate. |
| CLR-OPS-048 | Validation-only CI phases shall not include CD or package publishing. | Phase plans such as [[phase-2-ci-quality-gates]] grant no publish permissions and define no deployment, release, or npm publish jobs. |

## Evidence

- [[sources/flavor-grenade-lsp/website/docs/requirements/technical/ci-cd|website CI/CD requirements]]
- [[sources/flavor-grenade-lsp/docs/requirements/ci-cd|root CI/CD requirements]]
- [[sources/flavor-grenade-lsp/docs/requirements/development-process|development process requirements]]
- [[sources/flavor-grenade-lsp/docs/adr/ADR007-git-flow-branching|ADR007 git-flow branching]]
- [[phase-2-ci-quality-gates]]
- npm trusted publishing documentation, verified 2026-05-10.
