---
title: Commonloom Verification
tags:
  - commonloom
  - tests
  - verification
status: active
updated: 2026-05-11
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
npm run lint && npm run verify && npm run typecheck && npm run build && npm run test:battery
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
| Unit tests | `npm run test:unit` | Five Vitest files, twenty-seven tests. |
| Integration tests | `npm run test:integration` | Public compiler integration flow. |
| E2E tests | `npm run test:e2e` | Fixture content tree compiled into adapter-visible records. |

`npm run verify` expands to:

```bash
node scripts/verify-boundaries.mjs && node scripts/verify-traceability.mjs && node scripts/verify-plan-process.mjs
```

## CI Shape

The GitHub Actions verification job uses Node.js 24, installs with
`npm ci --ignore-scripts`, and runs lint, verification, typecheck, build, unit,
integration, and E2E steps explicitly. The step sequence mirrors
`npm run check`.

The workflow is validation-only. It does not publish, release, deploy, or grant
npm trusted-publishing permissions.

## See Also

- [[tests/index|Commonloom Test Battery]]
- [[requirements/operational/quality-gates|Quality Gates]]
- [[requirements/operational/release-and-ci|Release And CI]]
- [[phase-2-ci-quality-gates|Phase 2 CI Quality Gates]]
