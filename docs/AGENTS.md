# AGENTS.md - Guide for AI Agents Working in `docs/`

`docs/` is an Obsidian vault that maintains the evolving Commonloom wiki from
raw source imports and synthesized, well-linked notes.

## Layout

```text
docs/
├── .obsidian/        # Shared vault settings safe to commit
├── AGENTS.md         # This file
├── adr.md            # Commonloom ADR index
├── index.md          # Content-oriented wiki catalog
├── log.md            # Chronological maintenance log
├── adr/              # MADR-style architecture decision records
├── concepts/         # Entity and concept notes
├── architecture/     # Architecture synthesis notes
├── ddd/              # Domain model, boundaries, and ubiquitous language
├── bdd/              # Actors and Cucumber-style behavior specifications
├── requirements/     # User, functional, technical, and operational requirements
├── plans/            # Phase plans, tickets, and migration synthesis notes
└── sources/          # Immutable source imports
```

Update this layout when vault directories are added, removed, or renamed.

## LLM Wiki Style

Follow the LLM-maintained wiki pattern described by
<https://gist.githubusercontent.com/karpathy/442a6bf555914893e9891c11519de94f/raw/ac46de1ad27f92b28ac95459c782c07f6b8c964a/llm-wiki.md>.

Use these local conventions:

- `sources/` is the raw source layer. Preserve imported files unless refreshing
  from the original source path.
- Topic folders are the wiki layer. They contain synthesized notes that agents
  maintain over time.
- This file is the schema layer. Update it when vault conventions change.
- `index.md` is the first page to read before answering vault questions.
- `log.md` is append-only and records imports, synthesis, lint passes, and
  major maintenance actions.

## Obsidian Markdown Rules

- Use wikilinks for internal vault links: `[[Commonloom]]`,
  `[[Commonloom Architecture]]`, `[[sources/index|Source Imports]]`.
- Use path-qualified wikilinks when duplicate filenames exist under
  `sources/`.
- Use frontmatter on durable notes with at least `title`, `tags`, `status`, and
  `updated`.
- Use aliases for common alternate names, especially imported phase or ADR
  names.
- Use callouts for evidence and risk notes:

```markdown
> [!NOTE] Evidence
> Source-backed summary here.
```

## Note Types

| Folder | Purpose |
| --- | --- |
| `adr/` | MADR-style architecture decision records and decision index. |
| `concepts/` | Core vocabulary, entities, and reusable ideas. |
| `architecture/` | System boundaries, flows, and module responsibility. |
| `ddd/` | Domain model, bounded contexts, context map, and ubiquitous language. |
| `bdd/` | Actor model, scenario catalog, and Cucumber-style behavior specifications. |
| `requirements/` | User, functional, technical, and operational requirements. |
| `plans/` | Phase plans, tickets, migration, roadmap, and execution synthesis. |
| `sources/` | Imported upstream Markdown kept as evidence. |

## Workflows

### Import A Source

1. Copy the upstream Markdown file into `sources/<origin>/<path>`.
2. Add it to `sources/index.md`.
3. Update any affected synthesized notes.
4. Add backlinks from the synthesized notes to the source import.
5. Append a `## [YYYY-MM-DD] import | ...` entry to `log.md`.

### Answer A Design Question

1. Read `index.md`.
2. Follow the relevant wikilinks into concept, architecture, requirements, ADR,
   or planning notes.
3. Check the linked source imports before making factual claims.
4. If the answer reveals durable knowledge, file it back into the right note and
   append `log.md`.

### Lint The Wiki

1. Look for orphan notes not linked from `index.md`.
2. Check for source imports with no synthesized note.
3. Check for stale claims contradicted by newer imports.
4. Add missing cross-links before adding new prose.
5. Append a `## [YYYY-MM-DD] lint | ...` entry to `log.md`.

## Invariants - Do Not Violate

- Synthesized notes must not silently invent behavior missing from source
  imports or local code.
- `sources/` files may retain upstream links and context; do not rewrite them
  into standalone docs.
- Prefer short, link-rich notes over long duplicated source excerpts.
- Keep Commonloom adapter-neutral unless a note is explicitly about the Flavor
  Grenade adapter.
- Use `Commonloom`, not `commonloon`, in durable note titles and prose.

## See Also

- [[index|Vault Index]]
- [[log|Vault Log]]
- [[sources/index|Source Imports]]
- [[adr|ADR Index]]
- [[Commonloom]]
- [[ddd/index|Commonloom DDD]]
- [[bdd/index|Commonloom BDD]]
- [[roadmap|Commonloom Roadmap]]
- [../AGENTS.md](../AGENTS.md) - repo-wide instructions
