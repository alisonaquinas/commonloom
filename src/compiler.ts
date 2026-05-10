import type { CommonloomConfig, CommonloomResult } from './types.js';

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
