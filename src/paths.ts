/**
 * Filesystem path confinement helpers for Commonloom validation.
 *
 * This module resolves caller-provided paths under trusted roots and reports
 * traversal attempts as diagnostics.
 */
import { relative, resolve } from 'node:path';

import type { CommonloomDiagnostic } from './types.js';

/** Input for resolving a caller-supplied target under a trusted root. */
export interface ResolveInsideRootInput {
  root: string;
  target: string;
  sourcePath?: string;
}

/** Path resolution result plus diagnostics for rejected traversal attempts. */
export interface ResolveInsideRootResult {
  resolvedPath?: string;
  diagnostics: CommonloomDiagnostic[];
}

/**
 * Resolve a target path and ensure it stays inside the configured root.
 *
 * Traversal attempts return `PATH_OUTSIDE_ROOT` diagnostics instead of a path,
 * allowing callers to keep validation error handling consistent.
 */
export function resolveInsideRoot(input: ResolveInsideRootInput): ResolveInsideRootResult {
  const root = resolve(input.root);
  const resolvedPath = resolve(root, input.target);

  if (!isInsideRoot(root, resolvedPath)) {
    return {
      diagnostics: [
        {
          code: 'PATH_OUTSIDE_ROOT',
          severity: 'error',
          message: `Path must stay inside ${root}: ${input.target}`,
          sourcePath: input.sourcePath,
        },
      ],
    };
  }

  return { resolvedPath, diagnostics: [] };
}

/** Check whether a resolved candidate path remains contained by root. */
function isInsideRoot(root: string, candidate: string): boolean {
  const relativePath = relative(root, candidate);

  return relativePath === '' || (!relativePath.startsWith('..') && !resolve(relativePath).startsWith('..'));
}
