/**
 * Top-level Commonloom compiler entry point.
 *
 * This module owns the public compile function that will coordinate manifest
 * loading, Markdown parsing, rendering, validation, and trace assembly.
 */
import { readFile, realpath, stat } from 'node:fs/promises';
import { Buffer } from 'node:buffer';

import { z } from 'zod';

import { renderMarkdownHtml } from './html.js';
import { resolveLinkReferences } from './links.js';
import { parseMarkdown } from './markdown.js';
import { validateMediaReference } from './media.js';
import { resolveInsideRoot } from './paths.js';
import { createSourceTrace } from './source-trace.js';
import type {
  CommonloomConfig,
  CommonloomCompiledDocument,
  CommonloomDiagnostic,
  CommonloomImageReference,
  CommonloomManifestEntry,
  CommonloomResult,
  CommonloomSourceTrace,
} from './types.js';

const defaultLimits = {
  maxManifestEntries: 1_000,
  maxMarkdownBytes: 1024 * 1024,
  maxReferences: 10_000,
  maxRenderedHtmlBytes: 5 * 1024 * 1024,
};

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
  const limits = {
    ...defaultLimits,
    ...config.limits,
  };

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

  if (manifests.length > limits.maxManifestEntries) {
    return {
      diagnostics: [
        {
          code: 'MANIFEST_INVALID',
          severity: 'error',
          message: `Manifest count exceeds ${String(limits.maxManifestEntries)} entries.`,
        },
      ],
    };
  }

  const frontmatterSchema = config.frontmatterSchema ?? (z.unknown() as z.ZodType<Frontmatter>);
  const diagnostics: CommonloomDiagnostic[] = [];
  const documents: NonNullable<CommonloomResult<Frontmatter, AdapterData>['documents']> = [];

  for (const manifest of manifests) {
    const compiled = await compileDocument(config, manifest, frontmatterSchema, limits);

    diagnostics.push(...compiled.diagnostics);

    if (compiled.document) {
      documents.push(compiled.document);
    }
  }

  return { diagnostics, documents };
}

async function compileDocument<Frontmatter, AdapterData>(
  config: CommonloomConfig<Frontmatter, AdapterData>,
  manifest: CommonloomManifestEntry<AdapterData>,
  frontmatterSchema: z.ZodType<Frontmatter>,
  limits: typeof defaultLimits,
): Promise<{
  diagnostics: CommonloomDiagnostic[];
  document?: CommonloomCompiledDocument<Frontmatter, AdapterData>;
}> {
  const resolvedMarkdown = await resolveExistingMarkdownPath(
    config.copyRoot,
    manifest.sourcePath,
  );

  if (!resolvedMarkdown.resolvedPath) {
    return { diagnostics: resolvedMarkdown.diagnostics };
  }

  if (resolvedMarkdown.size > limits.maxMarkdownBytes) {
    return {
      diagnostics: [
        {
          code: 'MARKDOWN_INVALID',
          severity: 'error',
          message: `Markdown source exceeds ${String(limits.maxMarkdownBytes)} bytes: ${manifest.sourcePath}`,
          sourcePath: manifest.sourcePath,
        },
      ],
    };
  }

  const markdown = await readFile(resolvedMarkdown.resolvedPath, 'utf8');

  if (Buffer.byteLength(markdown, 'utf8') > limits.maxMarkdownBytes) {
    return {
      diagnostics: [
        {
          code: 'MARKDOWN_INVALID',
          severity: 'error',
          message: `Markdown source exceeds ${String(limits.maxMarkdownBytes)} bytes: ${manifest.sourcePath}`,
          sourcePath: manifest.sourcePath,
        },
      ],
    };
  }

  const parsed = parseMarkdown({
    sourcePath: manifest.sourcePath,
    markdown,
    frontmatterSchema,
  });
  const sourceTrace = createSourceTrace({
    markdownPath: manifest.sourcePath,
    markdown,
    parsed,
  });
  const totalReferences = sourceTrace.links.length + sourceTrace.images.length;

  if (totalReferences > limits.maxReferences) {
    return {
      diagnostics: [
        ...parsed.diagnostics,
        {
          code: 'MARKDOWN_INVALID',
          severity: 'error',
          message: `Markdown references exceed ${String(limits.maxReferences)} total links and images.`,
          sourcePath: manifest.sourcePath,
        },
      ],
    };
  }

  const rendered = await renderMarkdownHtml({
    parsed,
    allowHtml: config.html?.allowInlineHtml ?? false,
  });
  const documentDiagnostics = [...rendered.diagnostics];

  if (Buffer.byteLength(rendered.bodyHtml, 'utf8') > limits.maxRenderedHtmlBytes) {
    return {
      diagnostics: [
        ...documentDiagnostics,
        {
          code: 'MARKDOWN_INVALID',
          severity: 'error',
          message: `Rendered HTML exceeds ${String(limits.maxRenderedHtmlBytes)} bytes.`,
          sourcePath: manifest.sourcePath,
        },
      ],
    };
  }

  const resolvedTrace = await resolveTraceReferences(sourceTrace, config, documentDiagnostics);

  return {
    diagnostics: resolvedTrace.diagnostics,
    document: {
      manifest,
      frontmatter: parsed.frontmatter,
      bodyHtml: rendered.bodyHtml,
      sourceTrace: resolvedTrace.sourceTrace,
      diagnostics: resolvedTrace.diagnostics,
    },
  };
}

async function resolveExistingMarkdownPath(
  copyRoot: string,
  sourcePath: string,
): Promise<{ resolvedPath?: string; size: number; diagnostics: CommonloomDiagnostic[] }> {
  const resolvedMarkdown = resolveInsideRoot({
    root: copyRoot,
    target: sourcePath,
    sourcePath,
  });

  if (!resolvedMarkdown.resolvedPath) {
    return { size: 0, diagnostics: resolvedMarkdown.diagnostics };
  }

  let fileStat: Awaited<ReturnType<typeof stat>>;

  try {
    fileStat = await stat(resolvedMarkdown.resolvedPath);
  } catch {
    return {
      size: 0,
      diagnostics: [
        {
          code: 'COPY_NOT_FOUND',
          severity: 'error',
          message: `Markdown source does not exist: ${sourcePath}`,
          sourcePath,
        },
      ],
    };
  }

  if (!fileStat.isFile()) {
    return {
      size: 0,
      diagnostics: [
        {
          code: 'COPY_NOT_FOUND',
          severity: 'error',
          message: `Markdown source is not a file: ${sourcePath}`,
          sourcePath,
        },
      ],
    };
  }

  let realCopyRoot: string;
  let realResolvedPath: string;

  try {
    [realCopyRoot, realResolvedPath] = await Promise.all([
      realpath(copyRoot),
      realpath(resolvedMarkdown.resolvedPath),
    ]);
  } catch {
    return {
      size: 0,
      diagnostics: [
        {
          code: 'COPY_NOT_FOUND',
          severity: 'error',
          message: `Markdown source does not exist: ${sourcePath}`,
          sourcePath,
        },
      ],
    };
  }

  const realPathCheck = resolveInsideRoot({
    root: realCopyRoot,
    target: realResolvedPath,
    sourcePath,
  });

  if (!realPathCheck.resolvedPath) {
    return { size: 0, diagnostics: realPathCheck.diagnostics };
  }

  return { resolvedPath: realResolvedPath, size: fileStat.size, diagnostics: [] };
}

async function resolveTraceReferences<Frontmatter, AdapterData>(
  sourceTrace: CommonloomSourceTrace,
  config: CommonloomConfig<Frontmatter, AdapterData>,
  initialDiagnostics: CommonloomDiagnostic[],
): Promise<{ sourceTrace: CommonloomSourceTrace; diagnostics: CommonloomDiagnostic[] }> {
  let links = sourceTrace.links;
  const diagnostics = [...initialDiagnostics];

  if (config.links) {
    const resolvedLinks = await resolveLinkReferences(sourceTrace.links, config.links);
    links = resolvedLinks.links;
    diagnostics.push(...resolvedLinks.diagnostics);
  }

  const imageValidation = await validateImages(sourceTrace.images, config.mediaRoot);
  diagnostics.push(...imageValidation.diagnostics);

  return {
    sourceTrace: {
      ...sourceTrace,
      links,
      images: imageValidation.images,
    },
    diagnostics,
  };
}

async function validateImages(
  images: CommonloomImageReference[],
  mediaRoot: string,
): Promise<{ images: CommonloomImageReference[]; diagnostics: CommonloomDiagnostic[] }> {
  const validatedImages: CommonloomImageReference[] = [];
  const diagnostics: CommonloomDiagnostic[] = [];

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

  return { images: validatedImages, diagnostics };
}
