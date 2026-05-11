---
title: Documentation Audit
tags:
  - commonloom
  - audits
  - documentation
  - phase-5
status: active
updated: 2026-05-11
aliases:
  - Documentation Audit
  - Phase 5 Documentation Audit
---

# Documentation Audit

Audit date: 2026-05-11.

Scope covered root Markdown, `docs/` vault Markdown, source and test README
files, phase and ticket documents, frontmatter, Obsidian wikilinks, and current
local/GitHub/npm state.

## Repository State Checked

- Branch: `feature/phase-5-audits`.
- Local `HEAD`: `2a62b90840c891ae3e2350733a2da0f5f27f9315`.
- `HEAD` matches `origin/develop` after `git fetch --all --prune`.
- `origin/main` is `181378912b9ebe0aaad29df95f603bb506605da2`.
- GitHub default branch is `main`.
- No GitHub PR currently exists for `feature/phase-5-audits`.
- PR 10, `feature/phase-4-npm-trusted-publishing`, is merged to `develop`.
- `npm view commonloom version dist-tags --json` reports
  `commonloom@0.0.0` with `latest` set to `0.0.0`.

## Validation Checked

- `npm run verify` passes:
  boundary verification, traceability verification for 130 requirements, and
  plan process verification.
- `npm run lint:docs` fails in `lint:docs:obsidian` because
  `docs/audits/security-audit.md` has repeated heading text.

## Findings

### [High] Security audit file keeps documentation lint red

Phase 5 ticket:
[[plans/phase-5-audit-driven-hardening/TASK-014|TASK-014]].

References:

- `docs/audits/security-audit.md:103`
- `docs/audits/security-audit.md:116`
- `docs/audits/security-audit.md:123`
- `docs/audits/security-audit.md:135`
- `docs/audits/security-audit.md:159`
- `docs/audits/security-audit.md:175`
- `docs/audits/security-audit.md:182`
- `docs/audits/security-audit.md:193`
- `docs/audits/security-audit.md:217`
- `docs/audits/security-audit.md:233`
- `docs/audits/security-audit.md:241`
- `docs/audits/security-audit.md:252`

Evidence:

- A post-write `npm run lint:docs` run checks 106 files and reports 12 MD024
  errors in `docs/audits/security-audit.md`.
- The repeated headings are generic section titles such as `### Evidence`
  under multiple findings.
- The earlier missing audit-report wikilinks in `docs/audits/index.md` are no
  longer current because the other audit files now exist.

Impact:

- The repository documentation gate remains red.
- Audit reports cannot be merged with the configured docs gate until repeated
  headings are made unique or the lint rule is configured differently.

Recommended remediation:

- Rename repeated subsection headings to include the finding context, or nest
  the repeated labels as list items instead of headings.
- Re-run `npm run lint:docs` after updating the security audit report.

### [High] Phase 5 has started without phase or ticket records

Phase 5 ticket:
[[plans/phase-5-audit-driven-hardening/TASK-015|TASK-015]].

References:

- `docs/audits/index.md:16`
- `docs/roadmap.md:21`
- `docs/roadmap.md:24`
- `docs/requirements/operational/phase-execution.md:38`
- `docs/requirements/operational/phase-execution.md:39`
- `docs/requirements/operational/phase-execution.md:40`
- `docs/requirements/operational/task-management.md:41`
- `docs/requirements/operational/task-management.md:45`

Evidence:

- `docs/audits/index.md` says Phase 5 starts with independent audits.
- Current branch is `feature/phase-5-audits`.
- `docs/roadmap.md` lists only Phases 1 through 4.
- There is no `docs/plans/phase-5-*.md` summary or
  `docs/plans/phase-5-*/index.md` ticket index.
- Operational requirements require implementation phases to use the Commonloom
  phase plan layout and require active ticket files beside a phase ticket
  index.

Impact:

- Phase/ticket state is incomplete for current audit work.
- Future reviewers cannot trace audit ownership, status, blockers,
  verification, or closeout evidence through the documented process.
- The current plan verifier passes because it only scans existing
  `docs/plans/phase-*` directories; it does not detect a phase implied outside
  `docs/plans/`.

Recommended remediation:

- Add a Phase 5 plan summary and ticket index, or explicitly document why audit
  work is outside the phase process.
- Link Phase 5 from `docs/roadmap.md`.
- Add tickets for each audit stream or one owning audit feature with scoped
  task tickets.
- Consider extending `scripts/verify-plan-process.mjs` so roadmap and audit
  phase claims cannot drift from `docs/plans/`.

### [Medium] Root README has stale npm bootstrap next step

Phase 5 ticket:
[[plans/phase-5-audit-driven-hardening/TASK-016|TASK-016]].

References:

- `README.md:64`
- `README.md:69`
- `README.md:113`
- `README.md:117`
- `docs/release.md:20`
- `docs/release.md:23`

Evidence:

- README status says the initial `0.0.0` npm package exists and trusted
  publishing is ready for workflow validation.
- README next steps still say to complete the one-time bootstrap publish and
  configure trusted publishing.
- `npm view commonloom version dist-tags --json` confirms
  `commonloom@0.0.0` exists.
- `docs/release.md` also records the bootstrap package as existing and trusted
  publishing as user-reported configured.

Impact:

- New contributors get conflicting instructions about whether bootstrap and
  trusted publisher setup are pending or already done.
- The real next step is release workflow validation from GitHub Actions once
  the workflow is available from the default branch, not another bootstrap.

Recommended remediation:

- Replace the README next step with remote release dry-run validation and
  Phase 4 closeout evidence capture.
- Keep bootstrap instructions only in release history or runbook context.

### [Medium] Phase 4 acceptance checklist underreports metadata readiness

Phase 5 ticket:
[[plans/phase-5-audit-driven-hardening/TASK-016|TASK-016]].

References:

- `docs/plans/phase-4-npm-trusted-publishing.md:121`
- `docs/plans/phase-4-npm-trusted-publishing/TASK-001.md:44`
- `docs/plans/phase-4-npm-trusted-publishing/TASK-001.md:51`

Evidence:

- Phase 4 acceptance keeps "Package metadata is ready for public npm
  publication" unchecked.
- TASK-001 is `done` and records package metadata updates.
- `package.json` contains public package metadata, package files, exports,
  repository, bugs, homepage, keywords, side effects, and publish config.
- `commonloom@0.0.0` exists on npm, so at least bootstrap publication metadata
  was sufficient for public publication.

Impact:

- Phase 4 status looks less complete than ticket evidence and npm state show.
- Reviewers may spend time re-auditing metadata instead of focusing on the
  actual remaining blocker: authoritative release workflow dry-run evidence.

Recommended remediation:

- Mark the metadata acceptance criterion complete, or rewrite it to specify
  what metadata concern remains.
- Keep the GitHub Actions release dry-run evidence criterion open until that
  evidence exists.

### [Medium] Release runbook mixes completed bootstrap with future procedure

Phase 5 ticket:
[[plans/phase-5-audit-driven-hardening/TASK-016|TASK-016]].

References:

- `docs/release.md:20`
- `docs/release.md:23`
- `docs/release.md:40`
- `docs/release.md:56`

Evidence:

- The runbook note says `commonloom@0.0.0` exists.
- The next section says the first publish "must be performed" and gives active
  imperative steps for publishing `0.0.0`.

Impact:

- Operators may misread the one-time bootstrap section as still actionable.
- A repeat `npm publish` for `0.0.0` would fail because npm versions are
  immutable once published.

Recommended remediation:

- Retitle the section to "Bootstrap Publish Record" or mark it historical.
- Move repeatable future release steps under "Production Release" only.
- Preserve the original bootstrap steps as evidence, not as a current action.

### [Medium] Durable docs frontmatter does not consistently match vault schema

Phase 5 ticket:
[[plans/phase-5-audit-driven-hardening/TASK-017|TASK-017]].

References:

- `docs/AGENTS.md:1`
- `docs/adr/0001-keep-commonloom-adapter-neutral.md:1`
- `docs/adr/0001-keep-commonloom-adapter-neutral.md:7`
- `docs/AGENTS.md:35`

Evidence:

- `docs/AGENTS.md` says durable notes should have at least `title`, `tags`,
  `status`, and `updated`.
- `docs/AGENTS.md` has no frontmatter.
- ADR files under `docs/adr/` have MADR-style frontmatter, but lack the vault
  schema fields `title`, `tags`, and `updated`.
- The same pattern appears in ADR 0001 through ADR 0004.

Impact:

- Obsidian property views and future Dataview-style queries cannot treat all
  durable notes uniformly.
- ADR notes are valid as ADRs, but not fully valid as vault notes under the
  stated local convention.

Recommended remediation:

- Decide whether ADRs are exempt from the durable-note schema. If yes, document
  that exception in `docs/AGENTS.md`.
- Otherwise add `title`, `tags`, and `updated` to ADR frontmatter while
  preserving MADR fields.
- Add frontmatter to `docs/AGENTS.md` or document it as a schema-layer
  exception.

### [Low] Ticket frontmatter has mixed `phase` value types

Phase 5 ticket:
[[plans/phase-5-audit-driven-hardening/TASK-018|TASK-018]].

References:

- `docs/plans/phase-1-import-commonloom-package/TASK-001.md:7`
- `docs/plans/phase-2-ci-quality-gates/TASK-001.md:7`
- `docs/AGENTS.md:35`

Evidence:

- Phase 1 tickets use string values such as `phase: PHASE-001`.
- Phase 2 through Phase 4 tickets use numeric values such as `phase: 2`.
- The Obsidian frontmatter guidance says mixed property types break property
  consistency.

Impact:

- Queries and property views that group by `phase` may split phase IDs by type
  or require special-case normalization.
- The process verifier accepts both formats today, so the inconsistency can
  persist unnoticed.

Recommended remediation:

- Pick one canonical `phase` property type for tickets.
- Prefer a string if IDs like `PHASE-001` are part of the process model, or a
  number if roadmap phase numbers are the source of truth.
- Update the process verifier to enforce the chosen type.

### [Low] Vault index omits the audits hub

Phase 5 ticket:
[[plans/phase-5-audit-driven-hardening/TASK-015|TASK-015]].

References:

- `docs/index.md:24`
- `docs/index.md:41`
- `docs/audits/index.md:14`

Evidence:

- `docs/audits/index.md` exists and is a durable vault page.
- `docs/index.md` core notes table does not include `[[audits/index]]`.
- Repo instructions require updating `docs/index.md` when adding a durable
  vault page.

Impact:

- The vault entrypoint hides current audit work.
- Agents following the documented "start here" path may miss Phase 5 audit
  reports unless they search the filesystem.

Recommended remediation:

- Add `[[audits/index|Commonloom Audits]]` to `docs/index.md` once the audit
  hub is intended to remain durable.

### [Low] README API snapshot omits many exported public types

Phase 5 ticket:
[[plans/phase-5-audit-driven-hardening/TASK-019|TASK-019]].

References:

- `README.md:34`
- `README.md:57`
- `src/index.ts:24`
- `src/index.ts:48`

Evidence:

- README says the package currently exports the listed functions, then says
  core public types include eight types.
- `src/index.ts` exports additional public types, including
  `CommonloomDiagnosticCode`, `CommonloomHeading`, `CommonloomImageReference`,
  `CommonloomLinkKind`, `CommonloomLinkReference`,
  `CommonloomLinkResolution`, `CommonloomLinkResolverInput`,
  `CommonloomSeverity`, `ParsedFrontmatter`, `RenderMarkdownHtmlInput`,
  `RenderMarkdownHtmlResult`, `ExtractMarkdownReferencesResult`,
  `ResolvedLinkReferencesResult`, `ParsedMarkdown`, `ParseMarkdownInput`,
  `ValidateMediaReferenceOptions`, `ValidateMediaReferenceResult`,
  `ResolveInsideRootInput`, `ResolveInsideRootResult`, and
  `CreateSourceTraceInput`.

Impact:

- The snapshot is acceptable as a short overview, but ambiguous as an export
  list because it uses "currently exports" and then only partially enumerates
  type exports.
- Consumers may miss available typed helper contracts.

Recommended remediation:

- Clarify the README wording as a summary, or list all exports from
  `src/index.ts`.
- Consider generating an API reference before the first standalone release.

## Notes

- I did not edit docs outside this audit file.
- I treated `docs/sources/` imports as immutable evidence and did not require
  them to match current vault frontmatter conventions.
- The transient PowerShell `oh-my-posh` file-access message appeared during
  several commands, but the npm/git/gh command outputs used as evidence still
  completed.
