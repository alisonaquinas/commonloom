/**
 * Local media reference validation for Commonloom Markdown images.
 *
 * This module enforces alt text, approved local roots, and missing-file
 * diagnostics without knowing any consuming website's asset pipeline.
 */
import { stat } from 'node:fs/promises';

import { resolveInsideRoot } from './paths.js';
import type { CommonloomDiagnostic, CommonloomImageReference } from './types.js';

/** Options for validating a Markdown image reference against local media. */
export interface ValidateMediaReferenceOptions {
  mediaRoot: string;
  sourcePath?: string;
}

/** Local media validation result with an optional resolved filesystem path. */
export interface ValidateMediaReferenceResult {
  resolvedPath?: string;
  diagnostics: CommonloomDiagnostic[];
}

const mediaSchemePattern = /^[a-z][a-z0-9+.-]*:/i;

/**
 * Validate a Markdown image reference against the configured media root.
 *
 * The validator enforces alt text, rejects non-local URI schemes, keeps paths
 * inside `mediaRoot`, and reports missing files as diagnostics.
 */
export async function validateMediaReference(
  reference: CommonloomImageReference,
  options: ValidateMediaReferenceOptions,
): Promise<ValidateMediaReferenceResult> {
  const diagnostics: CommonloomDiagnostic[] = [];

  if (!reference.altText.trim()) {
    diagnostics.push({
      code: 'MEDIA_ALT_MISSING',
      severity: 'error',
      message: `Image requires alt text or an explicit decorative marker: ${reference.rawTarget}`,
      sourcePath: reference.sourcePath ?? options.sourcePath,
      line: reference.line,
      column: reference.column,
    });
  }

  if (mediaSchemePattern.test(reference.rawTarget)) {
    diagnostics.push({
      code: 'MEDIA_UNRESOLVED',
      severity: 'error',
      message: `Media references must be local to an approved root: ${reference.rawTarget}`,
      sourcePath: reference.sourcePath ?? options.sourcePath,
      line: reference.line,
      column: reference.column,
    });

    return { diagnostics };
  }

  const resolved = resolveInsideRoot({
    root: options.mediaRoot,
    target: reference.rawTarget,
    sourcePath: reference.sourcePath ?? options.sourcePath,
  });

  diagnostics.push(...resolved.diagnostics);

  if (!resolved.resolvedPath) {
    return { diagnostics };
  }

  try {
    await stat(resolved.resolvedPath);
  } catch {
    diagnostics.push({
      code: 'MEDIA_UNRESOLVED',
      severity: 'error',
      message: `Media file does not exist: ${reference.rawTarget}`,
      sourcePath: reference.sourcePath ?? options.sourcePath,
      line: reference.line,
      column: reference.column,
    });
  }

  return { resolvedPath: resolved.resolvedPath, diagnostics };
}
