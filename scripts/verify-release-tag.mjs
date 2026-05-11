import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

const packageJson = JSON.parse(readFileSync('package.json', 'utf8'));
const version = String(packageJson.version);
const eventName = process.env.GITHUB_EVENT_NAME ?? '';
const refType = process.env.GITHUB_REF_TYPE ?? '';
const refName = process.env.GITHUB_REF_NAME ?? '';

if (eventName === 'workflow_dispatch') {
  console.log('Release tag verification skipped for workflow_dispatch dry run.');
  process.exit(0);
}

if (refType !== 'tag') {
  fail(`expected a tag ref, got ${refType || 'unset'}.`);
}

if (!/^v\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/.test(refName)) {
  fail(`tag ${refName || 'unset'} is not a supported version tag.`);
}

if (refName !== `v${version}`) {
  fail(`tag ${refName} does not match package version ${version}.`);
}

try {
  execFileSync('git', ['fetch', 'origin', 'main', '--quiet'], {
    stdio: 'inherit',
  });
  const headSha = readGit(['rev-parse', 'HEAD']);
  const mainSha = readGit(['rev-parse', 'origin/main^{commit}']);

  if (headSha !== mainSha) {
    fail('tag commit is not the current origin/main head.');
  }
} catch {
  fail('could not verify tag commit against origin/main.');
}

console.log(
  `Release tag ${refName} matches package version ${version} and points at origin/main head.`,
);

function fail(message) {
  console.error(`Release tag verification failed: ${message}`);
  process.exit(1);
}

function readGit(args) {
  return execFileSync('git', args, {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'inherit'],
  }).trim();
}
