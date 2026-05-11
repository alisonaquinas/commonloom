import { copyFile, mkdir, readdir, writeFile } from 'node:fs/promises';
import { basename, dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import * as sass from 'sass';
import { compileCommonloom } from 'commonloom';

const currentFile = fileURLToPath(import.meta.url);
const exampleRoot = resolve(dirname(currentFile), '..');
const repositoryRoot = resolve(exampleRoot, '..', '..');
const sharedRoot = resolve(exampleRoot, '..', 'shared');
const contentRoot = join(sharedRoot, 'content');
const assetRoot = join(sharedRoot, 'assets');
const stylePath = join(sharedRoot, 'styles', 'commonloom-example.scss');
const outputRoot = join(exampleRoot, 'dist');
const outputAssetRoot = join(outputRoot, 'commonloom-assets');

const contentFiles = (await readdir(contentRoot))
  .filter((fileName) => fileName.endsWith('.md'))
  .sort();

const result = await compileCommonloom({
  copyRoot: contentRoot,
  mediaRoot: assetRoot,
  manifests: contentFiles.map((fileName) => ({
    id: fileName.replace(/\.md$/, ''),
    sourcePath: fileName,
  })),
  html: {
    allowInlineHtml: false,
  },
  links: {
    resolveLink({ rawTarget }) {
      if (rawTarget.startsWith('./')) {
        return {
          kind: 'internal',
          resolvedTarget: `#${rawTarget.replace(/^\.\/|\.md$/g, '')}`,
        };
      }

      return {
        kind: 'external',
        resolvedTarget: rawTarget,
      };
    },
  },
});

await mkdir(outputRoot, { recursive: true });
await mkdir(outputAssetRoot, { recursive: true });

for (const assetName of await readdir(assetRoot)) {
  await copyFile(join(assetRoot, assetName), join(outputAssetRoot, assetName));
}

const css = sass.compile(stylePath, { style: 'expanded' }).css;
await writeFile(join(outputRoot, 'styles.css'), css, 'utf8');

const [document] = result.documents;
const body = document
  ? renderDocument(document, result.diagnostics.length)
  : '<h1>No Commonloom content generated.</h1>';

const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Commonloom Node Example</title>
    <link rel="stylesheet" href="./styles.css" />
  </head>
  <body>
    <main class="commonloom-example">
      <section class="commonloom-shell">
${body}
      </section>
    </main>
  </body>
</html>
`;

await writeFile(join(outputRoot, 'index.html'), html, 'utf8');

const displayPath = relative(repositoryRoot, join(outputRoot, 'index.html')).replaceAll('\\', '/');
console.log(`Wrote ${displayPath}`);

function renderDocument(document, diagnosticsCount) {
  const title = getFrontmatterString(document.frontmatter, 'title', document.manifest.id);
  const summary = getFrontmatterString(document.frontmatter, 'summary', '');
  const logoPath = './commonloom-assets/commonloom-logo-light-transparent.png';

  return `        <header class="commonloom-header">
          <div>
            <p class="commonloom-kicker">Node integration</p>
            <h1 class="commonloom-title">${escapeHtml(title)}</h1>
            <p class="commonloom-summary">${escapeHtml(summary)}</p>
          </div>
          <img class="commonloom-logo" src="${logoPath}" alt="Commonloom logo" />
        </header>

        <div class="commonloom-grid">
          <article class="commonloom-card commonloom-rendered">
${indent(document.bodyHtml, 12)}
          </article>
          <aside class="commonloom-card commonloom-meta">
            <dl>
              <dt>Content hash</dt>
              <dd>${escapeHtml(document.sourceTrace.contentHash.slice(0, 12))}</dd>
              <dt>Headings</dt>
              <dd>${document.sourceTrace.headings.length}</dd>
              <dt>Links</dt>
              <dd>${document.sourceTrace.links.length}</dd>
              <dt>Diagnostics</dt>
              <dd>${diagnosticsCount}</dd>
            </dl>
          </aside>
        </div>`;
}

function getFrontmatterString(frontmatter, key, fallback) {
  if (isRecord(frontmatter) && typeof frontmatter[key] === 'string') {
    return frontmatter[key];
  }

  return fallback;
}

function isRecord(value) {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function indent(value, spaces) {
  const prefix = ' '.repeat(spaces);
  return value
    .split('\n')
    .map((line) => `${prefix}${line}`)
    .join('\n');
}

