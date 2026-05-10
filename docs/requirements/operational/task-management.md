---
title: Task Management Operational Requirements
tags:
  - commonloom
  - requirements/operational
  - tickets
  - workflow
status: active
updated: 2026-05-10
aliases:
  - Ticket Workflow Requirements
  - Task Management Requirements
---

# Task Management Operational Requirements

## Scope

These requirements adapt the Flavor Grenade ticket templates and lifecycle
documents for Commonloom task management.

They apply when Commonloom work is tracked as tickets, phases, or release
milestones.
They do not require copying the exact upstream template text into active
Commonloom tickets before a local ticket directory exists.

| ID | Requirement | Acceptance |
| --- | --- | --- |
| CLR-OPS-100 | Commonloom work items shall use typed tickets when work is large enough to need tracking. | Supported ticket types are feature, task, bug, spike, and chore, or documented successors. |
| CLR-OPS-101 | Ticket IDs shall be unique, stable, and type-prefixed. | IDs follow a convention such as `FEAT-001`, `TASK-001`, `BUG-001`, `SPIKE-001`, and `CHORE-001`; numbers are not reused. |
| CLR-OPS-102 | Ticket files shall contain enough metadata for agents and reviewers to route work. | Tickets include title, type, status, priority or severity when relevant, parent or [[requirements/operational/phase-execution|phase]] when relevant, dates, dependencies, tags, and aliases. |
| CLR-OPS-103 | Tickets shall link to relevant requirements, ADRs, tests, parent work, dependencies, and source evidence. | A reviewer can trace why the work exists and how it is verified from the ticket. |
| CLR-OPS-104 | Task tickets shall represent atomic work. | A task can be completed in one focused implementation thread; larger tasks are split. |
| CLR-OPS-105 | Behavior-changing task tickets shall follow a red, green, optional refactor, review, done path once test infrastructure exists. | Failing test evidence precedes implementation evidence for non-trivial behavior changes. |
| CLR-OPS-106 | Bug tickets shall be triaged before implementation. | Bug records capture observed behavior, expected behavior, reproduction or evidence, severity, and verification before closure. |
| CLR-OPS-107 | Spike tickets shall produce an explicit conclusion or delivered output. | Spikes end as output-delivered, inconclusive, cancelled, or equivalent terminal status with rationale. |
| CLR-OPS-108 | Chore tickets shall cover maintenance work without hiding behavior changes. | Chores that reveal behavior defects open bug or task tickets before fixes proceed. |
| CLR-OPS-109 | Every ticket shall maintain an append-only workflow log. | Status transitions and agent notes are appended chronologically; previous entries are not rewritten. |
| CLR-OPS-110 | Ticket frontmatter status shall match the latest workflow state. | Updating workflow log entries includes updating the status field. |
| CLR-OPS-111 | Blocked tickets shall name their blockers. | Blocked entries link or identify the dependency and resume from prior state when unblocked. |
| CLR-OPS-112 | Ticket closure shall require verification evidence. | Done or equivalent terminal entries include CI, test, review, or explicit cancellation evidence. |

## Commonloom Adaptation Notes

Flavor Grenade's templates reference BDD files, test matrix pages, LSP module
paths, and Bun commands.
Commonloom should keep the structure and traceability model, but local ticket
templates must use Commonloom-specific commands, source paths, and package
scripts after they exist.

Until the standalone repository has active ticket templates, use this page and
[[requirements/operational/phase-execution|phase-execution]] as the operational
source of truth for task management.

## Evidence

- [[sources/flavor-grenade-lsp/docs/templates/tickets/index|ticket templates index]]
- [[sources/flavor-grenade-lsp/docs/templates/tickets/task|task ticket template]]
- [[sources/flavor-grenade-lsp/docs/templates/tickets/bug|bug ticket template]]
- [[sources/flavor-grenade-lsp/docs/templates/tickets/feature|feature ticket template]]
- [[sources/flavor-grenade-lsp/docs/templates/tickets/spike|spike ticket template]]
- [[sources/flavor-grenade-lsp/docs/templates/tickets/chore|chore ticket template]]
- [[sources/flavor-grenade-lsp/docs/templates/tickets/lifecycle/task-lifecycle|task lifecycle]]
- [[sources/flavor-grenade-lsp/docs/templates/tickets/lifecycle/bug-lifecycle|bug lifecycle]]
- [[sources/flavor-grenade-lsp/docs/templates/tickets/lifecycle/feature-lifecycle|feature lifecycle]]
- [[sources/flavor-grenade-lsp/docs/templates/tickets/lifecycle/spike-lifecycle|spike lifecycle]]
- [[sources/flavor-grenade-lsp/docs/templates/tickets/lifecycle/chore-lifecycle|chore lifecycle]]

## See Also

- [[requirements/operational/phase-execution|Phase Execution]]
- [[quality-gates]]
- [[documentation-maintenance]]
