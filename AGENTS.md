# AGENTS.md - Guide for AI Agents Working in `commonloom/`

Standalone Commonloom repository scaffold with root package docs and an
Obsidian-style knowledge vault under `docs/`.

## Layout

```text
commonloom/
├── AGENTS.md          # Repo-wide agent instructions
├── README.md          # Public project overview
├── CHANGELOG.md       # Release notes
├── CONTRIBUTING.md    # Contribution rules
├── LICENSE.md         # MIT license
└── docs/              # Obsidian vault for Commonloom design knowledge
```

Update this layout when top-level files or directories are added, removed, or
renamed.

## Workflows

### Updating Project Documentation

1. Read the current file and any linked source evidence first.
2. Keep claims tied to implemented code or imported sources.
3. Update `docs/index.md` when adding a new durable vault page.
4. Update `docs/log.md` for imports, synthesis passes, and major decisions.
5. Keep root docs short and public; keep deeper synthesis in `docs/`.

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
- Do not document package commands until this repository actually defines them.
- Do not claim Commonloom has a stable public API until source and tests exist
  in this repository.
- Do not move Flavor Grenade route, renderer, or product-specific behavior into
  Commonloom design notes as reusable core behavior.
- Keep `docs/AGENTS.md` authoritative for vault-local wiki conventions.

## See Also

- [docs/index.md](docs/index.md) - Commonloom vault index
- [docs/AGENTS.md](docs/AGENTS.md) - vault-local instructions
- [README.md](README.md) - public overview
- [CONTRIBUTING.md](CONTRIBUTING.md) - contribution rules
