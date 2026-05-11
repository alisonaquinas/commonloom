# Commonloom Node Example

This example compiles the shared Commonloom content into a static HTML preview
without a browser framework.

## Commands

Run commands from this directory, or use `--workspace @commonloom/example-node`
from the repository root.

```bash
npm install
npm run build
npm run preview
```

`npm run build` compiles the shared Markdown through Commonloom, compiles the
shared SCSS with Sass, copies the shared assets, and writes `dist/index.html`.
`npm run preview` serves the generated `dist/` folder locally.
