import { readFileSync, writeFileSync } from 'node:fs';

const versionPattern = /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/;
const args = process.argv.slice(2);
const checkOnly = args.includes('--check');
const positionalArgs = args.filter((arg) => arg !== '--check');
const packageJsonPath = 'package.json';
const packageJson = readJson(packageJsonPath);
const currentVersion = String(packageJson.version);
const targetVersion = positionalArgs[0] ?? (checkOnly ? currentVersion : '');
const files = [
  packageJsonPath,
  'package-lock.json',
  '.github/README.md',
  'README.md',
  'docs/concepts/Commonloom.md',
  'docs/tests/requirements-matrix.md',
  'examples/README.md',
];

if (positionalArgs.length > 1) {
  fail('expected at most one version argument.');
}

if (!versionPattern.test(targetVersion)) {
  fail('usage: node scripts/set-version.mjs <x.y.z[-prerelease]> [--check]');
}

const nextContents = new Map();
const changedFiles = [];

for (const filePath of files) {
  const original = readFileSync(filePath, 'utf8');
  const next = updateFile(filePath, original, targetVersion);

  nextContents.set(filePath, next);

  if (next !== original) {
    changedFiles.push(filePath);
  }
}

if (checkOnly) {
  if (changedFiles.length > 0) {
    console.error('Version verification failed. Run:');
    console.error(`npm run version:set -- ${targetVersion}`);
    console.error('Files with version drift:');

    for (const filePath of changedFiles) {
      console.error(`- ${filePath}`);
    }

    process.exit(1);
  }

  console.log(`Version references match ${targetVersion}.`);
  process.exit(0);
}

for (const [filePath, next] of nextContents) {
  writeFileSync(filePath, next);
}

console.log(`Set Commonloom version references to ${targetVersion}.`);

function updateFile(filePath, content, version) {
  switch (filePath) {
    case packageJsonPath:
      return updatePackageJson(content, version);
    case 'package-lock.json':
      return updatePackageLock(content, version);
    case '.github/README.md':
      return replaceRequired(
        content,
        /Commonloom `[^`]+` is (?:the current package version\. `0\.1\.0` is the\s+>\s+)?first standalone release\./,
        `Commonloom \`${version}\` is the current package version. \`0.1.0\` is the
> first standalone release.`,
        filePath,
      );
    case 'README.md':
      return updateRootReadme(content, version, filePath);
    case 'docs/concepts/Commonloom.md':
      return updateCommonloomConcept(content, version, filePath);
    case 'docs/tests/requirements-matrix.md':
      return replaceRequired(
        content,
        /\| EX-VERIFY \| Verification \| `npm run examples:verify` runs \[verify-examples\.mjs\]\(\.\.\/\.\.\/scripts\/verify-examples\.mjs\) to check .*? shared substrate usage, and forbidden internal imports\. \|/,
        '| EX-VERIFY | Verification | `npm run examples:verify` runs [verify-examples.mjs](../../scripts/verify-examples.mjs) to check each example depends on `commonloom` through `file:../..`, shared substrate usage, and forbidden internal imports. |',
        filePath,
      );
    case 'examples/README.md':
      return replaceRequired(
        content,
        /Each example package is private and imports [\s\S]*?\s+(?:through `file:\.\.\/\.\.` and )?the package entrypoint, not\s+through `src\/` internals\./,
        `Each example package is private and imports the current workspace package
\`commonloom@${version}\` through \`file:../..\` and the package entrypoint, not
through \`src/\` internals.`,
        filePath,
      );
    default:
      return content;
  }
}

function updatePackageJson(content, version) {
  const data = JSON.parse(content);

  data.version = version;

  return `${JSON.stringify(data, null, 2)}\n`;
}

function updatePackageLock(content, version) {
  const data = JSON.parse(content);

  data.version = version;

  if (data.packages?.['']) {
    data.packages[''].version = version;
  }

  return `${JSON.stringify(data, null, 2)}\n`;
}

function updateRootReadme(content, version, filePath) {
  let next = replaceRequired(
    content,
    /This is the current `[^`]+` public surface\./,
    `This is the current \`${version}\` public surface.`,
    filePath,
  );

  next = replaceRequired(
    next,
    /Commonloom `[^`]+` is prepared for release through npm trusted publishing\./,
    `Commonloom \`${version}\` is prepared for release through npm trusted publishing.`,
    filePath,
  );

  return next;
}

function updateCommonloomConcept(content, version, filePath) {
  const replacement = `repository is now its standalone home. The current package version is
\`commonloom@${version}\`, and \`0.1.0\` was the first standalone release.`;

  if (
    /repository is now its standalone home\. The current package version is\s+`commonloom@[^`]+`, and `0\.1\.0` was the first standalone release\./.test(content)
  ) {
    return replaceRequired(
      content,
      /repository is now its standalone home\. The current package version is\s+`commonloom@[^`]+`, and `0\.1\.0` was the first standalone release\./,
      replacement,
      filePath,
    );
  }

  return replaceRequired(
    content,
    /repository is now its standalone home and is preparing `commonloom@[^`]+` as\s+the first standalone release\./,
    replacement,
    filePath,
  );
}

function replaceRequired(content, pattern, replacement, filePath) {
  if (!pattern.test(content)) {
    fail(`${filePath} did not match expected version pattern: ${pattern}`);
  }

  return content.replace(pattern, replacement);
}

function readJson(filePath) {
  return JSON.parse(readFileSync(filePath, 'utf8'));
}

function fail(message) {
  console.error(`set-version failed: ${message}`);
  process.exit(1);
}
