---
title: Commonloom Verification
tags:
  - commonloom
  - tests
  - verification
status: active
updated: 2026-05-28
aliases:
  - Verification Tests
  - Verification Gate
---

# Commonloom Verification

Verification proves the repository was built and checked according to the
defined process.

## Current Verification Gate

The authoritative local and CI verification command is:

```bash
npm run check
```

It expands to:

```bash
npm run lint && npm run verify && npm run typecheck && npm run build && npm run examples:check && npm run test:battery
```

## Included Checks

| Check | Command | Current Scope |
| --- | --- | --- |
| Root Markdown lint | `npm run lint:docs:markdown` | Markdown files outside `docs/`, excluding `node_modules`. |
| Obsidian vault lint | `npm run lint:docs:obsidian` | Maintained vault notes under `docs/`, excluding raw `docs/sources/` imports. |
| ADR lint | `npm run lint:docs:adr` | MADR-style records under `docs/adr`. |
| TypeScript lint | `npm run lint` | `src/**/*.ts`, `test/**/*.ts`, and config files with warnings blocked. |
| Static and process verification | `npm run verify` | Adapter-neutral source imports, disallowed core dependencies, exact dependency versions, generated output tracking, requirements traceability, BDD requirement links, and phase/ticket process rules. |
| Typecheck | `npm run typecheck` | TypeScript project check with no emit. |
| Build | `npm run build` | Distributable TypeScript build. |
| Example parity | `npm run examples:verify` | Published Commonloom dependency, shared substrate, and forbidden internal import checks for examples. |
| Example builds | `npm run examples:build` | React, Vue, Svelte, Next.js, Angular, and Node example builds. |
| Unit tests | `npm run test:unit` | Five Vitest files, twenty-eight tests. |
| Integration tests | `npm run test:integration` | Public compiler integration flow. |
| E2E tests | `npm run test:e2e` | Fixture content tree compiled into adapter-visible records. |
| Static code quality inspection | `.github/workflows/code-quality-sast.yml` | Dedicated GitHub Actions job for lint, verification, and typecheck. |
| Dependency review | `.github/workflows/code-quality-sast.yml` | Pull-request dependency-diff review that fails on moderate or higher advisories. |
| npm advisory audit | `.github/workflows/code-quality-sast.yml` | Lockfile-backed `npm audit --audit-level=moderate` with lifecycle scripts disabled during install. |
| CodeQL SAST | `.github/workflows/code-quality-sast.yml` | JavaScript and TypeScript CodeQL analysis using security-extended and security-and-quality queries. |
| Semgrep CE SAST | `.github/workflows/code-quality-sast.yml` | Semgrep Community Edition default and security-audit rules with SARIF upload. |
| Dependabot version updates | `.github/dependabot.yml` | Weekly npm and GitHub Actions version-update PRs based on `develop`, grouped by ecosystem/update type, with npm SemVer cooldowns and a GitHub Actions default cooldown. |
| Dependabot security updates | `.github/dependabot.yml` | Daily npm security update checks are configured separately; GitHub targets security-update PRs at the repository default branch. |
| OpenSSF Scorecard | `.github/workflows/supply-chain-scorecard.yml` | Supply-chain posture scan with SARIF output and published Scorecard results. |
| Security ownership metadata | `SECURITY.md`, `.github/CODEOWNERS` | Private vulnerability reporting expectations and repository-wide code-owner review ownership. |

`npm run verify` expands to:

```bash
node scripts/verify-boundaries.mjs && node scripts/verify-traceability.mjs && node scripts/verify-plan-process.mjs
```

## CI Shape

The GitHub Actions verification job uses Node.js 24, installs with
`npm ci --ignore-scripts`, and runs lint, verification, typecheck, build, unit,
integration, and E2E steps explicitly. The step sequence mirrors
`npm run check` and includes example parity plus example build steps.

The dedicated code-quality and SAST workflow uses Node.js 24 and least
privilege permissions. It adds static quality inspection, GitHub Dependency
Review, `npm audit`, CodeQL, and Semgrep Community Edition as separate jobs so
security and code-quality findings are visible independently from the package
build/test battery.

Dependabot keeps npm and GitHub Actions version updates active on `develop`
through `target-branch: develop`. GitHub does not support non-default target
branches for Dependabot security-update PRs, so the configuration keeps npm
security updates separate from routine dependency currency PRs and documents
that constraint. The OpenSSF Scorecard workflow adds supply-chain posture
checks for branch protection, dependency update tooling, pinned actions,
security policy, token permissions, and similar repository-level practices.

The validation workflows do not publish, release, deploy, or grant npm
trusted-publishing permissions.

## See Also

- [[tests/index|Commonloom Test Battery]]
- [[requirements/operational/quality-gates|Quality Gates]]
- [[requirements/operational/release-and-ci|Release And CI]]
- [[phase-2-ci-quality-gates|Phase 2 CI Quality Gates]]
