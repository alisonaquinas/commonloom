import { execFileSync } from 'node:child_process';
import { readdir, readFile, stat } from 'node:fs/promises';
import { join, relative } from 'node:path';

const repoRoot = process.cwd();
const failures = [];

const forbiddenImportPatterns = [
  /from\s+['"][^'"]*flavor-grenade[^'"]*['"]/,
  /from\s+['"][^'"]*svelte[^'"]*['"]/,
  /from\s+['"][^'"]*routes?[^'"]*['"]/,
  /from\s+['"][^'"]*renderer[^'"]*['"]/,
  /from\s+['"][^'"]*product[^'"]*['"]/,
];
const disallowedCoreDependencies = new Set([
  '@mdx-js/mdx',
  'mdsvex',
  'mdsx',
  'shiki',
  'vite-plugin-markdown',
]);
const exactVersionPattern = /^\d+\.\d+\.\d+(?:[-+][0-9A-Za-z.-]+)?$/;

await verifySourceImports();
await verifyDependencies();
verifyGeneratedOutputIsUntracked();

if (failures.length > 0) {
  console.error('Boundary verification failed:');

  for (const failure of failures) {
    console.error(`- ${failure}`);
  }

  process.exit(1);
}

console.log('Boundary verification passed.');

async function verifySourceImports() {
  for (const filePath of await collectFiles(join(repoRoot, 'src'), '.ts')) {
    const content = await readFile(filePath, 'utf8');
    const displayPath = relative(repoRoot, filePath);

    for (const pattern of forbiddenImportPatterns) {
      if (pattern.test(content)) {
        failures.push(`${displayPath} imports adapter or product-specific code.`);
      }
    }
  }
}

async function verifyDependencies() {
  const packageJson = JSON.parse(await readFile(join(repoRoot, 'package.json'), 'utf8'));
  const dependencyGroups = [
    ['dependencies', packageJson.dependencies ?? {}],
    ['devDependencies', packageJson.devDependencies ?? {}],
  ];

  for (const [groupName, dependencies] of dependencyGroups) {
    for (const [name, version] of Object.entries(dependencies)) {
      if (disallowedCoreDependencies.has(name)) {
        failures.push(`${name} is not allowed in ${groupName}.`);
      }

      if (typeof version !== 'string' || !exactVersionPattern.test(version)) {
        failures.push(`${name} must use an exact version in ${groupName}; found ${version}.`);
      }
    }
  }
}

function verifyGeneratedOutputIsUntracked() {
  const trackedGeneratedOutput = execFileSync(
    'git',
    ['ls-files', 'dist', 'coverage'],
    { cwd: repoRoot, encoding: 'utf8' },
  )
    .split(/\r?\n/)
    .filter(Boolean);

  for (const trackedPath of trackedGeneratedOutput) {
    failures.push(`generated output is tracked: ${trackedPath}`);
  }
}

async function collectFiles(root, extension) {
  const entries = await readdir(root, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const entryPath = join(root, entry.name);

    if (entry.isDirectory()) {
      files.push(...await collectFiles(entryPath, extension));
      continue;
    }

    if (entry.isFile() && entry.name.endsWith(extension)) {
      const entryStat = await stat(entryPath);

      if (entryStat.size > 0) {
        files.push(entryPath);
      }
    }
  }

  return files;
}
