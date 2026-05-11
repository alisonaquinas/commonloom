import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

/** Create an isolated temporary directory and return a matching cleanup helper. */
export async function makeTempDir(prefix: string) {
  const root = await mkdtemp(join(tmpdir(), prefix));

  return {
    root,
    cleanup: () => rm(root, { recursive: true, force: true }),
  };
}
