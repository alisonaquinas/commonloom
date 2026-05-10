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

These requirements adapt the Flavor Grenade phase execution procedure for the
standalone Commonloom project.

They apply when Commonloom work is organized into explicit implementation
phases, tickets, or release milestones.
They do not require this repository to copy Flavor Grenade's exact ticket
templates before those templates exist locally.

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

## Commonloom Adaptation Notes

Flavor Grenade's source procedure references Bun commands, LSP-specific paths,
BDD checks, and platform gates.
For Commonloom, the same operational shape applies, but concrete commands must
be replaced with verified package scripts once the standalone package scaffold
exists.

Until local scripts exist, phase records should say which checks are unavailable
instead of inventing commands.

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
