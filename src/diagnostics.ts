/**
 * Diagnostic enum re-exports for consumers that only need stable Commonloom
 * diagnostic names and severity values.
 *
 * Keep this module narrow so adapters can validate or display diagnostics
 * without importing parser, renderer, or compiler helpers.
 */
export {
  commonloomDiagnosticCodes,
  commonloomLinkKinds,
  commonloomSeverities,
} from './types.js';
export type {
  CommonloomDiagnostic,
  CommonloomDiagnosticCode,
  CommonloomLinkKind,
  CommonloomSeverity,
} from './types.js';
