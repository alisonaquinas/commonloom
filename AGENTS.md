# AGENTS.md - Guide for AI Agents Working in `commonloom/`

Standalone Commonloom repository with imported TypeScript package source,
behavior tests, quality gates, and an Obsidian-style knowledge vault under
`docs/`.

## Layout

```text
commonloom/
├── .config/           # Markdown lint configuration
├── .github/workflows/ # GitHub Actions validation
├── .githooks/         # Local pre-commit hooks
├── docs/              # Obsidian vault for Commonloom design knowledge
├── examples/          # Shared-content integration examples
├── scripts/           # Documentation validation helpers
├── src/               # Commonloom TypeScript source
├── test/              # Commonloom behavior tests
├── AGENTS.md          # Repo-wide agent instructions
├── README.md          # Public project overview
├── CHANGELOG.md       # Release notes
├── CONTRIBUTING.md    # Contribution rules
├── context7.json      # Context7 indexing metadata and scope
├── LICENSE.md         # MIT license
├── SECURITY.md        # Vulnerability reporting policy
├── package.json       # npm scripts and package metadata
└── tsconfig*.json     # TypeScript project configuration
```

Update this layout when top-level files or directories are added, removed, or
renamed.

## Workflows

### Validation

- Use Node.js 24 or newer.
- Run `npm ci` after dependency changes or a fresh clone.
- Run `npm run hooks:install` once per clone to enable the pre-commit gate.
- Run `npm run check` before committing or opening a PR.
- Use focused commands only while iterating: `npm run lint`,
  `npm run lint:docs`, `npm run typecheck`, `npm run build`, and `npm test`.
- Keep Phase 2 validation-only. Do not add release, deployment, package
  publishing, or npm trusted-publishing jobs unless a later phase owns that
  work.

### Branch Naming

- Use the repository git-flow names from `docs/requirements/operational/release-and-ci.md`.
- Long-lived branches are `main` and `develop`.
- Supporting branches must use `feature/<short-description>`,
  `release/<version>`, or `hotfix/<short-description>`.
- Do not create `codex/*` branches in this repository, even if external agent
  defaults suggest that prefix.

### Updating Project Documentation

1. Read the current file and any linked source evidence first.
2. Keep claims tied to implemented code or imported sources.
3. Keep root docs short and public.
4. Keep deeper synthesis in `docs/`.
5. Update `docs/index.md` when adding a new durable vault page.
6. Update `docs/log.md` for imports, synthesis passes, and major decisions.
7. Update `CHANGELOG.md` for user-visible changes.

### Importing Knowledge Into The Vault

1. Copy immutable source material into `docs/sources/`.
2. Create or update synthesized notes under `docs/concepts/`,
   `docs/architecture/`, `docs/requirements/`, `docs/adr/`, or `docs/plans/`.
3. Use Obsidian wikilinks between synthesized notes.
4. Link source evidence from each synthesized note.
5. Append the import to `docs/log.md`.

## Invariants - Do Not Violate

- Do not treat `docs/sources/` imports as editable project docs; they preserve
  source context from upstream repositories.
- Do not document package commands unless they exist in `package.json`.
- Do not claim Commonloom has a stable public API before the first standalone
  release.
- Do not move Flavor Grenade route, renderer, or product-specific behavior into
  Commonloom design notes as reusable core behavior.
- Keep `docs/AGENTS.md` authoritative for vault-local wiki conventions.
- Do not bypass lint warnings; configured warnings are blocking findings.
- Commit ticket status changes, workflow-log entries, blocker updates, and
  verification notes with the work that caused them, or before unrelated
  follow-on work starts.

## See Also

- [docs/index.md](docs/index.md) - Commonloom vault index
- [docs/AGENTS.md](docs/AGENTS.md) - vault-local instructions
- [README.md](README.md) - public overview
- [CONTRIBUTING.md](CONTRIBUTING.md) - contribution rules
