import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

const repoRoot = process.cwd();
const failures = [];
const requirementPattern = /CLR-[A-Z]+-\d+/g;

const requirementIds = new Set();

for (const filePath of await collectMarkdown(join(repoRoot, 'docs', 'requirements'))) {
  const content = await readFile(filePath, 'utf8');

  for (const match of content.matchAll(/\| (CLR-[A-Z]+-\d+) \|/g)) {
    requirementIds.add(match[1]);
  }
}

const matrixContent = await readFile(
  join(repoRoot, 'docs', 'tests', 'requirements-matrix.md'),
  'utf8',
);
const matrixIds = [...matrixContent.matchAll(/\| (CLR-[A-Z]+-\d+) \|/g)].map((match) => match[1]);
const matrixIdSet = new Set(matrixIds);

for (const requirementId of requirementIds) {
  if (!matrixIdSet.has(requirementId)) {
    failures.push(`${requirementId} is missing from docs/tests/requirements-matrix.md.`);
  }
}

for (const matrixId of matrixIdSet) {
  if (!requirementIds.has(matrixId)) {
    failures.push(`${matrixId} is listed in the test matrix but not defined in docs/requirements.`);
  }
}

const duplicates = matrixIds.filter((id, index) => matrixIds.indexOf(id) !== index);

for (const duplicateId of new Set(duplicates)) {
  failures.push(`${duplicateId} appears more than once as a matrix row.`);
}

for (const filePath of await collectMarkdown(join(repoRoot, 'docs', 'bdd'))) {
  const content = await readFile(filePath, 'utf8');

  for (const match of content.matchAll(requirementPattern)) {
    if (!requirementIds.has(match[0])) {
      failures.push(`${match[0]} is referenced from ${filePath} but is not defined.`);
    }
  }
}

if (failures.length > 0) {
  console.error('Traceability verification failed:');

  for (const failure of failures) {
    console.error(`- ${failure}`);
  }

  process.exit(1);
}

console.log(`Traceability verification passed for ${String(requirementIds.size)} requirements.`);

async function collectMarkdown(root) {
  const entries = await readdir(root, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const entryPath = join(root, entry.name);

    if (entry.isDirectory()) {
      files.push(...await collectMarkdown(entryPath));
      continue;
    }

    if (entry.isFile() && entry.name.endsWith('.md')) {
      files.push(entryPath);
    }
  }

  return files;
}
