---
title: Commonloom Usage
tags:
  - commonloom
  - usage
  - api
status: active
updated: 2026-06-15
aliases:
  - Commonloom API Usage
---

# Commonloom Usage

Commonloom is an adapter-neutral TypeScript library for compiling Markdown into
validated, traceable records that a consuming application can transform into its
own route, component, or renderer shape.

Use the public package entry point:

```ts
import {
  compileCommonloom,
  parseMarkdown,
  renderMarkdownHtml,
  type CommonloomLinkResolution,
} from 'commonloom';
```

Do not import from internal `src/` modules in consuming projects. Public exports
are routed through `src/index.ts`.

## Compile Markdown Manifests

Adapters pass manifest entries, content roots, optional frontmatter schemas, and
optional policies into `compileCommonloom`. Commonloom reads Markdown, validates
frontmatter, renders sanitized HTML, resolves links through adapter callbacks,
validates local media, and returns diagnostics plus compiled documents.

```ts
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { z } from 'zod';
import {
  compileCommonloom,
  type CommonloomLinkResolution,
} from 'commonloom';

const here = dirname(fileURLToPath(import.meta.url));
const contentRoot = join(here, 'content');
const mediaRoot = join(here, 'public');

const frontmatterSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  tags: z.array(z.string()).default([]),
});

const result = await compileCommonloom({
  copyRoot: contentRoot,
  mediaRoot,
  frontmatterSchema,
  html: {
    allowInlineHtml: false,
  },
  manifests: [
    {
      id: 'welcome',
      sourcePath: 'welcome.md',
      outputName: 'welcome',
      data: {
        routePath: '/welcome',
      },
    },
  ],
  links: {
    resolveLink(input): CommonloomLinkResolution {
      const routePath = `/${input.rawTarget.replace(/\.md$/, '')}`;

      return {
        kind: 'internal',
        resolvedTarget: routePath,
      };
    },
  },
});

const errors = result.diagnostics.filter((item) => item.severity === 'error');

if (errors.length > 0) {
  throw new Error(errors.map((item) => item.message).join('\n'));
}

for (const document of result.documents ?? []) {
  console.log(document.manifest.id, document.frontmatter?.title);
  console.log(document.bodyHtml);
  console.log(document.sourceTrace.contentHash);
}
```

Commonloom does not write generated files. The adapter owns file output,
framework rendering, route ids, and renderer-specific records.

## Parse And Render One Document

Use lower-level helpers when an adapter needs to inspect a single Markdown
string before deciding how to compile a full manifest.

```ts
import { z } from 'zod';
import { parseMarkdown, renderMarkdownHtml } from 'commonloom';

const parsed = parseMarkdown({
  sourcePath: 'inline.md',
  markdown: `---
title: Inline Example
---

# Hello Commonloom

This links to [[Commonloom]] and [external docs](https://example.com).
`,
  frontmatterSchema: z.object({
    title: z.string(),
  }),
});

const rendered = await renderMarkdownHtml({
  parsed,
  allowHtml: false,
});

console.log(parsed.headings);
console.log(rendered.bodyHtml);
console.log(rendered.diagnostics);
```

## Link And Media Policy

Commonloom classifies Markdown targets before adapter-specific routing. External
URLs and same-document anchors can pass through directly. Internal links and
wiki-links can be resolved by adapter policy. Unsupported schemes produce
diagnostics instead of silently becoming application routes.

```ts
import { classifyLinkTarget, resolveLinkReferences } from 'commonloom';

const classified = [
  classifyLinkTarget('https://example.com'),
  classifyLinkTarget('#intro'),
  classifyLinkTarget('guide.md'),
  classifyLinkTarget('[[Commonloom]]'),
  classifyLinkTarget('javascript:alert(1)'),
];

const resolved = await resolveLinkReferences(classified, {
  resolveLink(input) {
    if (input.rawTarget === 'Commonloom' || input.rawTarget === 'guide.md') {
      return {
        kind: 'internal',
        resolvedTarget: '/guide',
      };
    }

    return {
      kind: 'internal',
      diagnostic: {
        code: 'LINK_UNRESOLVED',
        severity: 'error',
        message: `Unknown link target: ${input.rawTarget}`,
        sourcePath: input.sourcePath,
        line: input.line,
        column: input.column,
      },
    };
  },
});

console.log(resolved.links);
console.log(resolved.diagnostics);
```

Local media paths are validated against the configured `mediaRoot` during
`compileCommonloom`. Path confinement is part of the core contract, so adapters
should not resolve unchecked media paths themselves.

## See Also

- [[Commonloom]]
- [[Commonloom Architecture]]
- [[Commonloom Requirements]]
- [../../README.md](../../README.md)
- [../../examples/README.md](../../examples/README.md)
