/**
 * Top-level Commonloom compiler entry point.
 *
 * This module owns the public compile function that will coordinate manifest
 * loading, Markdown parsing, rendering, validation, and trace assembly.
 */
import type { CommonloomConfig, CommonloomResult } from './types.js';

/**
 * Run the top-level Commonloom compilation workflow.
 *
 * The current implementation is intentionally non-destructive while the
 * standalone package surface is being stabilized. It preserves the public entry
 * point shape and returns a diagnostic when no manifest-driven compilation has
 * been configured yet.
 */
export function compileCommonloom(config: CommonloomConfig): CommonloomResult {
  void config;

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
