---
title: Phase Execution Operational Requirements
tags:
  - commonloom
  - requirements/operational
  - phases
  - process
status: active
updated: 2026-05-10
aliases:
  - Phase Execution Requirements
  - Phase Lifecycle Requirements
---

# Phase Execution Operational Requirements

## Scope

These requirements adapt the imported upstream phase execution procedure for
the standalone Commonloom project.

They apply when Commonloom work is organized into explicit implementation
phases, tickets, or release milestones. Active phase plans and tickets live
under `docs/plans/`.

| ID | Requirement | Acceptance |
| --- | --- | --- |
| CLR-OPS-080 | Implementation phases shall execute sequentially unless a phase plan explicitly documents safe parallelism. | A phase does not start until predecessor gate evidence is recorded, except for documented independent workstreams. |
| CLR-OPS-081 | Work inside a phase may run in parallel only with explicit ownership. | Each worker, branch, or worktree owns disjoint tickets, files, or modules; shared ownership is coordinated before edits. |
| CLR-OPS-082 | Phase work shall use explicit ticket or task lifecycle states. | A phase plan defines allowed statuses and terminal statuses before execution begins. |
| CLR-OPS-083 | Test-first implementation shall be required for behavior changes once test infrastructure exists. | A failing test or equivalent verification is recorded before implementation for non-trivial behavior changes. |
| CLR-OPS-084 | Sweep findings shall be ticketed before broad corrective work begins. | Lint, code quality, security, test, and validation findings discovered during sweeps are tracked before fixes, except for trivial typo or fixture corrections noted in the workflow log. |
| CLR-OPS-085 | No phase shall be marked complete with open non-terminal tickets. | All tasks, bugs, chores, and spikes for the phase are terminal before completion is recorded. |
| CLR-OPS-086 | Phase gates shall run in a fixed order. | Evaluation, ticket update, implementation, lint, code quality, security, unit tests, integration or validation tests, and retrospective happen in the documented order unless marked not applicable with a reason. |
| CLR-OPS-087 | CI gate evidence shall be authoritative for phase completion. | Local green checks are not enough; completion requires CI evidence for the phase gate. |
| CLR-OPS-088 | Every completed phase shall include a retrospective. | The phase record captures what went as planned, deviations, process observations, carry-forward actions, and rule or template changes. |
| CLR-OPS-089 | Phase process changes shall update this requirements page or a successor process document. | Repeated deviations result in a documented process update rather than tribal knowledge. |
| CLR-OPS-090 | Each implementation phase shall use the Commonloom phase plan layout. | The phase summary is `docs/plans/<phase-slug>.md`; its tickets and ticket index are in `docs/plans/<phase-slug>/`. |
| CLR-OPS-091 | Each phase folder shall contain an `index.md` ticket index. | The index lists every phase ticket, title, type, and status, and links back to the top-level phase summary. |
| CLR-OPS-092 | Roadmap entries shall link to phase summaries, not ticket indexes. | `docs/roadmap.md` links to `docs/plans/<phase-slug>.md`; ticket indexes are linked as supporting material. |
| CLR-OPS-093 | Phase plan links shall use vault-stable wikilinks. | Links resolve under `npm run lint:docs` with zero Obsidian wikilink errors or warnings. |

## Commonloom Adaptation Notes

The imported upstream source procedure references Bun commands,
application-specific paths, BDD checks, and platform gates.
For Commonloom, the same operational shape applies, but concrete commands must
be replaced with verified package scripts once the standalone package scaffold
exists.

Until local package scripts exist, phase records must say which checks are
unavailable instead of inventing commands. Documentation checks are already
available and must run for documentation-only phase work.

## Evidence

- [[sources/flavor-grenade-lsp/docs/plans/phase-execution|phase execution procedure]]
- [[sources/flavor-grenade-lsp/docs/plans/execution-ledger|execution ledger]]
- [[sources/flavor-grenade-lsp/docs/requirements/code-quality|code quality requirements]]
- [[sources/flavor-grenade-lsp/docs/requirements/development-process|development process requirements]]

## See Also

- [[task-management]]
- [[quality-gates]]
- [[release-and-ci]]
- [[documentation-maintenance]]
