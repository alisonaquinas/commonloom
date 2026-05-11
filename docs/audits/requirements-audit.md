---
title: Requirements Audit
tags:
  - commonloom
  - audits
  - requirements
  - phase-5
status: active
updated: 2026-05-11
aliases:
  - Requirements Audit
---

# Requirements Audit

Audit scope: [[Commonloom Requirements]],
[[tests/requirements-matrix|Requirements Test Matrix]], tests, verification
scripts, workflows, phase plans, roadmap, and source behavior.

Local verification evidence:

- `npm run verify` passed on 2026-05-11.
- The verification pass confirmed boundary, traceability, and plan-process
  scripts still pass for 130 requirements.
- Full `npm run check` was not run during this audit because it builds output
  outside `docs/audits/`.

## Findings

### REQ-AUDIT-001 - Unsafe Attribute Diagnostics Are Overstated

Severity: High

Requirement IDs: `CLR-FUNC-022`, `CLR-USER-004`

Evidence:

- [[requirements/functional/html-rendering|HTML Rendering]] requires scripts,
  event handlers, JavaScript URLs, iframes, and runtime embeds to produce
  diagnostics and not survive sanitized output.
- [[tests/requirements-matrix|Requirements Test Matrix]] marks
  `CLR-FUNC-022` as `Covered`.
- [src/html.ts](../../src/html.ts) diagnoses only tags matched by
  `unsafeHtmlPattern`.
- [test/content-pipeline-html.test.ts](../../test/content-pipeline-html.test.ts)
  verifies that `javascript:` and `onclick` are removed, but does not assert an
  `HTML_UNSAFE` diagnostic for those attributes.

Impact:

Authors may receive sanitized output without the required actionable diagnostic
for unsafe event handlers or JavaScript URLs. The matrix currently overstates
security and user-feedback evidence.

Recommended remediation:

- Add tests that require `HTML_UNSAFE` diagnostics for event handlers and
  JavaScript URLs.
- Update HTML scanning to detect those unsafe attributes before sanitization, or
  split `CLR-FUNC-022` into separate "removed" and "diagnosed" requirements.
- Mark `CLR-FUNC-022` as `Partial` until the diagnostic path is covered.

### REQ-AUDIT-002 - Broken Standard Internal Links Lack Evidence

Severity: High

Requirement IDs: `CLR-USER-004`, `CLR-FUNC-041`, `CLR-FUNC-042`

Evidence:

- [[requirements/user/content-authoring|Content Authoring]] requires actionable
  diagnostics for broken links.
- The matrix correctly notes `CLR-USER-004` is partial because broken standard
  internal links are not currently diagnosed.
- [src/links.ts](../../src/links.ts) passes non-wiki links through unchanged in
  `resolveLinkReferences`.
- Current tests cover unsupported schemes and unresolved wiki-links, not missing
  internal paths.

Impact:

The user-facing broken-link promise is broader than the implemented resolver.
Adapters may assume normal Markdown internal links are validated when they are
only classified.

Recommended remediation:

- Add an explicit requirement for adapter-owned resolution of standard internal
  links, or clarify that Commonloom only classifies them.
- Add tests for unresolved internal links if the requirement remains in scope.
- Keep `CLR-USER-004` partial until standard internal link behavior is either
  implemented or explicitly excluded.

### REQ-AUDIT-003 - Link And Image Source Positions Are Not Proven Source-Absolute

Severity: Medium

Requirement IDs: `CLR-FUNC-040`, `CLR-FUNC-062`, `CLR-USER-004`,
`CLR-USER-005`

Evidence:

- [[requirements/functional/links-and-media|Links And Media]] says compiled
  records include link and image references with source positions when
  available.
- [[requirements/user/content-authoring|Content Authoring]] says diagnostics
  include source position when available.
- [src/markdown.ts](../../src/markdown.ts) offsets heading lines by
  `contentStartLine`.
- [src/links.ts](../../src/links.ts) uses raw mdast positions for links,
  images, and wiki-links without applying the frontmatter offset.
- The matrix marks `CLR-FUNC-040` and `CLR-FUNC-062` as `Covered`.

Impact:

For Markdown with frontmatter, link and image diagnostics can point at body
relative lines instead of source-file lines. Traceability still exists, but line
evidence is weaker than the requirement implies.

Recommended remediation:

- Carry `contentStartLine` through `ParsedMarkdown` and apply it to extracted
  links and images.
- Add tests that assert source positions for headings, links, images, and
  related diagnostics in a frontmatter-bearing document.
- Mark affected trace rows as `Partial` until source-absolute positions are
  tested.

### REQ-AUDIT-004 - Format-Check Requirement Is Marked Covered Without A Format Script

Severity: Medium

Requirement IDs: `CLR-OPS-001`

Evidence:

- [[requirements/operational/quality-gates|Quality Gates]] requires package
  scripts for install, build, test, typecheck, lint, and format checks once
  source exists.
- [package.json](../../package.json) defines build, check, lint, typecheck, and
  test scripts, but no format or format-check script.
- The matrix marks `CLR-OPS-001` as `Covered` while its gap text says no format
  script exists.

Impact:

The quality-gate status is internally inconsistent. Reviewers may treat the
gate as complete while one named script family is absent.

Recommended remediation:

- Add a `format:check` script, or split the format requirement from the current
  source/test/build quality gate.
- Change `CLR-OPS-001` to `Partial` until the requirement wording and scripts
  agree.

### REQ-AUDIT-005 - BDD Requirement Ranges Are Not Fully Verified

Severity: Medium

Requirement IDs: `CLR-OPS-027`, `VER-TRACE`

Evidence:

- The matrix says `VER-TRACE` checks BDD requirement links.
- BDD files use ranges such as `CLR-USER-001..005` and
  `CLR-OPS-080..112`.
- [scripts/verify-traceability.mjs](../../scripts/verify-traceability.mjs)
  matches only `CLR-[A-Z]+-\d+`, so a range validates only its first ID.

Impact:

Stale or invalid IDs inside BDD ranges after the first ID are invisible to the
current verifier. The matrix claim is true for individually written IDs, not
for the range notation used by current BDD notes.

Recommended remediation:

- Expand range parsing in `verify-traceability.mjs`, or replace BDD ranges with
  explicit requirement IDs.
- Narrow the `VER-TRACE` catalog wording until range expansion is enforced.

### REQ-AUDIT-006 - Phase 4 Release Evidence Status Is Stale In Public Docs

Severity: Medium

Requirement IDs: `CLR-OPS-020`, `CLR-OPS-024`, `CLR-OPS-040`,
`CLR-OPS-046`, `CLR-OPS-064`

Evidence:

- [README.md](../../README.md) says the initial `0.0.0` package exists and
  trusted publishing is ready for validation.
- The same README still lists completing the one-time npm bootstrap publish and
  trusted publishing setup as expected next steps.
- [[plans/phase-4-npm-trusted-publishing|Phase 4]] records bootstrap and
  trusted publisher setup evidence.
- [[release|Release Operations]] also records the bootstrap package and
  user-reported trusted publisher setup.
- The matrix gap summary still lists manual npm bootstrap publishing and npm
  trusted publisher setup as clear untested areas, and `DOC-PHASE` still names
  only Phase 1 through Phase 3 as phase documentation evidence.

Impact:

Release operators and reviewers get conflicting status signals. Some remaining
gaps are real remote workflow evidence gaps, but bootstrap/setup evidence is no
longer in the same state as earlier matrix text implies.

Recommended remediation:

- Update README next steps to focus on release workflow validation, not
  bootstrap/setup completion.
- Update the matrix gap summary and `DOC-PHASE` catalog entry to include Phase
  4 evidence.
- Keep remote trusted-publisher workflow evidence rows partial until an actual
  release workflow run proves the end-to-end path.

## Split Or Clarify Candidates

- Split `CLR-FUNC-022` into sanitization, diagnostic reporting, and policy
  configurability if those are intended to mature independently.
- Split `CLR-USER-004` into diagnostics for frontmatter, HTML, media, unsafe
  paths, unsupported schemes, wiki-links, and standard internal links.
- Split `CLR-OPS-001` so format tooling can be tracked separately from the
  already implemented lint, typecheck, build, and test scripts.
- Clarify whether `CLR-FUNC-040` source positions must be source-file absolute
  after frontmatter stripping.

## Evidence Summary

Supported areas:

- Requirements matrix ID completeness is currently verified.
- Core boundary, dependency exactness, disallowed dependency checks, and
  generated-output tracking are automated.
- Current unit, integration, and E2E tests cover the main parser, renderer,
  media, trace, and adapter-neutral compile paths.

Highest-risk gaps:

- Unsafe HTML attribute diagnostics are weaker than the requirement.
- Standard internal link validation is not implemented.
- Trace position evidence is incomplete for frontmatter-bearing documents.
- Several operational status rows need wording/status cleanup rather than new
  code.
