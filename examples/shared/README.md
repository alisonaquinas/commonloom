# Commonloom Shared Example Materials

This directory is the framework-neutral source for every Phase 6 example.

Examples must import or copy from these files at build time instead of creating
framework-specific content, styles, or assets:

- `content/` contains Markdown and frontmatter fixtures.
- `styles/commonloom-example.scss` contains the shared visual treatment.
- `assets/` contains the Commonloom logo and supporting graphics used by the
  examples.

The React, Vue, Svelte, Next.js, Angular, and Node examples may only change the
framework glue that loads, compiles, and renders these shared materials.
