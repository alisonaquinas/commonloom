/**
 * Frontmatter parsing and schema validation for Commonloom Markdown sources.
 *
 * This module converts YAML parsing and Zod validation failures into
 * normalized diagnostics instead of throwing for normal authoring errors.
 */
import { parseDocument } from 'yaml';
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

interface FrontmatterBlock {
  yaml: string;
  bodyMarkdown: string;
}

type FrontmatterParseResult =
  | { ok: true; data: unknown }
  | { ok: false; error: Error };

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

  if (frontmatterBlock && Buffer.byteLength(frontmatterBlock.yaml, 'utf8') > maxFrontmatterBytes) {
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

  let frontmatterData: unknown = {};

  if (frontmatterBlock) {
    const parsedFrontmatter = parseYamlFrontmatter(frontmatterBlock.yaml);

    if (!parsedFrontmatter.ok) {
      return {
        frontmatter: undefined,
        bodyMarkdown: markdown,
        contentStartLine: 1,
        diagnostics: [
          {
            code: 'FRONTMATTER_INVALID',
            severity: 'error',
            message: parsedFrontmatter.error.message,
            sourcePath,
          },
        ],
      };
    }

    frontmatterData = parsedFrontmatter.data;
  }

  const bodyMarkdown = frontmatterBlock?.bodyMarkdown ?? markdown;
  const validation = frontmatterSchema.safeParse(frontmatterData);
  const contentStartLine = findContentStartLine(markdown);

  if (validation.success) {
    return {
      frontmatter: validation.data,
      bodyMarkdown,
      contentStartLine,
      diagnostics: [],
    };
  }

  return {
    frontmatter: undefined,
    bodyMarkdown,
    contentStartLine,
    diagnostics: validation.error.issues.map((issue) => ({
      code: 'FRONTMATTER_INVALID',
      severity: 'error',
      message: `${issue.path.join('.') || 'frontmatter'}: ${issue.message}`,
      sourcePath,
    })),
  };
}

function parseYamlFrontmatter(yaml: string): FrontmatterParseResult {
  try {
    const document = parseDocument(yaml, {
      prettyErrors: false,
      stringKeys: true,
    });

    if (document.errors.length > 0) {
      return {
        ok: false,
        error: document.errors[0] ?? new Error('Invalid frontmatter.'),
      };
    }

    const value: unknown = document.toJS({ maxAliasCount: 100 });

    return {
      ok: true,
      data: sanitizeYamlValue(value),
    };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error : new Error('Invalid frontmatter.'),
    };
  }
}

function sanitizeYamlValue(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(sanitizeYamlValue);
  }

  if (value && typeof value === 'object') {
    const safeObject = Object.create(null) as Record<string, unknown>;

    for (const [key, childValue] of Object.entries(value)) {
      safeObject[key] = sanitizeYamlValue(childValue);
    }

    return safeObject;
  }

  return value ?? {};
}

function extractFrontmatterBlock(markdown: string): FrontmatterBlock | undefined {
  const match = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/.exec(markdown);

  if (!match) {
    return undefined;
  }

  return {
    yaml: match[1],
    bodyMarkdown: markdown.slice(match[0].length),
  };
}

function findContentStartLine(markdown: string): number {
  const match = /^---\r?\n[\s\S]*?\r?\n---(?:\r?\n|$)/.exec(markdown);

  if (!match) {
    return 1;
  }

  return match[0].split(/\r?\n/).length;
}
