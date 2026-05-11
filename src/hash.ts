/**
 * Content hashing helpers for source trace records.
 *
 * Hashes are deterministic SHA-256 digests of source text, not security
 * authentication tokens.
 */
import { createHash } from 'node:crypto';

/**
 * Create a stable SHA-256 hash for source content.
 *
 * Source traces use this value to identify the exact Markdown content that
 * produced rendered output and diagnostics.
 */
export function hashContent(content: string): string {
  return createHash('sha256').update(content).digest('hex');
}
