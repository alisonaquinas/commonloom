---
title: Phase 5 - Audit Driven Hardening
tags:
  - commonloom
  - plans
  - phase-5
  - audits
status: active
updated: 2026-05-11
aliases:
  - Phase 5
  - Audit Driven Hardening
---

# Phase 5 - Audit Driven Hardening

Phase 5 begins with independent audits of Commonloom's code quality, security
posture, documentation, and requirements evidence.

## Objective

Create a clear evidence base for the next hardening work by separating audit
discovery from remediation.

## Scope

Phase 5 includes:

- code quality audit
- security audit
- documentation audit
- requirements audit
- audit hub and phase traceability updates
- remediation tickets for every audit finding
- operational phase-execution chores for every applicable requirement in
  [[requirements/operational/phase-execution|Phase Execution]]

Phase 5 does not include fixing the reported findings unless a follow-on ticket
explicitly owns that remediation.

## Work Items

| ID | Work Item | Acceptance |
| --- | --- | --- |
| P5-001 | Perform code quality audit. | Code quality findings are recorded under [[audits/code-quality-audit]]. |
| P5-002 | Perform security audit. | Security findings are recorded under [[audits/security-audit]]. |
| P5-003 | Perform documentation audit. | Documentation findings are recorded under [[audits/documentation-audit]]. |
| P5-004 | Perform requirements audit. | Requirements findings are recorded under [[audits/requirements-audit]]. |
| P5-005 | Collect audit closeout evidence. | Audit hub, roadmap, phase tickets, and validation evidence are updated. |
| P5-006 | Harden path confinement. | Windows cross-drive and Markdown source symlink findings are owned by [[plans/phase-5-audit-driven-hardening/TASK-005|TASK-005]]. |
| P5-007 | Improve Markdown pipeline maintainability. | Processor duplication and compiler orchestration findings are owned by [[plans/phase-5-audit-driven-hardening/TASK-006|TASK-006]] and [[plans/phase-5-audit-driven-hardening/TASK-007|TASK-007]]. |
| P5-008 | Improve test isolation. | Persistent temporary directory findings are owned by [[plans/phase-5-audit-driven-hardening/TASK-008|TASK-008]]. |
| P5-009 | Reconcile diagnostics and source traces. | Diagnostic-contract, unsafe HTML, and source-position findings are owned by [[plans/phase-5-audit-driven-hardening/TASK-009|TASK-009]], [[plans/phase-5-audit-driven-hardening/TASK-010|TASK-010]], and [[plans/phase-5-audit-driven-hardening/TASK-012|TASK-012]]. |
| P5-010 | Add parser and release hardening. | Resource-limit and workflow-pinning findings are owned by [[plans/phase-5-audit-driven-hardening/TASK-011|TASK-011]] and [[plans/phase-5-audit-driven-hardening/TASK-013|TASK-013]]. |
| P5-011 | Reconcile documentation and requirements drift. | Release docs, frontmatter, ticket metadata, API docs, link validation, format checks, and BDD traceability findings are owned by [[plans/phase-5-audit-driven-hardening/TASK-016|TASK-016]] through [[plans/phase-5-audit-driven-hardening/TASK-022|TASK-022]]. |
| P5-012 | Enforce phase execution controls. | Phase sequencing, ownership, lifecycle, test-first, sweep-ticketing, fixed gate order, CI evidence, retrospective, process update, layout, and link controls are owned by [[plans/phase-5-audit-driven-hardening/CHORE-002|CHORE-002]] through [[plans/phase-5-audit-driven-hardening/CHORE-010|CHORE-010]]. |

## Tickets

- [[plans/phase-5-audit-driven-hardening/FEAT-001]]
- [[plans/phase-5-audit-driven-hardening/TASK-001]]
- [[plans/phase-5-audit-driven-hardening/TASK-002]]
- [[plans/phase-5-audit-driven-hardening/TASK-003]]
- [[plans/phase-5-audit-driven-hardening/TASK-004]]
- [[plans/phase-5-audit-driven-hardening/TASK-005]]
- [[plans/phase-5-audit-driven-hardening/TASK-006]]
- [[plans/phase-5-audit-driven-hardening/TASK-007]]
- [[plans/phase-5-audit-driven-hardening/TASK-008]]
- [[plans/phase-5-audit-driven-hardening/TASK-009]]
- [[plans/phase-5-audit-driven-hardening/TASK-010]]
- [[plans/phase-5-audit-driven-hardening/TASK-011]]
- [[plans/phase-5-audit-driven-hardening/TASK-012]]
- [[plans/phase-5-audit-driven-hardening/TASK-013]]
- [[plans/phase-5-audit-driven-hardening/TASK-014]]
- [[plans/phase-5-audit-driven-hardening/TASK-015]]
- [[plans/phase-5-audit-driven-hardening/TASK-016]]
- [[plans/phase-5-audit-driven-hardening/TASK-017]]
- [[plans/phase-5-audit-driven-hardening/TASK-018]]
- [[plans/phase-5-audit-driven-hardening/TASK-019]]
- [[plans/phase-5-audit-driven-hardening/TASK-020]]
- [[plans/phase-5-audit-driven-hardening/TASK-021]]
- [[plans/phase-5-audit-driven-hardening/TASK-022]]
- [[plans/phase-5-audit-driven-hardening/CHORE-001]]
- [[plans/phase-5-audit-driven-hardening/CHORE-002]]
- [[plans/phase-5-audit-driven-hardening/CHORE-003]]
- [[plans/phase-5-audit-driven-hardening/CHORE-004]]
- [[plans/phase-5-audit-driven-hardening/CHORE-005]]
- [[plans/phase-5-audit-driven-hardening/CHORE-006]]
- [[plans/phase-5-audit-driven-hardening/CHORE-007]]
- [[plans/phase-5-audit-driven-hardening/CHORE-008]]
- [[plans/phase-5-audit-driven-hardening/CHORE-009]]
- [[plans/phase-5-audit-driven-hardening/CHORE-010]]

## Finding Coverage Matrix

| Audit Finding | Owner Ticket |
| --- | --- |
| CQ-001 cross-drive root confinement | [[plans/phase-5-audit-driven-hardening/TASK-005|TASK-005]] |
| CQ-002 duplicated Markdown processor setup | [[plans/phase-5-audit-driven-hardening/TASK-006|TASK-006]] |
| CQ-003 mixed compiler responsibilities | [[plans/phase-5-audit-driven-hardening/TASK-007|TASK-007]] |
| CQ-004 persistent test temp paths | [[plans/phase-5-audit-driven-hardening/TASK-008|TASK-008]] |
| CQ-005 unreachable diagnostic codes | [[plans/phase-5-audit-driven-hardening/TASK-009|TASK-009]] |
| CQ-006 brittle frontmatter line offsets | [[plans/phase-5-audit-driven-hardening/TASK-010|TASK-010]] |
| Security: Markdown source symlink escape | [[plans/phase-5-audit-driven-hardening/TASK-005|TASK-005]] |
| Security: missing whole-document resource bounds | [[plans/phase-5-audit-driven-hardening/TASK-011|TASK-011]] |
| Security: unsafe HTML attributes lack diagnostics | [[plans/phase-5-audit-driven-hardening/TASK-012|TASK-012]] |
| Security: mutable GitHub Actions tags | [[plans/phase-5-audit-driven-hardening/TASK-013|TASK-013]] |
| Documentation: security audit lint red | [[plans/phase-5-audit-driven-hardening/TASK-014|TASK-014]] |
| Documentation: missing Phase 5 plan and tickets | [[plans/phase-5-audit-driven-hardening/TASK-015|TASK-015]] |
| Documentation: stale README bootstrap next step | [[plans/phase-5-audit-driven-hardening/TASK-016|TASK-016]] |
| Documentation: Phase 4 checklist stale | [[plans/phase-5-audit-driven-hardening/TASK-016|TASK-016]] |
| Documentation: release runbook bootstrap ambiguity | [[plans/phase-5-audit-driven-hardening/TASK-016|TASK-016]] |
| Documentation: durable docs frontmatter policy drift | [[plans/phase-5-audit-driven-hardening/TASK-017|TASK-017]] |
| Documentation: mixed ticket `phase` metadata types | [[plans/phase-5-audit-driven-hardening/TASK-018|TASK-018]] |
| Documentation: audits hub missing from vault index | [[plans/phase-5-audit-driven-hardening/TASK-015|TASK-015]] |
| Documentation: README API snapshot incomplete | [[plans/phase-5-audit-driven-hardening/TASK-019|TASK-019]] |
| Requirements: unsafe attribute diagnostic coverage overstated | [[plans/phase-5-audit-driven-hardening/TASK-012|TASK-012]] |
| Requirements: broken standard internal link evidence gap | [[plans/phase-5-audit-driven-hardening/TASK-020|TASK-020]] |
| Requirements: source position evidence gap | [[plans/phase-5-audit-driven-hardening/TASK-010|TASK-010]] |
| Requirements: format check requirement mismatch | [[plans/phase-5-audit-driven-hardening/TASK-021|TASK-021]] |
| Requirements: BDD ranges not fully verified | [[plans/phase-5-audit-driven-hardening/TASK-022|TASK-022]] |
| Requirements: Phase 4 release evidence stale | [[plans/phase-5-audit-driven-hardening/TASK-016|TASK-016]] |
| Split or clarify `CLR-FUNC-022` | [[plans/phase-5-audit-driven-hardening/TASK-012|TASK-012]] |
| Split or clarify `CLR-USER-004` | [[plans/phase-5-audit-driven-hardening/TASK-012|TASK-012]], [[plans/phase-5-audit-driven-hardening/TASK-020|TASK-020]] |
| Split or clarify `CLR-OPS-001` | [[plans/phase-5-audit-driven-hardening/TASK-021|TASK-021]] |
| Clarify `CLR-FUNC-040` source-position scope | [[plans/phase-5-audit-driven-hardening/TASK-010|TASK-010]] |

## Operational Requirement Coverage

| Requirement | Owner Chore | Status |
| --- | --- | --- |
| CLR-OPS-080 | [[plans/phase-5-audit-driven-hardening/CHORE-002|CHORE-002]] | Phase 5 audit discovery is documented as safe parallel work while Phase 4 awaits release-workflow evidence. |
| CLR-OPS-081 | [[plans/phase-5-audit-driven-hardening/CHORE-002|CHORE-002]] | Four auditors had disjoint report ownership under `docs/audits/`. |
| CLR-OPS-082 | [[plans/phase-5-audit-driven-hardening/CHORE-003|CHORE-003]] | Ticket statuses are explicit in the Phase 5 index and ticket frontmatter. |
| CLR-OPS-083 | [[plans/phase-5-audit-driven-hardening/CHORE-004|CHORE-004]] | Planned for later behavior-changing remediation tickets. |
| CLR-OPS-084 | [[plans/phase-5-audit-driven-hardening/CHORE-005|CHORE-005]] | Audit findings are ticketed before remediation starts. |
| CLR-OPS-085 | [[plans/phase-5-audit-driven-hardening/CHORE-001|CHORE-001]] | Closeout remains active while non-terminal tickets exist. |
| CLR-OPS-086 | [[plans/phase-5-audit-driven-hardening/CHORE-006|CHORE-006]] | Fixed gate order is tracked and active for closeout. |
| CLR-OPS-087 | [[plans/phase-5-audit-driven-hardening/CHORE-007|CHORE-007]] | CI evidence remains planned before completion. |
| CLR-OPS-088 | [[plans/phase-5-audit-driven-hardening/CHORE-008|CHORE-008]] | Retrospective remains planned before completion. |
| CLR-OPS-089 | [[plans/phase-5-audit-driven-hardening/CHORE-009|CHORE-009]] | Process update review remains planned before completion. |
| CLR-OPS-090 | [[plans/phase-5-audit-driven-hardening/CHORE-010|CHORE-010]] | Phase summary and ticket folder layout exist. |
| CLR-OPS-091 | [[plans/phase-5-audit-driven-hardening/CHORE-010|CHORE-010]] | Phase ticket index exists and lists all tickets. |
| CLR-OPS-092 | [[plans/phase-5-audit-driven-hardening/CHORE-010|CHORE-010]] | Roadmap links to the Phase 5 summary. |
| CLR-OPS-093 | [[plans/phase-5-audit-driven-hardening/CHORE-010|CHORE-010]] | Vault-stable links pass documentation lint. |

## Acceptance Criteria

- [x] Code quality audit report exists.
- [x] Security audit report exists.
- [x] Documentation audit report exists.
- [x] Requirements audit report exists.
- [x] Audit reports are linked from the audit hub.
- [x] Every audit finding is linked to an owner ticket.
- [x] Phase execution operational requirements have owner chores.
- [x] Local validation passes.
- [ ] Remote CI evidence is captured.

## Evidence

- [[audits/index|Commonloom Audits]]
- [[requirements/operational/phase-execution|Phase Execution]]
- [[requirements/operational/task-management|Task Management]]

## Workflow Log

> [!INFO] Active · 2026-05-11
> Phase 5 audit discovery started on `feature/phase-5-audits`.

> [!SUCCESS] Local validation · 2026-05-11
> `npm run check` passed after the audit reports, audit hub, roadmap links, and
> Phase 5 ticket records were added.

> [!INFO] Finding ownership · 2026-05-11
> Every audit finding and split-or-clarify recommendation has an owner ticket
> in the Phase 5 plan.

> [!INFO] Operational controls · 2026-05-11
> Added Phase 5 chore tickets for each phase-execution operational requirement
> from CLR-OPS-080 through CLR-OPS-093.
