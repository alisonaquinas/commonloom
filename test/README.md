# Tests

`test/` contains Vitest coverage for the imported Commonloom package behavior.

These tests protect the standalone extraction boundary. They should verify
generic content-pipeline behavior without depending on Flavor Grenade routes,
Svelte components, generated module names, or product content.

## Coverage Map

| Test File | Coverage |
| --- | --- |
| [content-pipeline-core.test.ts](content-pipeline-core.test.ts) | Public exports, diagnostics, source trace contracts, and adapter-owned routing. |
| [content-pipeline-markdown.test.ts](content-pipeline-markdown.test.ts) | Frontmatter validation, Markdown parsing, GFM support, and heading extraction. |
| [content-pipeline-html.test.ts](content-pipeline-html.test.ts) | HTML rendering, unsafe HTML diagnostics, and source trace hashes. |
| [content-pipeline-links-media.test.ts](content-pipeline-links-media.test.ts) | Link extraction, wiki-link resolution, media validation, alt text, and path confinement. |
| [content-pipeline-integration.test.ts](content-pipeline-integration.test.ts) | Public compiler integration across parse, render, links, media, and traces. |
| [content-pipeline-e2e.test.ts](content-pipeline-e2e.test.ts) | Fixture content tree compiled into adapter-visible records. |

## Invariants

- Keep fixtures small and local to the test that needs them.
- Test adapter behavior through callbacks and typed contracts.
- Treat new diagnostics, parser behavior, rendering policy, or path validation
  behavior as test-worthy.
- Do not hide behavior changes in chores; open or update a task ticket when a
  test exposes a product decision.
