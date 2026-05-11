/**
 * Frontmatter parsing and schema validation for Commonloom Markdown sources.
 *
 * This module converts YAML parsing and Zod validation failures into
 * normalized diagnostics instead of throwing for normal authoring errors.
 */
import matter from 'gray-matter';
import { z } from 'zod';

import type { CommonloomDiagnostic } from './types.js';

const maxFrontmatterBytes = 64 * 1024;

/**
 * Parsed frontmatter and Markdown body returned by {@link parseFrontmatter}.
 */
export interface ParsedFrontmatter<Frontmatter> {
  frontmatter: Frontmatter | undefined;
  bodyMarkdown: string;
  contentStartLine: number;
  diagnostics: CommonloomDiagnostic[];
}

/**
 * Split YAML frontmatter from Markdown content and validate it with Zod.
 *
 * Invalid or malformed frontmatter is reported as `FRONTMATTER_INVALID`
 * diagnostics so callers can continue collecting content validation results
 * without throwing for normal authoring errors.
 */
export function parseFrontmatter<Frontmatter>(
  sourcePath: string,
  markdown: string,
  frontmatterSchema: z.ZodType<Frontmatter>,
): ParsedFrontmatter<Frontmatter> {
  const frontmatterBlock = extractFrontmatterBlock(markdown);

  if (frontmatterBlock && Buffer.byteLength(frontmatterBlock, 'utf8') > maxFrontmatterBytes) {
    return {
      frontmatter: undefined,
      bodyMarkdown: markdown,
      contentStartLine: 1,
      diagnostics: [
        {
          code: 'FRONTMATTER_INVALID',
          severity: 'error',
          message: `Frontmatter exceeds ${String(maxFrontmatterBytes)} bytes.`,
          sourcePath,
        },
      ],
    };
  }

  let file: matter.GrayMatterFile<string>;

  try {
    file = matter(markdown);
  } catch (error) {
    return {
      frontmatter: undefined,
      bodyMarkdown: markdown,
      contentStartLine: 1,
      diagnostics: [
        {
          code: 'FRONTMATTER_INVALID',
          severity: 'error',
          message: error instanceof Error ? error.message : 'Invalid frontmatter.',
          sourcePath,
        },
      ],
    };
  }

  const validation = frontmatterSchema.safeParse(file.data);
  const contentStartLine = findContentStartLine(markdown);

  if (validation.success) {
    return {
      frontmatter: validation.data,
      bodyMarkdown: file.content,
      contentStartLine,
      diagnostics: [],
    };
  }

  return {
    frontmatter: undefined,
    bodyMarkdown: file.content,
    contentStartLine,
    diagnostics: validation.error.issues.map((issue) => ({
      code: 'FRONTMATTER_INVALID',
      severity: 'error',
      message: `${issue.path.join('.') || 'frontmatter'}: ${issue.message}`,
      sourcePath,
    })),
  };
}

function extractFrontmatterBlock(markdown: string): string | undefined {
  const match = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/.exec(markdown);

  return match?.[1];
}

function findContentStartLine(markdown: string): number {
  const match = /^---\r?\n[\s\S]*?\r?\n---(?:\r?\n|$)/.exec(markdown);

  if (!match) {
    return 1;
  }

  return match[0].split(/\r?\n/).length;
}
