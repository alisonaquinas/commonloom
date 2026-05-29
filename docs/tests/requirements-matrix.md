---
title: Commonloom Requirements Test Matrix
tags:
  - commonloom
  - tests
  - requirements
  - traceability
status: active
updated: 2026-05-28
aliases:
  - Requirements Test Matrix
  - Test Traceability Matrix
---

# Commonloom Requirements Test Matrix

This matrix maps current Commonloom requirements to the current test and
verification battery.

> [!NOTE] Reading The Matrix
> `Covered` means there is current executable evidence. `Verified` means the
> current quality gate or CI configuration checks the process requirement.
> `Partial` means evidence exists but does not cover the full requirement.
> `Gap` means no current automated test or verification directly proves the
> requirement.

## Evidence Catalog

| Evidence | Type | Source |
| --- | --- | --- |
| UT-CORE-001 | Unit | [content-pipeline-core.test.ts](../../test/content-pipeline-core.test.ts), `exports a non-destructive compiler entry point` |
| UT-CORE-002 | Unit | [content-pipeline-core.test.ts](../../test/content-pipeline-core.test.ts), `exports stable diagnostics and source trace contracts` |
| UT-CORE-003 | Unit | [content-pipeline-core.test.ts](../../test/content-pipeline-core.test.ts), `keeps website route concepts behind adapter-owned callbacks` |
| UT-MD-001 | Unit | [content-pipeline-markdown.test.ts](../../test/content-pipeline-markdown.test.ts), `parses frontmatter, CommonMark headings, and GFM constructs` |
| UT-MD-002 | Unit | [content-pipeline-markdown.test.ts](../../test/content-pipeline-markdown.test.ts), `reports invalid frontmatter as diagnostics` |
| UT-MD-003 | Unit | [content-pipeline-markdown.test.ts](../../test/content-pipeline-markdown.test.ts), `reports malformed frontmatter as diagnostics without throwing` |
| UT-MD-004 | Unit | [content-pipeline-markdown.test.ts](../../test/content-pipeline-markdown.test.ts), `parses broad CommonMark and GFM constructs into mdast nodes` |
| UT-HTML-001 | Unit | [content-pipeline-html.test.ts](../../test/content-pipeline-html.test.ts), `allows safe inline HTML in rendered Markdown` |
| UT-HTML-002 | Unit | [content-pipeline-html.test.ts](../../test/content-pipeline-html.test.ts), `diagnoses and removes unsafe inline HTML` |
| UT-HTML-003 | Unit | [content-pipeline-html.test.ts](../../test/content-pipeline-html.test.ts), `creates source traces with stable content hashes` |
| UT-HTML-004 | Unit | [content-pipeline-html.test.ts](../../test/content-pipeline-html.test.ts), `keeps safe static inline HTML while sanitizing unsafe attributes` |
| UT-HTML-005 | Unit | [content-pipeline-html.test.ts](../../test/content-pipeline-html.test.ts), `diagnoses high-risk embed tags before sanitized output is returned` |
| UT-LINK-000 | Unit | [content-pipeline-links-media.test.ts](../../test/content-pipeline-links-media.test.ts), `classifies every supported link target kind before resolution` |
| UT-LINK-001 | Unit | [content-pipeline-links-media.test.ts](../../test/content-pipeline-links-media.test.ts), `extracts external links, internal links, wiki-links, and image references` |
| UT-LINK-004 | Unit | [content-pipeline-links-media.test.ts](../../test/content-pipeline-links-media.test.ts), `reports unsupported link schemes as unresolved diagnostics` |
| UT-LINK-002 | Unit | [content-pipeline-links-media.test.ts](../../test/content-pipeline-links-media.test.ts), `resolves wiki-links only through adapter callbacks` |
| UT-LINK-003 | Unit | [content-pipeline-links-media.test.ts](../../test/content-pipeline-links-media.test.ts), `validates local media paths, missing files, traversal, and alt text` |
| UT-LINK-005 | Unit | [content-pipeline-links-media.test.ts](../../test/content-pipeline-links-media.test.ts), `rejects unsupported media URI schemes before filesystem lookup` |
| UT-LINK-006 | Unit | [content-pipeline-links-media.test.ts](../../test/content-pipeline-links-media.test.ts), `keeps absolute and encoded traversal targets inside approved path rules` |
| UT-LINK-007 | Unit | [content-pipeline-links-media.test.ts](../../test/content-pipeline-links-media.test.ts), `reports link and image positions against the original Markdown source` |
| UT-LINK-008 | Unit | [content-pipeline-links-media.test.ts](../../test/content-pipeline-links-media.test.ts), `resolves internal links through adapter callbacks before reporting gaps` |
| UT-LINK-009 | Unit | [content-pipeline-links-media.test.ts](../../test/content-pipeline-links-media.test.ts), `rejects Windows drive and UNC roots that resolve outside the configured root` |
| INT-001 | Integration | [content-pipeline-integration.test.ts](../../test/content-pipeline-integration.test.ts), `compiles manifests through parse, render, links, media, and traces` |
| E2E-001 | E2E | [content-pipeline-e2e.test.ts](../../test/content-pipeline-e2e.test.ts), `compiles a fixture content tree into adapter-visible records` |
| EX-VERIFY | Verification | `npm run examples:verify` runs [verify-examples.mjs](../../scripts/verify-examples.mjs) to check published `commonloom@0.1.0` dependencies, shared substrate usage, and forbidden internal imports. |
| EX-BUILD | Verification | `npm run examples:build` builds the React, Vue, Svelte, Next.js, Angular, and Node examples from the shared content, SCSS, and asset substrate. |
| EX-CI | Verification | `.github/workflows/documentation-lint.yml` runs explicit `Verify examples` and `Build examples` steps on Node.js 24. |
| SEC-001 | Unit | [content-pipeline-security.test.ts](../../test/content-pipeline-security.test.ts), `rejects oversized frontmatter before schema validation` |
| SEC-002 | Unit | [content-pipeline-security.test.ts](../../test/content-pipeline-security.test.ts), `does not pollute object prototypes from hostile frontmatter keys` |
| SEC-003 | Unit | [content-pipeline-security.test.ts](../../test/content-pipeline-security.test.ts), `handles long wiki-link shaped input without runaway parsing` |
| SEC-004 | Unit | [content-pipeline-security.test.ts](../../test/content-pipeline-security.test.ts), `rejects symlinked media that resolves outside the approved root` |
| SEC-005 | Unit | [content-pipeline-security.test.ts](../../test/content-pipeline-security.test.ts), `rejects symlinked Markdown sources that resolve outside the copy root` |
| SEC-006 | Unit | [content-pipeline-security.test.ts](../../test/content-pipeline-security.test.ts), `enforces configured manifest and Markdown size limits` |
| VER-CHECK | Verification | `npm run check` runs docs lint, TypeScript lint, verification scripts, typecheck, build, `npm run examples:check`, and `npm run test:battery`. |
| VER-FORMAT | Verification | `npm run format:check` runs the root Markdown formatting/lint gate used by `npm run lint:docs`. |
| VER-BOUNDARY | Verification | [verify-boundaries.mjs](../../scripts/verify-boundaries.mjs) checks source boundaries, disallowed dependencies, exact dependency versions, and tracked generated outputs. |
| VER-TRACE | Verification | [verify-traceability.mjs](../../scripts/verify-traceability.mjs) checks requirements matrix completeness, duplicate matrix rows, stale requirement IDs, and BDD requirement links, including range notation. |
| VER-PROCESS | Verification | [verify-plan-process.mjs](../../scripts/verify-plan-process.mjs) checks phase ticket metadata, ticket indexes, ID uniqueness, terminal status evidence, and done-phase ticket closure. |
| VER-DOCS | Verification | `npm run lint:docs` runs root Markdown, Obsidian, and ADR lint. |
| VER-CI | Verification | `.github/workflows/documentation-lint.yml` runs Node.js 24, `npm ci --ignore-scripts`, lint, verification, typecheck, build, example verification, example builds, package dry-runs, unit, integration, and E2E test steps. |
| VER-QUALITY-CI | Verification | `.github/workflows/code-quality-sast.yml` runs dedicated static code quality inspection with docs lint, TypeScript lint, process verification, and typecheck. |
| VER-DEPENDENCY-REVIEW | Verification | `.github/workflows/code-quality-sast.yml` runs GitHub Dependency Review on pull requests and fails for moderate or higher advisory findings. |
| VER-NPM-AUDIT | Verification | `.github/workflows/code-quality-sast.yml` runs `npm audit --audit-level=moderate` after `npm ci --ignore-scripts`. |
| VER-CODEQL | Verification | `.github/workflows/code-quality-sast.yml` runs CodeQL JavaScript and TypeScript SAST with security-extended and security-and-quality queries. |
| VER-SEMGREP | Verification | `.github/workflows/code-quality-sast.yml` runs Semgrep Community Edition default and security-audit rules, uploads SARIF, and uses [.semgrepignore](../../.semgrepignore) only for imported sources, dependencies, and generated outputs. |
| VER-DEPENDABOT | Verification | [.github/dependabot.yml](../../.github/dependabot.yml) enables npm security updates plus npm and GitHub Actions version-update PRs with grouping, cooldown, labels, and git-flow `develop` targeting for routine updates. |
| VER-SCORECARD | Verification | [.github/workflows/supply-chain-scorecard.yml](../../.github/workflows/supply-chain-scorecard.yml) runs OpenSSF Scorecard with SARIF output and published results. |
| VER-SECURITY-META | Verification | [SECURITY.md](../../SECURITY.md) and [.github/CODEOWNERS](../../.github/CODEOWNERS) define vulnerability reporting expectations and repository-wide review ownership. |
| VER-ACTION-PIN | Verification | GitHub Actions workflow `uses:` entries are pinned to full commit SHAs with reviewed version comments. |
| REL-WORKFLOW | Verification | `.github/workflows/npm-publish.yml` runs Node.js 24 release dry-runs and reserves OIDC publish permissions for version-tag publish jobs. |
| REL-GUARD | Verification | [verify-release-tag.mjs](../../scripts/verify-release-tag.mjs) checks tag shape, package-version agreement, and exact `origin/main` head agreement before publish. |
| REL-DRYRUN | Verification | `npm run pack:dry-run`, `npm run publish:dry-run`, and `npm run publish:dry-run:ci` validate package contents and the npm publish payload. |
| DOC-PHASE | Documentation | Phase and ticket records under [[plans/phase-1-import-commonloom-package]], [[plans/phase-2-ci-quality-gates]], [[plans/phase-3-close-testing-gaps]], [[plans/phase-4-npm-trusted-publishing]], and [[plans/phase-5-audit-driven-hardening]]. |

## User Requirements

| Requirement | Current Evidence | Status | Gap Or Next Test |
| --- | --- | --- | --- |
| CLR-USER-001 | UT-MD-001, UT-HTML-001, E2E-001 | Covered | None for current core workflow. |
| CLR-USER-002 | UT-MD-001, UT-MD-004, UT-HTML-001 | Partial | Parser coverage includes the listed constructs; E2E semantic output remains open. |
| CLR-USER-003 | UT-MD-001 | Covered | None for current parser scope. |
| CLR-USER-004 | UT-MD-002, UT-MD-003, UT-HTML-002, UT-HTML-005, UT-LINK-002, UT-LINK-003, UT-LINK-004, UT-LINK-005, UT-LINK-008 | Covered | None for current diagnostic surface. |
| CLR-USER-005 | UT-HTML-003, UT-LINK-001 | Covered | None for current trace scope. |
| CLR-USER-010 | UT-CORE-003, UT-LINK-002 | Covered | None for current callback scope. |
| CLR-USER-011 | UT-MD-001, UT-MD-002, INT-001 | Partial | Frontmatter schemas are supported; manifest data schema validation is not implemented yet. |
| CLR-USER-012 | UT-CORE-001, UT-CORE-003, INT-001, E2E-001 | Covered | None for normalized record output. |
| CLR-USER-013 | UT-LINK-003, UT-LINK-005, UT-LINK-006, INT-001, E2E-001 | Covered | Adapter-specific bundler mapping remains outside core. |
| CLR-USER-014 | UT-CORE-003 | Partial | Add static forbidden-import verification. |
| CLR-USER-015 | EX-VERIFY, EX-BUILD, EX-CI | Covered | None for current React, Vue, Svelte, Next.js, Angular, and Node examples. |
| CLR-USER-020 | VER-DOCS, DOC-PHASE | Verified | None for documentation process. |
| CLR-USER-021 | VER-DOCS, VER-TRACE, DOC-PHASE | Partial | Matrix completeness is automated; source-evidence completeness remains manual. |
| CLR-USER-022 | UT-CORE-003, VER-DOCS | Partial | No automated API-to-ADR impact check exists. |
| CLR-USER-023 | VER-CHECK, VER-CI | Verified | Release validation remains future work. |

## Functional Requirements

| Requirement | Current Evidence | Status | Gap Or Next Test |
| --- | --- | --- | --- |
| CLR-FUNC-001 | UT-MD-001, UT-MD-004 | Covered | Add broader Markdown fixture cases as behavior grows. |
| CLR-FUNC-002 | UT-MD-001, UT-MD-004 | Covered | None for current GFM parser scope. |
| CLR-FUNC-003 | UT-MD-001, UT-HTML-003 | Covered | None for current heading scope. |
| CLR-FUNC-004 | UT-MD-001 | Covered | None. |
| CLR-FUNC-005 | UT-MD-002 | Covered | None for frontmatter schema validation. |
| CLR-FUNC-006 | UT-MD-003 | Covered | None. |
| CLR-FUNC-020 | UT-HTML-001, UT-HTML-004 | Partial | Needs E2E semantic HTML assertions for a full content workflow. |
| CLR-FUNC-021 | UT-HTML-001, UT-HTML-002 | Covered | None for current boolean policy. |
| CLR-FUNC-022 | UT-HTML-002, UT-HTML-004, UT-HTML-005 | Covered | None for current sanitizer policy. |
| CLR-FUNC-023 | UT-HTML-001, UT-HTML-004 | Covered | None for current allowlist. |
| CLR-FUNC-024 | UT-HTML-001, UT-HTML-002, UT-HTML-004, E2E-001 | Covered | None for current static HTML output. |
| CLR-FUNC-040 | UT-LINK-001, UT-LINK-007, UT-HTML-003 | Covered | None. |
| CLR-FUNC-041 | UT-LINK-000, UT-LINK-001 | Covered | None. |
| CLR-FUNC-042 | UT-LINK-002, UT-CORE-003 | Covered | None. |
| CLR-FUNC-043 | UT-LINK-003 | Covered | None for local existence checks. |
| CLR-FUNC-044 | UT-LINK-003, UT-LINK-005, UT-LINK-006, SEC-005 | Covered | None for current path and URI policy. |
| CLR-FUNC-045 | UT-LINK-003 | Covered | None. |
| CLR-FUNC-060 | UT-CORE-002, UT-MD-002, UT-HTML-002, UT-LINK-002, UT-LINK-003 | Covered | None for current diagnostics. |
| CLR-FUNC-061 | UT-CORE-002 | Covered | None. |
| CLR-FUNC-062 | UT-CORE-002, UT-HTML-003 | Covered | None. |
| CLR-FUNC-063 | UT-HTML-003 | Covered | None. |
| CLR-FUNC-064 | UT-MD-002, UT-MD-003, UT-HTML-002, UT-LINK-002, UT-LINK-003 | Covered | None for expected validation failures. |
| CLR-FUNC-080 | UT-CORE-001, UT-CORE-002, INT-001, E2E-001 | Covered | None for current compiled record shape. |
| CLR-FUNC-081 | UT-CORE-003, INT-001, E2E-001 | Covered | None for current manifest input. |
| CLR-FUNC-082 | UT-CORE-003, E2E-001 | Covered | Generated TypeScript remains absent from core output. |
| CLR-FUNC-083 | UT-CORE-001, INT-001, E2E-001 | Covered | None for current check-only compile flow. |
| CLR-FUNC-084 | UT-HTML-003, E2E-001 | Partial | Needs deterministic generated-output tests once adapters write files. |
| CLR-FUNC-085 | EX-BUILD, EX-VERIFY | Covered | None for current shared-content compatibility examples. |

## Technical Requirements

| Requirement | Current Evidence | Status | Gap Or Next Test |
| --- | --- | --- | --- |
| CLR-TECH-001 | UT-CORE-003, VER-BOUNDARY | Covered | None for current source boundary. |
| CLR-TECH-002 | UT-CORE-002, VER-CHECK | Covered | None for current entrypoint. |
| CLR-TECH-003 | UT-CORE-003, VER-BOUNDARY | Partial | Needs adapter package boundary tests once adapters exist. |
| CLR-TECH-004 | VER-DOCS, VER-BOUNDARY | Partial | Static scans cover source imports, but docs example review remains manual. |
| CLR-TECH-005 | VER-BOUNDARY | Partial | Generated-output tracking is checked, but adapter generation behavior does not exist yet. |
| CLR-TECH-006 | EX-VERIFY, EX-BUILD, VER-CI | Covered | None for current published-package example contract. |
| CLR-TECH-020 | VER-CHECK | Covered | None. |
| CLR-TECH-021 | UT-MD-001, UT-HTML-001, VER-CHECK | Covered | None for current dependencies. |
| CLR-TECH-022 | UT-MD-001, UT-LINK-001 | Partial | Static AST-use verification is not automated. |
| CLR-TECH-023 | UT-MD-002 | Covered | None for frontmatter schema boundary. |
| CLR-TECH-024 | VER-CHECK, VER-BOUNDARY | Covered | None for current dependency set. |
| CLR-TECH-025 | VER-BOUNDARY | Covered | No syntax-highlighting dependency is required by the core package. |
| CLR-TECH-040 | UT-CORE-002 | Covered | None. |
| CLR-TECH-041 | UT-CORE-002, INT-001, E2E-001 | Covered | None for current exported contracts. |
| CLR-TECH-042 | UT-CORE-003, INT-001, E2E-001 | Covered | None for current generic adapter data flow. |
| CLR-TECH-043 | UT-MD-002, UT-MD-003 | Partial | Manifest/config programmer-error boundaries are not tested. |
| CLR-TECH-044 | UT-CORE-002, UT-MD-001, UT-LINK-001 | Covered | None. |
| CLR-TECH-060 | SEC-003 | Partial | Long wiki-link input is covered; broader ReDoS review remains manual. |
| CLR-TECH-061 | SEC-001 | Partial | Oversized frontmatter is covered; YAML alias/depth limits remain future hardening. |
| CLR-TECH-062 | UT-LINK-003, UT-LINK-006, UT-LINK-009, SEC-005 | Covered | None for current canonicalization policy. |
| CLR-TECH-063 | SEC-004, SEC-005 | Covered | None for media or Markdown symlink escapes. |
| CLR-TECH-064 | SEC-002 | Covered | None for current frontmatter parsing path. |
| CLR-TECH-065 | SEC-001, SEC-003, SEC-006 | Covered | None for current configurable resource bounds. |

## Operational Requirements

| Requirement | Current Evidence | Status | Gap Or Next Test |
| --- | --- | --- | --- |
| CLR-OPS-001 | VER-CHECK, VER-FORMAT, VER-CI | Covered | None. |
| CLR-OPS-002 | UT-MD-001, UT-MD-002, UT-MD-004, UT-HTML-002, UT-HTML-004, UT-LINK-000, UT-LINK-001, UT-LINK-003, UT-CORE-002, UT-CORE-003, INT-001, E2E-001 | Covered | None for current core test surface. |
| CLR-OPS-003 | VER-CHECK, VER-CI | Covered | None. |
| CLR-OPS-004 | VER-BOUNDARY | Partial | Tracked generated output is checked; generated adapter output does not exist yet. |
| CLR-OPS-005 | VER-DOCS | Covered | None for current tooling. |
| CLR-OPS-006 | VER-CHECK | Covered | None for current pre-commit gate. |
| CLR-OPS-007 | VER-CHECK, VER-CI | Covered | None. |
| CLR-OPS-008 | DOC-PHASE | Partial | No automated guard prevents rule weakening. |
| CLR-OPS-009 | VER-CHECK, VER-CI | Covered | None. |
| CLR-OPS-010 | VER-CHECK, VER-CI, VER-QUALITY-CI | Covered | None. |
| CLR-OPS-011 | EX-VERIFY, EX-BUILD, EX-CI, VER-CHECK | Covered | None for current example compatibility battery. |
| CLR-OPS-012 | VER-QUALITY-CI | Covered | None. |
| CLR-OPS-013 | VER-CODEQL, VER-SEMGREP | Covered | None for current free SAST workflow. |
| CLR-OPS-014 | VER-SEMGREP | Covered | The Vue example has one local suppression because Commonloom sanitizes `bodyHtml` before adapter rendering. |
| CLR-OPS-015 | VER-SCORECARD | Covered | None for current Scorecard workflow. |
| CLR-OPS-020 | VER-DOCS, VER-TRACE, DOC-PHASE | Partial | Matrix completeness is automated; source-evidence completeness remains manual. |
| CLR-OPS-021 | VER-DOCS | Covered | None for link/layout checks. |
| CLR-OPS-022 | VER-DOCS, VER-TRACE | Partial | Matrix completeness is automated; central requirements index semantics remain manual. |
| CLR-OPS-023 | VER-DOCS | Partial | ADR shape is checked; ADR impact detection is not automated. |
| CLR-OPS-024 | VER-DOCS | Covered | README commands are now verified by `package.json` and `npm run check`. |
| CLR-OPS-025 | VER-DOCS | Partial | Layout prose is manual; Obsidian lint catches links only. |
| CLR-OPS-026 | VER-DOCS, DOC-PHASE | Partial | Log entry completeness is manual. |
| CLR-OPS-027 | VER-DOCS, VER-TRACE | Covered | None for current wikilink and BDD requirement-link resolution. |
| CLR-OPS-040 | REL-WORKFLOW, REL-GUARD | Covered | `v0.1.0` release workflow verified the tag points at the current `origin/main` head before publishing. |
| CLR-OPS-041 | REL-WORKFLOW, REL-DRYRUN | Covered | `v0.1.0` release workflow rebuilt from source, ran the quality battery, dry-ran package contents, and published from CI. |
| CLR-OPS-042 | VER-CI | Covered | Current workflow has no path filters and runs full checks. |
| CLR-OPS-043 | VER-CI, REL-WORKFLOW | Covered | Validation and release workflows use scoped permissions; `v0.1.0` release workflow completed through the protected npm publish job. |
| CLR-OPS-044 | REL-WORKFLOW, REL-DRYRUN | Covered | Release workflow dry-run evidence exists in the `v0.1.0` GitHub Actions run. |
| CLR-OPS-045 | VER-CI | Covered | Current workflow uses Node.js 24. |
| CLR-OPS-046 | REL-WORKFLOW | Covered | `v0.1.0` published through the OIDC trusted-publishing workflow without long-lived npm tokens. |
| CLR-OPS-047 | VER-CI, DOC-PHASE | Partial | CI runs git-flow branches; no branch-name enforcement hook exists. |
| CLR-OPS-048 | VER-CI, DOC-PHASE | Covered | Current CI has no publish, release, or deployment step. |
| CLR-OPS-049 | VER-ACTION-PIN, VER-CI | Covered | None for current workflow action pinning. |
| CLR-OPS-060 | VER-BOUNDARY | Covered | Dependencies use exact package versions and are checked by `npm run verify`. |
| CLR-OPS-061 | VER-CI | Covered | CI uses `npm ci --ignore-scripts`. |
| CLR-OPS-062 | VER-CI | Covered | CI uses `npm ci --ignore-scripts`. |
| CLR-OPS-063 | VER-DEPENDENCY-REVIEW, VER-NPM-AUDIT | Partial | Automated advisory checks exist; manual reviewer sign-off remains a process obligation. |
| CLR-OPS-064 | REL-WORKFLOW | Covered | `v0.1.0` published through the configured npm trusted publisher. |
| CLR-OPS-065 | REL-DRYRUN | Covered | `v0.1.0` release workflow produced package dry-run evidence before publishing. |
| CLR-OPS-066 | REL-WORKFLOW | Covered | `v0.1.0` relied on npm trusted publishing rather than manually injected credentials. |
| CLR-OPS-067 | VER-NPM-AUDIT | Covered | None for current npm advisory audit gate. |
| CLR-OPS-068 | VER-DEPENDENCY-REVIEW | Covered | None for current pull-request dependency review gate. |
| CLR-OPS-069 | VER-DEPENDABOT | Covered | None for current npm and GitHub Actions version-update configuration. |
| CLR-OPS-070 | VER-DEPENDABOT | Covered | None for current npm security-update configuration. |
| CLR-OPS-071 | VER-CI, VER-QUALITY-CI, REL-WORKFLOW, VER-SCORECARD | Covered | None for current checkout credential persistence policy. |
| CLR-OPS-072 | VER-SECURITY-META | Covered | Private vulnerability reporting must still be enabled in repository settings for the preferred GitHub flow to appear. |
| CLR-OPS-080 | DOC-PHASE | Partial | Process requirement is documented; no automated phase-order check exists. |
| CLR-OPS-081 | DOC-PHASE | Partial | Ownership is manual in phase records. |
| CLR-OPS-082 | VER-PROCESS, DOC-PHASE | Partial | Ticket metadata is schema-checked; lifecycle order remains reviewer judgment. |
| CLR-OPS-083 | DOC-PHASE | Partial | No automated red-first enforcement exists. |
| CLR-OPS-084 | DOC-PHASE | Partial | Sweep ticketing is manual. |
| CLR-OPS-085 | VER-PROCESS, DOC-PHASE | Partial | Done phases cannot keep open tickets; in-review closeout timing remains manual. |
| CLR-OPS-086 | DOC-PHASE | Partial | Gate order is manual. |
| CLR-OPS-087 | DOC-PHASE | Partial | CI evidence is recorded manually. |
| CLR-OPS-088 | DOC-PHASE | Partial | Retrospectives are manual. |
| CLR-OPS-089 | DOC-PHASE | Partial | Process update discipline is manual. |
| CLR-OPS-090 | VER-DOCS, VER-PROCESS, DOC-PHASE | Covered | Phase and ticket layout are checked. |
| CLR-OPS-091 | VER-DOCS, VER-PROCESS, DOC-PHASE | Covered | Ticket indexes must include existing phase tickets. |
| CLR-OPS-092 | VER-DOCS | Partial | Wikilinks resolve; roadmap target semantics are manual. |
| CLR-OPS-093 | VER-DOCS, VER-PROCESS | Covered | Obsidian lint resolves current phase links and process verification checks phase ticket links. |
| CLR-OPS-100 | DOC-PHASE | Partial | Ticket use is documented; no automated threshold check exists. |
| CLR-OPS-101 | VER-PROCESS, DOC-PHASE | Covered | Ticket IDs are checked against filenames and duplicate IDs are rejected. |
| CLR-OPS-102 | VER-PROCESS, DOC-PHASE | Covered | Required ticket metadata is checked. |
| CLR-OPS-103 | DOC-PHASE | Partial | Trace links are manual. |
| CLR-OPS-104 | DOC-PHASE | Partial | Atomicity is reviewer judgment. |
| CLR-OPS-105 | DOC-PHASE | Partial | Red-green flow is manual. |
| CLR-OPS-106 | Gap | Gap | No bug tickets exist to verify lifecycle. |
| CLR-OPS-107 | Gap | Gap | No spike tickets exist to verify lifecycle. |
| CLR-OPS-108 | VER-PROCESS, DOC-PHASE | Partial | Chore metadata is checked; lifecycle movement remains manual. |
| CLR-OPS-109 | VER-PROCESS, DOC-PHASE | Partial | Terminal status log evidence is checked; append-only discipline remains manual. |
| CLR-OPS-110 | VER-PROCESS, DOC-PHASE | Partial | Terminal status/log agreement is checked; active-state transitions remain manual. |
| CLR-OPS-111 | Gap | Gap | No blocked-ticket example or checker exists. |
| CLR-OPS-112 | VER-PROCESS, DOC-PHASE | Partial | Terminal ticket evidence is checked; CI evidence content remains manual. |
| CLR-OPS-113 | VER-PROCESS, DOC-PHASE | Covered | Current phase tickets follow the checked layout. |
| CLR-OPS-114 | VER-PROCESS, DOC-PHASE | Covered | Current phase ticket IDs are unique. |
| CLR-OPS-115 | VER-DOCS | Covered | Ticket Markdown is linted by `npm run lint:docs`. |
| CLR-OPS-116 | VER-DOCS | Covered | Markdown lint catches current spacing/readability failures. |
| CLR-OPS-117 | DOC-PHASE | Partial | Commit discipline is manual. |
| CLR-OPS-118 | DOC-PHASE | Partial | Commit discipline is manual. |

## Gap Summary

Clear untested areas:

- generated-output reproducibility checks for future adapters
- broader parser hardening for YAML aliases and depth
- automated checks for phase order, commit discipline, CI evidence semantics,
  and source-evidence completeness

[[plans/phase-3-close-testing-gaps|Phase 3]] closed the first testability gaps.
Remaining gaps should be converted into later roadmap phases or explicitly
deferred when they are outside the core package boundary.

[[plans/phase-4-npm-trusted-publishing|Phase 4]] records completed bootstrap
publishing, trusted publisher setup, and the successful `v0.1.0` trusted
publishing workflow. The release workflow run provides remote release dry-run
and trusted-publish evidence for the first standalone release.

## See Also

- [[tests/index|Commonloom Test Battery]]
- [[plans/phase-3-close-testing-gaps|Phase 3 Close Testing Gaps]]
- [[tests/unit/index|Unit Tests]]
- [[tests/verification/index|Verification]]
- [[tests/validation/index|Validation]]
- [[Commonloom Requirements]]
