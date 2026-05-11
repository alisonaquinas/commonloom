---
title: Commonloom Requirements Test Matrix
tags:
  - commonloom
  - tests
  - requirements
  - traceability
status: active
updated: 2026-05-10
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
| VER-CHECK | Verification | `npm run check` runs docs lint, TypeScript lint, typecheck, build, and unit tests. |
| VER-DOCS | Verification | `npm run lint:docs` runs root Markdown, Obsidian, and ADR lint. |
| VER-CI | Verification | `.github/workflows/documentation-lint.yml` runs Node.js 24, `npm ci --ignore-scripts`, and `npm run check`. |
| DOC-PHASE | Documentation | Phase and ticket records under [[plans/phase-1-import-commonloom-package]] and [[plans/phase-2-ci-quality-gates]]. |

## User Requirements

| Requirement | Current Evidence | Status | Gap Or Next Test |
| --- | --- | --- | --- |
| CLR-USER-001 | UT-MD-001, UT-HTML-001 | Partial | Needs E2E compile from Markdown source to adapter-visible record. |
| CLR-USER-002 | UT-MD-001, UT-MD-004, UT-HTML-001 | Partial | Parser coverage includes the listed constructs; E2E semantic output remains open. |
| CLR-USER-003 | UT-MD-001 | Covered | None for current parser scope. |
| CLR-USER-004 | UT-MD-002, UT-MD-003, UT-HTML-002, UT-HTML-005, UT-LINK-002, UT-LINK-003, UT-LINK-004, UT-LINK-005 | Partial | Broken standard internal links are not currently diagnosed. |
| CLR-USER-005 | UT-HTML-003, UT-LINK-001 | Covered | None for current trace scope. |
| CLR-USER-010 | UT-CORE-003, UT-LINK-002 | Covered | None for current callback scope. |
| CLR-USER-011 | UT-MD-001, UT-MD-002 | Covered | Manifest schema validation is not implemented yet. |
| CLR-USER-012 | UT-CORE-001, UT-CORE-003 | Partial | Needs compiled record tests after adapter output is implemented. |
| CLR-USER-013 | UT-LINK-003, UT-LINK-005, UT-LINK-006 | Partial | Needs adapter asset mapping integration tests. |
| CLR-USER-014 | UT-CORE-003 | Partial | Add static forbidden-import verification. |
| CLR-USER-020 | VER-DOCS, DOC-PHASE | Verified | None for documentation process. |
| CLR-USER-021 | VER-DOCS, DOC-PHASE | Partial | No automated source-evidence completeness check exists. |
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
| CLR-FUNC-024 | UT-HTML-001, UT-HTML-002, UT-HTML-004 | Partial | Needs E2E static-rendering output check. |
| CLR-FUNC-040 | UT-LINK-001, UT-HTML-003 | Covered | None. |
| CLR-FUNC-041 | UT-LINK-000, UT-LINK-001 | Covered | None. |
| CLR-FUNC-042 | UT-LINK-002, UT-CORE-003 | Covered | None. |
| CLR-FUNC-043 | UT-LINK-003 | Covered | None for local existence checks. |
| CLR-FUNC-044 | UT-LINK-003, UT-LINK-005, UT-LINK-006 | Covered | None for current path and URI policy. |
| CLR-FUNC-045 | UT-LINK-003 | Covered | None. |
| CLR-FUNC-060 | UT-CORE-002, UT-MD-002, UT-HTML-002, UT-LINK-002, UT-LINK-003 | Covered | None for current diagnostics. |
| CLR-FUNC-061 | UT-CORE-002 | Covered | None. |
| CLR-FUNC-062 | UT-CORE-002, UT-HTML-003 | Covered | None. |
| CLR-FUNC-063 | UT-HTML-003 | Covered | None. |
| CLR-FUNC-064 | UT-MD-002, UT-MD-003, UT-HTML-002, UT-LINK-002, UT-LINK-003 | Covered | None for expected validation failures. |
| CLR-FUNC-080 | UT-CORE-001, UT-CORE-002 | Partial | `CommonloomCompiledDocument` is typed but compile output is not implemented. |
| CLR-FUNC-081 | UT-CORE-003 | Partial | Manifest entries are typed; manifest-driven compile behavior is not tested. |
| CLR-FUNC-082 | UT-CORE-003 | Partial | No generated TypeScript writer exists to assert adapter ownership directly. |
| CLR-FUNC-083 | UT-CORE-001 | Partial | Compiler scaffold returns diagnostics; real check-only compile flow is not implemented. |
| CLR-FUNC-084 | UT-HTML-003 | Partial | Needs deterministic generated-output tests once adapters write files. |

## Technical Requirements

| Requirement | Current Evidence | Status | Gap Or Next Test |
| --- | --- | --- | --- |
| CLR-TECH-001 | UT-CORE-003 | Partial | Add static forbidden-import verification for `src/`. |
| CLR-TECH-002 | UT-CORE-002, VER-CHECK | Covered | None for current entrypoint. |
| CLR-TECH-003 | UT-CORE-003 | Partial | Needs adapter package boundary tests once adapters exist. |
| CLR-TECH-004 | VER-DOCS | Partial | No automated scan for Flavor Grenade-specific examples exists. |
| CLR-TECH-005 | Gap | Gap | No generated-output behavior exists yet. |
| CLR-TECH-020 | VER-CHECK | Covered | None. |
| CLR-TECH-021 | UT-MD-001, UT-HTML-001, VER-CHECK | Covered | None for current dependencies. |
| CLR-TECH-022 | UT-MD-001, UT-LINK-001 | Partial | Static AST-use verification is not automated. |
| CLR-TECH-023 | UT-MD-002 | Covered | None for frontmatter schema boundary. |
| CLR-TECH-024 | VER-CHECK | Partial | Add dependency/import scan for disallowed Markdown compiler plugins. |
| CLR-TECH-025 | Gap | Gap | No optional syntax-highlighting boundary test exists. |
| CLR-TECH-040 | UT-CORE-002 | Covered | None. |
| CLR-TECH-041 | UT-CORE-002 | Covered | None for current exported contracts. |
| CLR-TECH-042 | UT-CORE-003 | Partial | Add compile-time generic adapter-data usage tests. |
| CLR-TECH-043 | UT-MD-002, UT-MD-003 | Partial | Manifest/config programmer-error boundaries are not tested. |
| CLR-TECH-044 | UT-CORE-002, UT-MD-001, UT-LINK-001 | Covered | None. |
| CLR-TECH-060 | Gap | Gap | No ReDoS or parser-sensitive regex test exists. |
| CLR-TECH-061 | Gap | Gap | No frontmatter size, alias, or resource-limit test exists. |
| CLR-TECH-062 | UT-LINK-003, UT-LINK-006 | Covered | None for current canonicalization policy. |
| CLR-TECH-063 | Gap | Gap | No symlink escape test exists. |
| CLR-TECH-064 | Gap | Gap | No prototype-pollution test exists. |
| CLR-TECH-065 | Gap | Gap | No pathological-input resource-bound test exists. |

## Operational Requirements

| Requirement | Current Evidence | Status | Gap Or Next Test |
| --- | --- | --- | --- |
| CLR-OPS-001 | VER-CHECK, VER-CI | Covered | No format script exists; requirement wording includes format checks. |
| CLR-OPS-002 | UT-MD-001, UT-MD-002, UT-MD-004, UT-HTML-002, UT-HTML-004, UT-LINK-000, UT-LINK-001, UT-LINK-003, UT-CORE-002, UT-CORE-003 | Partial | Adapter-output and full compiler flow tests are missing. |
| CLR-OPS-003 | VER-CHECK, VER-CI | Covered | None. |
| CLR-OPS-004 | Gap | Gap | No generated-output stale-file check exists. |
| CLR-OPS-005 | VER-DOCS | Covered | None for current tooling. |
| CLR-OPS-006 | VER-CHECK | Covered | None for current pre-commit gate. |
| CLR-OPS-007 | VER-CHECK, VER-CI | Covered | None. |
| CLR-OPS-008 | DOC-PHASE | Partial | No automated guard prevents rule weakening. |
| CLR-OPS-009 | VER-CHECK, VER-CI | Covered | None. |
| CLR-OPS-010 | VER-CHECK, VER-CI | Covered | None. |
| CLR-OPS-020 | VER-DOCS, DOC-PHASE | Partial | No automated source-evidence completeness check. |
| CLR-OPS-021 | VER-DOCS | Covered | None for link/layout checks. |
| CLR-OPS-022 | VER-DOCS | Partial | No automated requirements-index completeness check exists. |
| CLR-OPS-023 | VER-DOCS | Partial | ADR shape is checked; ADR impact detection is not automated. |
| CLR-OPS-024 | VER-DOCS | Covered | README commands are now verified by `package.json` and `npm run check`. |
| CLR-OPS-025 | VER-DOCS | Partial | Layout prose is manual; Obsidian lint catches links only. |
| CLR-OPS-026 | VER-DOCS, DOC-PHASE | Partial | Log entry completeness is manual. |
| CLR-OPS-027 | VER-DOCS | Covered | None for current wikilink resolution. |
| CLR-OPS-040 | Gap | Gap | No release workflow exists. |
| CLR-OPS-041 | Gap | Gap | No release workflow exists. |
| CLR-OPS-042 | VER-CI | Covered | Current workflow has no path filters and runs full checks. |
| CLR-OPS-043 | VER-CI | Partial | Validation workflow is least-privilege; release workflow does not exist. |
| CLR-OPS-044 | Gap | Gap | No test-tag release workflow exists. |
| CLR-OPS-045 | VER-CI | Covered | Current workflow uses Node.js 24. |
| CLR-OPS-046 | Gap | Gap | No npm publish workflow exists. |
| CLR-OPS-047 | VER-CI, DOC-PHASE | Partial | CI runs git-flow branches; no branch-name enforcement hook exists. |
| CLR-OPS-048 | VER-CI, DOC-PHASE | Covered | Current CI has no publish, release, or deployment step. |
| CLR-OPS-060 | Gap | Gap | Dependencies currently use ranges; no exact-version policy check exists. |
| CLR-OPS-061 | VER-CI | Covered | CI uses `npm ci --ignore-scripts`. |
| CLR-OPS-062 | VER-CI | Covered | CI uses `npm ci --ignore-scripts`. |
| CLR-OPS-063 | Gap | Gap | No advisory-review test or workflow exists. |
| CLR-OPS-064 | Gap | Gap | No npm publish workflow exists. |
| CLR-OPS-065 | Gap | Gap | No release artifact workflow exists. |
| CLR-OPS-066 | Gap | Gap | No npm publish workflow exists. |
| CLR-OPS-080 | DOC-PHASE | Partial | Process requirement is documented; no automated phase-order check exists. |
| CLR-OPS-081 | DOC-PHASE | Partial | Ownership is manual in phase records. |
| CLR-OPS-082 | DOC-PHASE | Partial | Ticket lifecycle states are documented; no schema validation exists. |
| CLR-OPS-083 | DOC-PHASE | Partial | No automated red-first enforcement exists. |
| CLR-OPS-084 | DOC-PHASE | Partial | Sweep ticketing is manual. |
| CLR-OPS-085 | DOC-PHASE | Partial | No automated check ensures all tickets are terminal before phase close. |
| CLR-OPS-086 | DOC-PHASE | Partial | Gate order is manual. |
| CLR-OPS-087 | DOC-PHASE | Partial | CI evidence is recorded manually. |
| CLR-OPS-088 | DOC-PHASE | Partial | Retrospectives are manual. |
| CLR-OPS-089 | DOC-PHASE | Partial | Process update discipline is manual. |
| CLR-OPS-090 | VER-DOCS, DOC-PHASE | Partial | Layout exists; no schema check enforces it. |
| CLR-OPS-091 | VER-DOCS, DOC-PHASE | Partial | Ticket indexes exist for active phases; no completeness checker exists. |
| CLR-OPS-092 | VER-DOCS | Partial | Wikilinks resolve; roadmap target semantics are manual. |
| CLR-OPS-093 | VER-DOCS | Covered | Obsidian lint resolves current phase plan links. |
| CLR-OPS-100 | DOC-PHASE | Partial | Ticket use is documented; no automated threshold check exists. |
| CLR-OPS-101 | DOC-PHASE | Partial | Current IDs are stable; no uniqueness checker exists. |
| CLR-OPS-102 | DOC-PHASE | Partial | Metadata exists; no ticket schema validator exists. |
| CLR-OPS-103 | DOC-PHASE | Partial | Trace links are manual. |
| CLR-OPS-104 | DOC-PHASE | Partial | Atomicity is reviewer judgment. |
| CLR-OPS-105 | DOC-PHASE | Partial | Red-green flow is manual. |
| CLR-OPS-106 | Gap | Gap | No bug tickets exist to verify lifecycle. |
| CLR-OPS-107 | Gap | Gap | No spike tickets exist to verify lifecycle. |
| CLR-OPS-108 | DOC-PHASE | Partial | Chore lifecycle is documented but not schema-checked. |
| CLR-OPS-109 | DOC-PHASE | Partial | Logs are append-only by convention; no automated check exists. |
| CLR-OPS-110 | DOC-PHASE | Partial | Status/log agreement is manual. |
| CLR-OPS-111 | Gap | Gap | No blocked-ticket example or checker exists. |
| CLR-OPS-112 | DOC-PHASE | Partial | Closure evidence is present in phase tickets; no checker exists. |
| CLR-OPS-113 | DOC-PHASE | Partial | Current phase tickets follow layout; no checker exists. |
| CLR-OPS-114 | DOC-PHASE | Partial | Current phase IDs are unique; no checker exists. |
| CLR-OPS-115 | VER-DOCS | Covered | Ticket Markdown is linted by `npm run lint:docs`. |
| CLR-OPS-116 | VER-DOCS | Covered | Markdown lint catches current spacing/readability failures. |
| CLR-OPS-117 | DOC-PHASE | Partial | Commit discipline is manual. |
| CLR-OPS-118 | DOC-PHASE | Partial | Commit discipline is manual. |

## Gap Summary

Clear untested areas:

- manifest-driven compilation and adapter-visible compiled records
- dedicated integration and end-to-end suites
- release, npm publishing, provenance, and test-tag workflows
- generated-output reproducibility checks
- security hardening tests for ReDoS, bounded frontmatter, symlink escapes,
  prototype pollution, and pathological inputs
- automated process checks for phase order, ticket schemas, ticket status/log
  agreement, ticket ID uniqueness, and source-evidence completeness

[[plans/phase-3-close-testing-gaps|Phase 3]] contains the planned tickets for
closing or explicitly deferring these gaps.

## See Also

- [[tests/index|Commonloom Test Battery]]
- [[plans/phase-3-close-testing-gaps|Phase 3 Close Testing Gaps]]
- [[tests/unit/index|Unit Tests]]
- [[tests/verification/index|Verification]]
- [[tests/validation/index|Validation]]
- [[Commonloom Requirements]]
