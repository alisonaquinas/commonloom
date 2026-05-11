---
title: Security Audit
tags:
  - commonloom
  - audits
  - security
  - phase-5
status: active
updated: 2026-05-11
aliases:
  - Phase 5 Security Audit
---

# Security Audit

Repository-wide audit of Commonloom on branch `feature/phase-5-audits`.
Scope covered `src/`, `test/`, `scripts/`, `.github/workflows/`,
`package.json`, `package-lock.json`, and security-relevant requirements and
release documentation.

> [!NOTE] Verification
> `npm audit --json` reported zero known vulnerabilities for the current
> lockfile on 2026-05-11. npm Trusted Publishing and GitHub Actions hardening
> checks were compared with current npm and GitHub documentation on
> 2026-05-11.

## Threat Model

Commonloom compiles Markdown, frontmatter, links, media references, and source
traces into adapter-owned records. The important trust boundaries are:

- Content authors and imported Markdown can control document text,
  frontmatter, links, image references, and manifest source paths.
- Adapters control roots, manifests, link resolution, and publication behavior.
- CI and release workflows install npm dependencies, build the package, and
  publish public npm artifacts through OIDC.
- The package promises filesystem confinement, sanitized HTML, parser safety,
  supply-chain controls, and adapter-neutral assembly.

## Finding: Markdown Source Symlinks Bypass `copyRoot` Confinement

- Severity: high
- Priority: P1
- Confidence: high
- CWE: CWE-22 Path Traversal
- Affected lines:
  - `src/compiler.ts:53`
  - `src/compiler.ts:67`
  - `src/paths.ts:30`
  - `src/media.ts:89`
  - `test/content-pipeline-security.test.ts:61`

### Symlink Evidence

`compileCommonloom` lexically confines each manifest path with
`resolveInsideRoot`, then reads the returned path directly:
`src/compiler.ts:53` to `src/compiler.ts:67`.

`resolveInsideRoot` only uses `path.resolve` and `path.relative`:
`src/paths.ts:30` to `src/paths.ts:55`. That blocks `../` and absolute
paths, but it does not canonicalize symlinks before the Markdown read.

Media validation has the missing control: it calls `realpath` on both the media
root and resolved media path before accepting the path:
`src/media.ts:89` to `src/media.ts:98`. The tests cover symlink escape only
for media: `test/content-pipeline-security.test.ts:61`.

### Symlink Impact

An attacker who can place or preserve a symlink inside `copyRoot` and influence
`manifest.sourcePath` can make Commonloom read Markdown from outside the
approved source root. The compiled `bodyHtml`, `frontmatter`, diagnostics, and
source trace can then expose or publish the outside file through the adapter.

This is most serious in CI, preview builds, documentation imports, or any
multi-author content workflow where content input is less trusted than the
build filesystem.

### Symlink Exploitability

Preconditions:

- The attacker can introduce a symlink or junction under `copyRoot`.
- The attacker can point a manifest entry at that symlink path.
- The adapter consumes or publishes Commonloom's compiled document output.

The media path proves the project already treats symlink escape as an in-scope
security boundary. The Markdown source path lacks the same protection.

### Symlink Recommended Remediation

Canonicalize Markdown sources before `readFile`.

- After lexical resolution, `realpath` both `config.copyRoot` and the resolved
  Markdown path.
- Re-run confinement against real paths before reading.
- Return `PATH_OUTSIDE_ROOT` if the real Markdown path escapes.
- Add a security test mirroring the media symlink test for `compileCommonloom`.
- Keep the lexical check first so missing files still produce useful
  diagnostics without following arbitrary outside paths.

## Finding: Markdown Compilation Has No Whole-Document Resource Bound

- Severity: medium
- Priority: P2
- Confidence: medium
- CWE: CWE-400 Uncontrolled Resource Consumption
- Affected lines:
  - `src/compiler.ts:67`
  - `src/frontmatter.ts:38`
  - `src/markdown.ts:53`
  - `src/html.ts:86`
  - `docs/requirements/technical/security-validation.md:22`

### Resource Bound Evidence

Frontmatter has a 64 KiB pre-parse cap:
`src/frontmatter.ts:12` and `src/frontmatter.ts:38`.

The full Markdown document does not have an equivalent bound. The compiler
reads the whole file into memory at `src/compiler.ts:67`, parses the full body
at `src/markdown.ts:53`, and renders the full body through the HTML processor
at `src/html.ts:86`.

The security requirements explicitly require bounded expensive compilation:
`docs/requirements/technical/security-validation.md:22`.

### Resource Bound Impact

A hostile or accidentally huge Markdown file can force large memory allocation,
deep parser work, large mdast/hast trees, and expensive sanitization/stringify
work. In CI this is partly contained by workflow timeouts, but local consumers
and adapter build processes can still crash, hang, or exhaust memory.

### Resource Bound Exploitability

Preconditions:

- The attacker can submit Markdown or generated content to a Commonloom build.
- The build processes that content before review or before a separate size
  policy is applied.

The current long wiki-link test exercises one large inline token, but it does
not cover total document size, many references, deeply nested constructs, or
large HTML rendering.

### Resource Bound Recommended Remediation

- Add configurable limits for Markdown bytes per document, manifest count,
  extracted references, and possibly rendered output size.
- Enforce the document byte limit before `readFile` or immediately after
  reading by using `stat` plus a post-read check.
- Emit a stable diagnostic such as `MARKDOWN_INVALID` or a new
  `MARKDOWN_TOO_LARGE`.
- Add tests for oversized Markdown body, many image/link references, and large
  inline HTML when `allowInlineHtml` is enabled.

## Finding: Unsafe Inline HTML Attributes Are Sanitized Without Diagnostics

- Severity: low
- Priority: P3
- Confidence: high
- CWE: CWE-79 Cross-Site Scripting
- Affected lines:
  - `src/html.ts:30`
  - `src/html.ts:64`
  - `src/html.ts:86`
  - `test/content-pipeline-html.test.ts:36`
  - `docs/requirements/functional/html-rendering.md:20`

### HTML Attribute Evidence

`findUnsafeHtml` only matches high-risk tag names:
`src/html.ts:30` to `src/html.ts:31`. Diagnostics are emitted only when that
tag-name regex matches: `src/html.ts:64` to `src/html.ts:75`.

The sanitizer does remove JavaScript URLs and event handlers during rendering:
`src/html.ts:86` to `src/html.ts:89`, and the test confirms removal at
`test/content-pipeline-html.test.ts:36` to `test/content-pipeline-html.test.ts:59`.

However, the same test does not expect a diagnostic for
`href="javascript:alert(1)"` or `onclick="alert(1)"`. This conflicts with the
HTML requirement that scripts, event handlers, JavaScript URLs, iframes, and
runtime embeds produce diagnostics:
`docs/requirements/functional/html-rendering.md:20`.

### HTML Attribute Impact

The rendered output is sanitized, so this is not currently a direct stored XSS
in `bodyHtml`. The security gap is fail-open signaling: adapters or CI gates
that block on `HTML_UNSAFE` diagnostics will miss malicious attributes and
JavaScript URLs because Commonloom silently strips them.

### HTML Attribute Exploitability

Preconditions:

- A consumer treats absence of diagnostics as a clean content record.
- A content author submits unsafe attributes or JavaScript URLs in allowed
  inline HTML.

The attacker does not get unsafe HTML through the current sanitizer, but can
avoid the audit signal intended by the documented policy.

### HTML Attribute Recommended Remediation

- Detect unsafe attributes and URL protocols before sanitization, or compare
  the pre-sanitize and post-sanitize HAST for removed risky properties.
- Emit `HTML_UNSAFE` for event handler attributes and blocked URL protocols.
- Add tests asserting diagnostics for `onclick`, `onerror`, `javascript:`,
  and unsafe `src` or `srcset` values.
- Keep `rehype-sanitize` as the output safety control.

## Finding: Release Workflows Use Mutable Action Tags in OIDC Publish Path

- Severity: medium
- Priority: P2
- Confidence: medium
- CWE: CWE-829 Inclusion of Functionality from Untrusted Control Sphere
- Affected lines:
  - `.github/workflows/documentation-lint.yml:28`
  - `.github/workflows/documentation-lint.yml:31`
  - `.github/workflows/documentation-lint.yml:37`
  - `.github/workflows/npm-publish.yml:68`
  - `.github/workflows/npm-publish.yml:73`
  - `.github/workflows/npm-publish.yml:80`
  - `.github/workflows/npm-publish.yml:94`

### Workflow Pinning Evidence

Both workflows pin GitHub-owned actions to version tags such as
`actions/checkout@v6.0.2`, `actions/setup-node@v6.4.0`, and
`actions/setup-python@v6.2.0`.

The publish job grants `id-token: write` at
`.github/workflows/npm-publish.yml:62` to `.github/workflows/npm-publish.yml:64`
and runs `npm publish` at `.github/workflows/npm-publish.yml:94`.

Current GitHub Actions hardening guidance says full-length commit SHA pinning
is the only immutable action reference. npm Trusted Publishing documentation
confirms `id-token: write` is the critical OIDC permission and that trusted
publishing automatically emits provenance for public packages when correctly
configured.

### Workflow Pinning Impact

If an action tag is moved or an upstream action release is compromised, the
release job can execute unexpected code in the same job that later obtains an
OIDC token and publishes to npm. The current actions are first-party GitHub
actions, which lowers likelihood, but the release path has package distribution
impact.

### Workflow Pinning Exploitability

Preconditions:

- A referenced action tag resolves to malicious or compromised code.
- A release tag triggers the publish workflow.
- The npm trusted publisher is configured for this repository and workflow.

This is a supply-chain hardening issue, not evidence that the current workflow
is compromised.

### Workflow Pinning Recommended Remediation

- Pin every action in release and validation workflows to a reviewed
  full-length commit SHA.
- Add Dependabot updates for GitHub Actions so SHA pins remain maintainable.
- Require review for changes under `.github/workflows/`.
- Confirm npm package settings disallow legacy publish tokens after trusted
  publishing is proven.
- Keep the current job-level `id-token: write` scoping; it is correctly limited
  to the publish job.

## Coverage Closure

| Area | Disposition | Evidence |
| --- | --- | --- |
| Media symlink confinement | Covered, no new finding | `src/media.ts:89` canonicalizes media paths and `test/content-pipeline-security.test.ts:61` covers symlink escape. |
| Lexical path traversal | Covered for direct `../` and absolute paths | `src/paths.ts:30` rejects lexical escapes and `test/content-pipeline-links-media.test.ts:209` covers absolute targets. |
| Prototype pollution | No direct finding | `parseFrontmatter` returns parsed data and does not merge it into privileged objects; `test/content-pipeline-security.test.ts:33` covers `__proto__`. Add constructor/prototype regression tests if adapters later merge returned data. |
| Dependency advisories | No current finding | `npm audit --json` reported zero vulnerabilities for 345 total dependencies. |
| Workflow secrets | No direct finding | Workflows use `permissions: contents: read`, no long-lived npm token is present, installs use `npm ci --ignore-scripts`, and OIDC is scoped to the publish job. |
| Script command injection | No direct finding | Scripts use fixed `execFileSync` commands and arguments; the one Windows `shell: true` path in `scripts/npm-ci-publish-dry-run.mjs:24` uses constant arguments. |

## Remediation Order

1. Fix Markdown source symlink confinement before release.
2. Add document-level resource limits before accepting broad untrusted content.
3. Pin GitHub Actions to SHAs before enabling live npm publication.
4. Add unsafe-attribute HTML diagnostics to match the documented policy.
