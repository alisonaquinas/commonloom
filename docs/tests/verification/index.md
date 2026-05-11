---
title: Commonloom Verification
tags:
  - commonloom
  - tests
  - verification
status: active
updated: 2026-05-10
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
npm run lint && npm run typecheck && npm run build && npm test
```

## Included Checks

| Check | Command | Current Scope |
| --- | --- | --- |
| Root Markdown lint | `npm run lint:docs:markdown` | Markdown files outside `docs/`, excluding `node_modules`. |
| Obsidian vault lint | `npm run lint:docs:obsidian` | Maintained vault notes under `docs/`, excluding raw `docs/sources/` imports. |
| ADR lint | `npm run lint:docs:adr` | MADR-style records under `docs/adr`. |
| TypeScript lint | `npm run lint` | `src/**/*.ts`, `test/**/*.ts`, and config files with warnings blocked. |
| Typecheck | `npm run typecheck` | TypeScript project check with no emit. |
| Build | `npm run build` | Distributable TypeScript build. |
| Unit tests | `npm test` | Four Vitest files, twelve tests. |

## CI Shape

The GitHub Actions verification job uses Node.js 24, installs with
`npm ci --ignore-scripts`, and runs `npm run check`.

It is validation-only for Phase 2. It does not publish, release, deploy, or
grant npm trusted-publishing permissions.

## See Also

- [[tests/index|Commonloom Test Battery]]
- [[requirements/operational/quality-gates|Quality Gates]]
- [[requirements/operational/release-and-ci|Release And CI]]
- [[phase-2-ci-quality-gates|Phase 2 CI Quality Gates]]
