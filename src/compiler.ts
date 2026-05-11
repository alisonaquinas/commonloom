/**
 * Top-level Commonloom compiler entry point.
 *
 * This module owns the public compile function that will coordinate manifest
 * loading, Markdown parsing, rendering, validation, and trace assembly.
 */
import { readFile } from 'node:fs/promises';

import { z } from 'zod';

import { renderMarkdownHtml } from './html.js';
import { resolveLinkReferences } from './links.js';
import { parseMarkdown } from './markdown.js';
import { validateMediaReference } from './media.js';
import { resolveInsideRoot } from './paths.js';
import { createSourceTrace } from './source-trace.js';
import type {
  CommonloomConfig,
  CommonloomDiagnostic,
  CommonloomImageReference,
  CommonloomResult,
} from './types.js';

/**
 * Run the top-level Commonloom compilation workflow.
 *
 * The compiler is non-destructive: it reads Markdown and media references,
 * returns compiled records and diagnostics, and leaves file generation to
 * adapters.
 */
export async function compileCommonloom<Frontmatter = unknown, AdapterData = unknown>(
  config: CommonloomConfig<Frontmatter, AdapterData>,
): Promise<CommonloomResult<Frontmatter, AdapterData>> {
  const manifests = config.manifests ?? [];

  if (manifests.length === 0) {
    return {
      diagnostics: [
        {
          code: 'NO_MANIFESTS',
          severity: 'info',
          message: 'No page manifests configured.',
        },
      ],
    };
  }

  const frontmatterSchema = config.frontmatterSchema ?? (z.unknown() as z.ZodType<Frontmatter>);
  const diagnostics: CommonloomDiagnostic[] = [];
  const documents: NonNullable<CommonloomResult<Frontmatter, AdapterData>['documents']> = [];

  for (const manifest of manifests) {
    const resolvedMarkdown = resolveInsideRoot({
      root: config.copyRoot,
      target: manifest.sourcePath,
      sourcePath: manifest.sourcePath,
    });

    if (!resolvedMarkdown.resolvedPath) {
      diagnostics.push(...resolvedMarkdown.diagnostics);
      continue;
    }

    let markdown: string;

    try {
      markdown = await readFile(resolvedMarkdown.resolvedPath, 'utf8');
    } catch {
      diagnostics.push({
        code: 'COPY_NOT_FOUND',
        severity: 'error',
        message: `Markdown source does not exist: ${manifest.sourcePath}`,
        sourcePath: manifest.sourcePath,
      });
      continue;
    }

    const parsed = parseMarkdown({
      sourcePath: manifest.sourcePath,
      markdown,
      frontmatterSchema,
    });
    const rendered = await renderMarkdownHtml({
      parsed,
      allowHtml: config.html?.allowInlineHtml ?? false,
    });
    const sourceTrace = createSourceTrace({
      markdownPath: manifest.sourcePath,
      markdown,
      parsed,
    });
    const documentDiagnostics = [...rendered.diagnostics];

    if (config.links) {
      const resolvedLinks = await resolveLinkReferences(sourceTrace.links, config.links);
      sourceTrace.links = resolvedLinks.links;
      documentDiagnostics.push(...resolvedLinks.diagnostics);
    }

    sourceTrace.images = await validateImages(
      sourceTrace.images,
      config.mediaRoot,
      documentDiagnostics,
    );

    diagnostics.push(...documentDiagnostics);
    documents.push({
      manifest,
      frontmatter: parsed.frontmatter,
      bodyHtml: rendered.bodyHtml,
      sourceTrace,
      diagnostics: documentDiagnostics,
    });
  }

  return { diagnostics, documents };
}

async function validateImages(
  images: CommonloomImageReference[],
  mediaRoot: string,
  diagnostics: CommonloomDiagnostic[],
): Promise<CommonloomImageReference[]> {
  const validatedImages: CommonloomImageReference[] = [];

  for (const image of images) {
    const validation = await validateMediaReference(image, {
      mediaRoot,
      sourcePath: image.sourcePath,
    });

    diagnostics.push(...validation.diagnostics);
    validatedImages.push({
      ...image,
      resolvedPath: validation.resolvedPath,
    });
  }

  return validatedImages;
}
