/**
 * Filesystem path confinement helpers for Commonloom validation.
 *
 * This module resolves caller-provided paths under trusted roots and reports
 * traversal attempts as diagnostics.
 */
import { isAbsolute, relative, resolve, sep, win32 } from 'node:path';

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
  const pathApi = usesWindowsPathSemantics(input.root, input.target)
    ? win32
    : { isAbsolute, relative, resolve, sep };
  const root = pathApi.resolve(input.root);
  const resolvedPath = pathApi.resolve(root, input.target);

  if (!isInsideRoot(root, resolvedPath, pathApi)) {
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
function isInsideRoot(
  root: string,
  candidate: string,
  pathApi: Pick<typeof win32, 'isAbsolute' | 'relative' | 'sep'>,
): boolean {
  const relativePath = pathApi.relative(root, candidate);

  return (
    relativePath === ''
    || (
      relativePath !== '..'
      && !relativePath.startsWith(`..${pathApi.sep}`)
      && !pathApi.isAbsolute(relativePath)
    )
  );
}

function usesWindowsPathSemantics(root: string, target: string): boolean {
  return isWindowsAbsolute(root) || isWindowsAbsolute(target);
}

function isWindowsAbsolute(value: string): boolean {
  return /^[A-Za-z]:[\\/]/.test(value) || /^\\\\[^\\]+\\[^\\]+/.test(value);
}
