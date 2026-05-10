---
title: Security Validation Technical Requirements
tags:
  - commonloom
  - requirements/technical
  - security
status: active
updated: 2026-05-10
aliases:
  - Security Requirements
---

# Security Validation Technical Requirements

| ID | Requirement | Acceptance |
| --- | --- | --- |
| CLR-TECH-060 | Commonloom shall avoid regular expressions with known super-linear behavior in parser-sensitive code. | Regexes used for parsing are reviewed or tested for ReDoS risk. |
| CLR-TECH-061 | Commonloom shall cap or reject unreasonable frontmatter input. | YAML parsing has size, alias, and exception-safety protections before release. |
| CLR-TECH-062 | Commonloom shall canonicalize local paths before filesystem access. | Relative traversal, encoded traversal, absolute paths, and unsupported schemes cannot escape approved roots. |
| CLR-TECH-063 | Commonloom shall treat symlink escapes as outside approved roots when filesystem validation follows symlinks. | Real paths are checked before accepting local media or content references. |
| CLR-TECH-064 | Commonloom shall prevent prototype pollution in caller-supplied JSON-like objects before merging configuration or schema output. | `__proto__`, `constructor`, and `prototype` keys do not mutate application prototypes. |
| CLR-TECH-065 | Commonloom shall bound expensive compilation work where practical. | Pathological inputs fail safely or return diagnostics instead of exhausting process resources. |

## Evidence

- [[sources/flavor-grenade-lsp/docs/requirements/security/parser-safety|parser safety requirements]]
- [[sources/flavor-grenade-lsp/docs/requirements/security/input-validation|input validation requirements]]
- [[sources/flavor-grenade-lsp/docs/requirements/security/vault-confinement|vault confinement requirements]]
- [[sources/flavor-grenade-lsp/docs/adr/ADR012-parser-safety-policy|ADR012 parser safety]]
- [[sources/flavor-grenade-lsp/docs/adr/ADR013-vault-root-confinement|ADR013 vault confinement]]
