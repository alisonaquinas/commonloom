---
title: Code Quality Audit
tags:
  - commonloom
  - audits
  - code-quality
  - phase-5
status: active
updated: 2026-05-11
aliases:
  - Commonloom Code Quality Audit
---

# Code Quality Audit

## Scope

Reviewed `src/`, `test/`, `scripts/`, package configuration, and architecture
or requirements notes relevant to module boundaries, maintainability, coupling,
cohesion, SOLID/DRY risks, and testing design. This audit did not change source
code or run remediation.

## Prioritized Findings

| Priority | ID | Severity | Finding | Primary Evidence |
| --- | --- | --- | --- | --- |
| 1 | CQ-001 | High | Cross-drive absolute paths can bypass root confinement on Windows. | `src/paths.ts:51` |
| 2 | CQ-002 | Medium | Markdown parsing and rendering duplicate processor setup. | `src/markdown.ts:36`, `src/html.ts:77` |
| 3 | CQ-003 | Medium | Compiler entrypoint mixes I/O, orchestration, diagnostics, mutation, and validation. | `src/compiler.ts:52` |
| 4 | CQ-004 | Medium | Tests share persistent `node_modules/.tmp-*` paths. | `test/content-pipeline-links-media.test.ts:132` |
| 5 | CQ-005 | Low | Public diagnostic codes include currently unreachable categories. | `src/types.ts:68` |
| 6 | CQ-006 | Low | Frontmatter line offset calculation depends on brittle body substring lookup. | `src/frontmatter.ts:75` |

## Findings

### CQ-001 - High - Cross-Drive Absolute Paths Can Bypass Root Confinement

Phase 5 ticket:
[[plans/phase-5-audit-driven-hardening/TASK-005|TASK-005]].

**Evidence:** `resolveInsideRoot` builds a resolved path, then delegates to
`isInsideRoot` in `src/paths.ts:30` and `src/paths.ts:51`. The containment check
accepts any relative path that does not start with `..`:

- `src/paths.ts:31` resolves the trusted root.
- `src/paths.ts:32` resolves `input.target` under that root.
- `src/paths.ts:51` computes `relative(root, candidate)`.
- `src/paths.ts:54` accepts when the relative path does not start with `..`.

On Windows, `path.relative('C:\\root', 'D:\\escape.txt')` returns an absolute
`D:\\escape.txt` string, not a `..`-prefixed path. That means a target on another
drive can be treated as inside the root. Existing coverage checks same-drive
absolute traversal only in `test/content-pipeline-links-media.test.ts:209` and
does not cover cross-drive or UNC roots.

**Impact:** Media validation depends on this helper before filesystem lookup in
`src/media.ts:62`. A false positive here weakens the core path-confinement
abstraction and makes every caller rely on platform-specific behavior. It also
creates brittle confidence: tests pass while an important Windows-only edge case
is untested.

**Recommended Remediation:** Rework `isInsideRoot` to reject absolute relative
results and drive or UNC root mismatches explicitly. Use `path.isAbsolute`,
`path.parse(candidate).root`, and separator-aware `..` checks rather than
`startsWith('..')` alone. Add Windows-specific tests for different drive letters,
UNC paths, root equality, root siblings, and normal in-root paths.

### CQ-002 - Medium - Markdown Pipeline Configuration Is Duplicated

Phase 5 ticket:
[[plans/phase-5-audit-driven-hardening/TASK-006|TASK-006]].

**Evidence:** `src/markdown.ts:36` defines a `unified().use(remarkParse).use(remarkGfm)`
processor and parses into mdast at `src/markdown.ts:53`. Rendering then builds a
second parser stack in `src/html.ts:77` through `src/html.ts:89` using
`remarkParse`, `remarkGfm`, `remarkRehype`, optional `rehypeRaw`, sanitize, and
stringify.

**Impact:** Parser behavior can drift from renderer behavior as soon as a plugin,
option, or policy is added to one path but not the other. Source traces, links,
and headings come from the first parse tree, while HTML comes from a second parse
of `bodyMarkdown`. That is tolerable in a small package now, but it is a DRY and
maintainability risk for future Markdown extensions.

**Recommended Remediation:** Centralize Markdown processor construction behind a
shared factory or render from the already parsed tree. Add tests that would fail
if parser and renderer GFM support diverge, especially tables, task lists,
autolinks, and future extension points.

### CQ-003 - Medium - Compiler Entrypoint Has Mixed Responsibilities

Phase 5 ticket:
[[plans/phase-5-audit-driven-hardening/TASK-007|TASK-007]].

**Evidence:** `compileCommonloom` in `src/compiler.ts:31` directly handles empty
manifest behavior, path resolution, filesystem reads, Markdown parsing, HTML
rendering, source-trace assembly, link resolution, media validation, diagnostics
aggregation, and document output construction. The main loop at
`src/compiler.ts:52` through `src/compiler.ts:114` is especially coupled.
It also mutates trace data after creation at `src/compiler.ts:96` and
`src/compiler.ts:100`.

**Impact:** The compiler is the public entrypoint, so some orchestration belongs
there. The current shape still makes it harder to test or evolve individual
workflow steps such as manifest validation, alternate content loading, concurrent
compilation, or adapter-provided source content. The mutation of `sourceTrace`
after construction obscures whether traces represent raw extraction or resolved
state.

**Recommended Remediation:** Extract a smaller document compilation function that
accepts already loaded Markdown plus dependencies and returns an immutable result.
Keep filesystem loading as a thin wrapper. Prefer returning a new resolved trace
instead of mutating `sourceTrace.links` and `sourceTrace.images` after
`createSourceTrace`.

### CQ-004 - Medium - Tests Share Persistent Temporary Paths

Phase 5 ticket:
[[plans/phase-5-audit-driven-hardening/TASK-008|TASK-008]].

**Evidence:** Several tests write under fixed `node_modules/.tmp-commonloom-*`
locations:

- `test/content-pipeline-links-media.test.ts:132` creates
  `.tmp-commonloom-media` and does not clean it up.
- `test/content-pipeline-links-media.test.ts:209` reuses the same media root for
  path checks.
- `test/content-pipeline-integration.test.ts:19`,
  `test/content-pipeline-e2e.test.ts:19`, and
  `test/content-pipeline-security.test.ts:62` use fixed paths with cleanup before
  setup, but not after the test.

**Impact:** Fixed temp paths make tests more order-dependent and less safe under
parallel execution, interrupted runs, or repeated local runs. Stale files can
mask missing setup, and writing under `node_modules` also mixes test artifacts
with dependency-managed state.

**Recommended Remediation:** Use `mkdtemp(join(tmpdir(), 'commonloom-'))` or a
Vitest-managed temp helper per test. Clean up in `finally` or `afterEach`. Keep
test scratch data outside `node_modules`.

### CQ-005 - Low - Public Diagnostic Codes Include Unreachable Categories

Phase 5 ticket:
[[plans/phase-5-audit-driven-hardening/TASK-009|TASK-009]].

**Evidence:** `commonloomDiagnosticCodes` includes `MARKDOWN_INVALID` and
`MANIFEST_INVALID` in `src/types.ts:68` through `src/types.ts:79`. The public
surface test locks these values in `test/content-pipeline-core.test.ts:38`
through `test/content-pipeline-core.test.ts:51`. A repo search found no emitter
for either code outside the type list and that test.

**Impact:** Pre-release projects can carry planned contracts, but public codes
that are never emitted are a maintainability trap. Consumers may branch on
diagnostic categories that cannot occur, and future implementation work may feel
forced to preserve premature names rather than naming actual behavior.

**Recommended Remediation:** Before first standalone release, either remove
unimplemented diagnostic codes from the exported list or add the corresponding
manifest and Markdown validation behavior with tests. If they are placeholders,
document them as reserved and avoid treating them as active behavior.

### CQ-006 - Low - Frontmatter Line Offsets Use Brittle Substring Lookup

Phase 5 ticket:
[[plans/phase-5-audit-driven-hardening/TASK-010|TASK-010]].

**Evidence:** `parseFrontmatter` computes `contentIndex` with
`markdown.indexOf(file.content)` at `src/frontmatter.ts:75`, then derives
`contentStartLine` from that index at `src/frontmatter.ts:76`. Heading positions
depend on this offset in `src/markdown.ts:59` and `src/markdown.ts:77`.

**Impact:** This couples source-position accuracy to a string search for the
entire body. If the body prefix appears inside frontmatter, or if parser
normalization changes body text, `indexOf` can return the wrong occurrence or
fail back to line 1. That produces misleading heading line numbers and trace
data.

**Recommended Remediation:** Derive `contentStartLine` from the frontmatter
delimiter span or parser metadata instead of searching for the body. Add tests
where frontmatter contains strings that also appear at the beginning of the body,
with assertions for heading line numbers.

## Positive Observations

- Module boundaries are mostly cohesive: parser, renderer, links, media, paths,
  and trace helpers live in separate files and are exported deliberately through
  `src/index.ts`.
- Strict TypeScript, ESLint, exact dependency versions, and verification scripts
  are already wired through `package.json`.
- Tests cover unit, integration, end-to-end, and security-shaped behaviors, which
  gives remediation work a useful safety net.

## See Also

- [[audits/index|Commonloom Audits]]
- [[Commonloom Architecture]]
- [[requirements/technical/library-boundary|Library Boundary Technical Requirements]]
- [[requirements/technical/security-validation|Security Validation Technical Requirements]]
- [[tests/index|Commonloom Test Battery]]
