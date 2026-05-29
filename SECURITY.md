# Security Policy

## Supported Versions

Commonloom is pre-1.0. Security fixes target the current published `0.x`
release line and the active `develop` integration branch.

## Reporting A Vulnerability

Do not open a public issue for a suspected vulnerability. Use GitHub private
vulnerability reporting for this repository when available.

Include:

- affected package version or commit
- reproduction steps or proof of concept
- expected impact
- whether the issue affects published package consumers, examples, CI, or
  documentation tooling

## Security Gates

Commonloom uses GitHub Actions validation, CodeQL, Semgrep Community Edition,
OpenSSF Scorecard, GitHub Dependency Review, Dependabot, and `npm audit` as
automated security checks. Dependency installs in CI use lockfile-backed
`npm ci --ignore-scripts`, and release publishing uses npm trusted publishing.
