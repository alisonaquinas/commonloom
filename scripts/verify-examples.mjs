import { readdir, readFile, stat } from 'node:fs/promises';
import { join, relative, resolve } from 'node:path';

const repositoryRoot = resolve(import.meta.dirname, '..');
const examplesRoot = join(repositoryRoot, 'examples');
const sharedRoot = join(examplesRoot, 'shared');
const exampleNames = ['react', 'vue', 'svelte', 'nextjs', 'angular', 'node'];
const browserExampleNames = ['react', 'vue', 'svelte', 'nextjs', 'angular'];
const expectedCommonloomDependency = 'file:../..';
const failures = [];

await verifySharedSubstrate();
await verifyExamplePackages();
await verifyNoInternalCommonloomCoupling();

if (failures.length > 0) {
  console.error('Example verification failed:');
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exitCode = 1;
} else {
  console.log(`Example verification passed for ${exampleNames.length} examples.`);
}

async function verifySharedSubstrate() {
  await requireFile(join(sharedRoot, 'content', 'welcome.md'));
  await requireFile(join(sharedRoot, 'content', 'integration-note.md'));
  await requireFile(join(sharedRoot, 'styles', 'commonloom-example.scss'));
  await requireFile(join(sharedRoot, 'scripts', 'generate-content.mjs'));

  const assetNames = await safeReadDir(join(sharedRoot, 'assets'));
  const pngAssets = assetNames.filter((assetName) => assetName.endsWith('.png'));

  if (pngAssets.length === 0) {
    failures.push('examples/shared/assets must contain shared PNG assets.');
  }
}

async function verifyExamplePackages() {
  for (const exampleName of exampleNames) {
    const exampleRoot = join(examplesRoot, exampleName);
    const packageJsonPath = join(exampleRoot, 'package.json');
    const readmePath = join(exampleRoot, 'README.md');
    const packageJson = await readJson(packageJsonPath);
    const readme = await readText(readmePath);

    if (packageJson?.dependencies?.commonloom !== expectedCommonloomDependency) {
      failures.push(
        `${relativePath(packageJsonPath)} must depend on commonloom ${expectedCommonloomDependency}.`,
      );
    }

    if (!readme.includes('## Commands')) {
      failures.push(`${relativePath(readmePath)} must document local commands.`);
    }

    if (browserExampleNames.includes(exampleName)) {
      await verifyBrowserExample(exampleName, exampleRoot, packageJson);
    } else {
      await verifyNodeExample(exampleRoot, packageJson);
    }
  }
}

async function verifyBrowserExample(exampleName, exampleRoot, packageJson) {
  for (const scriptName of ['generate', 'dev', 'build', 'preview']) {
    if (typeof packageJson?.scripts?.[scriptName] !== 'string') {
      failures.push(`${exampleName} example must define npm run ${scriptName}.`);
    }
  }

  if (!packageJson.scripts.generate.includes('../shared/scripts/generate-content.mjs')) {
    failures.push(`${exampleName} generate script must use the shared content generator.`);
  }

  const stylePath = join(exampleRoot, 'src', 'styles.scss');
  const style = await readText(stylePath);

  if (!style.includes('@use "../../shared/styles/commonloom-example";')) {
    failures.push(`${relativePath(stylePath)} must use the shared SCSS substrate.`);
  }
}

async function verifyNodeExample(exampleRoot, packageJson) {
  if (typeof packageJson?.scripts?.build !== 'string') {
    failures.push('node example must define npm run build.');
  }

  if (typeof packageJson?.scripts?.preview !== 'string') {
    failures.push('node example must define npm run preview.');
  }

  const buildScriptPath = join(exampleRoot, 'src', 'build-static.mjs');
  const buildScript = await readText(buildScriptPath);

  for (const expectedSnippet of [
    "from 'commonloom'",
    'sass.compile',
    "join(sharedRoot, 'styles', 'commonloom-example.scss')",
    "join(sharedRoot, 'content')",
    "join(sharedRoot, 'assets')",
  ]) {
    if (!buildScript.includes(expectedSnippet)) {
      failures.push(`${relativePath(buildScriptPath)} must include ${expectedSnippet}.`);
    }
  }
}

async function verifyNoInternalCommonloomCoupling() {
  const files = await collectFiles(examplesRoot);
  const forbiddenPatterns = [
    /\.\.[/\\]\.\.[/\\]src[/\\]/,
    /commonloom[/\\]src/,
    /commonloom[/\\]dist/,
    /flavor-grenade/i,
    /C:[/\\]Users[/\\]/,
  ];

  for (const filePath of files) {
    if (shouldSkipFile(filePath)) {
      continue;
    }

    const content = await readText(filePath);
    const relativeFilePath = relativePath(filePath);

    for (const pattern of forbiddenPatterns) {
      if (pattern.test(content)) {
        failures.push(`${relativeFilePath} contains forbidden coupling pattern ${pattern}.`);
      }
    }
  }
}

async function collectFiles(root) {
  const entries = await readdir(root, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const entryPath = join(root, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await collectFiles(entryPath)));
    } else if (entry.isFile()) {
      files.push(entryPath);
    }
  }

  return files;
}

function shouldSkipFile(filePath) {
  const relativeFilePath = relative(examplesRoot, filePath).replaceAll('\\', '/');
  const ignoredSegments = [
    '/dist/',
    '/node_modules/',
    '/public/commonloom-assets/',
    '/src/generated/',
    '/.angular/',
    '/.next/',
  ];

  return ignoredSegments.some((segment) => `/${relativeFilePath}`.includes(segment));
}

async function requireFile(filePath) {
  try {
    const fileStat = await stat(filePath);

    if (!fileStat.isFile()) {
      failures.push(`${relativePath(filePath)} must be a file.`);
    }
  } catch {
    failures.push(`${relativePath(filePath)} is missing.`);
  }
}

async function readJson(filePath) {
  try {
    return JSON.parse(await readFile(filePath, 'utf8'));
  } catch (error) {
    failures.push(`${relativePath(filePath)} could not be read as JSON: ${error.message}`);
    return undefined;
  }
}

async function readText(filePath) {
  try {
    return await readFile(filePath, 'utf8');
  } catch (error) {
    failures.push(`${relativePath(filePath)} could not be read: ${error.message}`);
    return '';
  }
}

async function safeReadDir(directoryPath) {
  try {
    return await readdir(directoryPath);
  } catch {
    failures.push(`${relativePath(directoryPath)} is missing.`);
    return [];
  }
}

function relativePath(filePath) {
  return relative(repositoryRoot, filePath).replaceAll('\\', '/');
}
