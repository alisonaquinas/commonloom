# Commonloom Examples

The examples show how adopters can use Commonloom from different TypeScript
stacks without moving framework behavior into the core package.

Every example uses the same shared materials:

- [`shared/content/`](shared/content/) for Markdown and frontmatter.
- [`shared/styles/commonloom-example.scss`](shared/styles/commonloom-example.scss)
  for the visual treatment.
- [`shared/assets/`](shared/assets/) for Commonloom images.

Framework examples may only differ in the glue that loads Commonloom output and
renders it with that framework.

## Workspace Strategy

The repository uses npm workspaces for examples:

- `examples/react`
- `examples/vue`
- `examples/svelte`
- `examples/nextjs`
- `examples/angular`
- `examples/node`

Each example package is private and imports the current workspace package
`commonloom@0.1.6` through `file:../..` and the package entrypoint, not
through `src/` internals.

Run all examples from the repository root after dependencies are installed:

```bash
npm install
```

Use the commands documented in each example's README for local development,
builds, and previews. Framework-specific package scripts should use these
names where the framework supports them:

- `dev` for a local development server
- `build` for a production build or compile step
- `preview` for a local production preview
- `start` or `serve` only when that is the framework convention

## Shared Contract

Examples must not fork shared Markdown, SCSS, or assets. When an example needs
generated content at build time, its build script should read from
`examples/shared/` and write framework-local build output.
