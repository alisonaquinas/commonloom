import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';

const packagePath = 'package.json';
const originalPackageJson = readFileSync(packagePath, 'utf8');
const packageJson = JSON.parse(originalPackageJson);
const baseVersion = String(packageJson.version).split('-')[0];
const runId = safeIdentifier(process.env.GITHUB_RUN_ID ?? 'local');
const runAttempt = safeIdentifier(process.env.GITHUB_RUN_ATTEMPT ?? String(Date.now()));

packageJson.version = `${baseVersion}-ci.${runId}.${runAttempt}`;

try {
  writeFileSync(packagePath, `${JSON.stringify(packageJson, null, 2)}\n`);
  const npmExecPath = process.env.npm_execpath;

  if (npmExecPath) {
    execFileSync(
      process.execPath,
      [npmExecPath, 'publish', '--dry-run', '--tag', 'ci-dry-run'],
      { stdio: 'inherit' },
    );
  } else {
    execFileSync('npm', ['publish', '--dry-run', '--tag', 'ci-dry-run'], {
      shell: process.platform === 'win32',
      stdio: 'inherit',
    });
  }
} finally {
  writeFileSync(packagePath, originalPackageJson);
}

function safeIdentifier(value) {
  return String(value).replace(/[^0-9A-Za-z-]/g, '-');
}
