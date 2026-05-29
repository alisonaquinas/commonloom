---
title: Supply Chain Operational Requirements
tags:
  - commonloom
  - requirements/operational
  - supply-chain
  - security
status: active
updated: 2026-05-28
aliases:
  - Supply Chain Requirements
---

# Supply Chain Operational Requirements

| ID | Requirement | Acceptance |
| --- | --- | --- |
| CLR-OPS-060 | Runtime and development dependencies should use exact version strings where the package manager supports it. | Dependency range increases are reviewed as supply-chain debt. |
| CLR-OPS-061 | CI installs shall use frozen lockfile behavior. | CI fails instead of updating the lockfile during install. |
| CLR-OPS-062 | CI installs shall suppress dependency lifecycle scripts unless a job explicitly documents why scripts are required. | Install commands include the package-manager equivalent of `--ignore-scripts` where supported. |
| CLR-OPS-063 | Direct dependency upgrades shall include security advisory review before merge. | Upgrade PRs record advisory status and reviewer sign-off. |
| CLR-OPS-064 | Publishing to npm shall use OIDC trusted publishing. | npm release workflows use a configured npm trusted publisher from GitHub Actions, grant `id-token: write`, set `registry-url` to `https://registry.npmjs.org`, and run `npm publish` without a long-lived npm token. |
| CLR-OPS-065 | Release artifacts shall include provenance or checksums where the ecosystem supports them. | Release workflow emits audit evidence for published packages or binaries. |
| CLR-OPS-066 | npm package provenance shall be generated through trusted publishing. | Public package releases rely on npm trusted publishing's provenance behavior rather than manually injected credentials. |
| CLR-OPS-067 | CI shall run automated advisory checks against npm dependency state. | A Node.js 24 GitHub Actions job installs from the lockfile with lifecycle scripts disabled and runs `npm audit --audit-level=moderate`. |
| CLR-OPS-068 | Pull requests shall receive dependency-diff review before merge. | A pull-request-only GitHub Actions job runs GitHub Dependency Review and fails for moderate or higher severity advisory findings. |
| CLR-OPS-069 | Dependabot version updates shall be based on `develop` for npm dependencies and GitHub Actions. | `.github/dependabot.yml` schedules grouped version updates for npm workspaces and workflow actions with `target-branch: develop`, cooldowns for newly released versions, and separate major-update grouping. |
| CLR-OPS-070 | Dependabot security updates shall be configured separately from routine version updates. | `.github/dependabot.yml` keeps npm security updates separate from routine version-update PRs and documents GitHub's constraint that security-update PRs target the repository default branch. |
| CLR-OPS-071 | GitHub Actions checkouts shall avoid persisting repository credentials unless a job explicitly needs them. | Workflow checkout steps set `persist-credentials: false` for validation, scanning, and release dry-run/publish preparation jobs. |
| CLR-OPS-072 | The repository shall expose a private vulnerability reporting path and code-owner review ownership. | `SECURITY.md` documents private vulnerability reporting expectations, and `.github/CODEOWNERS` assigns repository-wide review ownership. |

## Evidence

- [[sources/flavor-grenade-lsp/docs/requirements/security/supply-chain|supply chain requirements]]
- [[sources/flavor-grenade-lsp/docs/adr/ADR014-dependency-security-policy|ADR014 dependency security policy]]
- [[sources/flavor-grenade-lsp/website/docs/requirements/technical/ci-cd|website CI/CD requirements]]
- npm trusted publishing documentation, verified 2026-05-10.
- [[tests/verification/index|Commonloom Verification]]
