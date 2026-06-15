import { readdir, readFile } from "node:fs/promises";
import { join, relative } from "node:path";

import { parseDocument } from "yaml";

const repoRoot = process.cwd();
const vaultRoot = join(repoRoot, "docs");
const requiredFrontmatterFields = ["title", "tags", "status", "updated"];
const errors = [];

const markdownFiles = (await collectMarkdown(vaultRoot)).sort();
const vaultFiles = await collectFiles(vaultRoot);
const vaultIndex = buildVaultIndex(markdownFiles);

for (const filePath of markdownFiles) {
  const content = await readFile(filePath, "utf8");
  const relativePath = normalizePath(relative(vaultRoot, filePath));
  const frontmatter = parseFrontmatter(relativePath, content);

  if (isDurableNote(relativePath)) {
    lintDurableFrontmatter(relativePath, frontmatter);
  }

  if (!relativePath.startsWith("sources/")) {
    lintWikilinks(relativePath, content, vaultIndex, vaultFiles);
  }
}

for (const error of errors) {
  console.error(error);
}

console.log(
  `Obsidian docs lint checked ${String(markdownFiles.length)} file(s): ${String(errors.length)} error(s), 0 warning(s)`,
);

if (errors.length > 0) {
  process.exitCode = 1;
}

async function collectMarkdown(root) {
  const files = await collectFiles(root);

  return files.filter((filePath) => filePath.endsWith(".md"));
}

async function collectFiles(root) {
  const entries = await readdir(root, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const entryPath = join(root, entry.name);

    if (entry.isDirectory()) {
      files.push(...await collectFiles(entryPath));
      continue;
    }

    if (entry.isFile()) {
      files.push(entryPath);
    }
  }

  return files;
}

function buildVaultIndex(files) {
  const byPath = new Map();
  const byBasename = new Map();

  for (const filePath of files) {
    const relativePath = normalizePath(relative(vaultRoot, filePath));
    const pathWithoutExtension = relativePath.replace(/\.md$/, "");
    const basename = pathWithoutExtension.split("/").at(-1) ?? pathWithoutExtension;

    byPath.set(pathWithoutExtension, relativePath);
    byPath.set(relativePath, relativePath);

    const basenameMatches = byBasename.get(basename) ?? [];
    basenameMatches.push(relativePath);
    byBasename.set(basename, basenameMatches);
  }

  return { byPath, byBasename };
}

function parseFrontmatter(relativePath, content) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/.exec(content);

  if (!match) {
    return { data: undefined, raw: undefined };
  }

  const raw = match[1] ?? "";
  const document = parseDocument(raw, {
    prettyErrors: false,
    stringKeys: true,
  });

  for (const error of document.errors) {
    errors.push(`${relativePath}:1:1 frontmatter parse error: ${error.message}`);
  }

  if (document.errors.length > 0) {
    return { data: undefined, raw };
  }

  return {
    data: sanitizeYamlValue(document.toJS({ maxAliasCount: 100 })),
    raw,
  };
}

function sanitizeYamlValue(value) {
  if (Array.isArray(value)) {
    return value.map(sanitizeYamlValue);
  }

  if (value && typeof value === "object") {
    const safeObject = Object.create(null);

    for (const [key, childValue] of Object.entries(value)) {
      safeObject[key] = sanitizeYamlValue(childValue);
    }

    return safeObject;
  }

  return value ?? {};
}

function isDurableNote(relativePath) {
  return !relativePath.startsWith("sources/") && !/^adr\/\d{4}-/.test(relativePath);
}

function lintDurableFrontmatter(relativePath, frontmatter) {
  if (!frontmatter.raw || !frontmatter.data || typeof frontmatter.data !== "object") {
    errors.push(`${relativePath}:1:1 durable note is missing YAML frontmatter`);
    return;
  }

  for (const field of requiredFrontmatterFields) {
    if (!Object.hasOwn(frontmatter.data, field)) {
      errors.push(`${relativePath}:1:1 frontmatter missing required field "${field}"`);
    }
  }

  const tags = frontmatter.data.tags;

  if (!Array.isArray(tags) || !tags.every((tag) => typeof tag === "string" && tag.length > 0)) {
    errors.push(`${relativePath}:1:1 frontmatter field "tags" must be a non-empty string array`);
  }

  const updated = frontmatter.data.updated;

  if (!(typeof updated === "string" && /^\d{4}-\d{2}-\d{2}$/.test(updated))) {
    errors.push(`${relativePath}:1:1 frontmatter field "updated" must use YYYY-MM-DD`);
  }
}

function lintWikilinks(relativePath, content, vaultIndex, vaultFiles) {
  for (const match of content.matchAll(/\[\[([^\]\n]+)\]\]/g)) {
    const target = normalizeWikilinkTarget(match[1] ?? "");

    if (!target) {
      continue;
    }

    const resolution = resolveWikilinkTarget(target, vaultIndex, vaultFiles);

    if (resolution.status === "missing") {
      errors.push(`${relativePath}:1:1 unresolved wikilink [[${target}]]`);
    }

    if (resolution.status === "ambiguous") {
      errors.push(`${relativePath}:1:1 ambiguous wikilink [[${target}]]; use a path-qualified target`);
    }
  }
}

function normalizeWikilinkTarget(rawTarget) {
  const withoutAlias = rawTarget.split("|", 1)[0]?.trim() ?? "";
  const withoutHeading = withoutAlias.split("#", 1)[0]?.trim() ?? "";
  const withoutBlockRef = withoutHeading.split("^", 1)[0]?.trim() ?? "";

  return normalizePath(withoutBlockRef).replace(/\.md$/, "");
}

function resolveWikilinkTarget(target, vaultIndex, vaultFiles) {
  if (/\.[A-Za-z0-9]+$/.test(target)) {
    return vaultFiles.some((filePath) => normalizePath(relative(vaultRoot, filePath)) === target)
      ? { status: "resolved" }
      : { status: "missing" };
  }

  if (vaultIndex.byPath.has(target)) {
    return { status: "resolved" };
  }

  const suffixMatches = [...vaultIndex.byPath.keys()].filter((candidate) => (
    candidate.endsWith(`/${target}`) || candidate.endsWith(`/${target}.md`)
  ));

  if (suffixMatches.length === 1) {
    return { status: "resolved" };
  }

  if (target.includes("/")) {
    return { status: suffixMatches.length > 1 ? "ambiguous" : "missing" };
  }

  const basenameMatches = vaultIndex.byBasename.get(target) ?? [];

  if (basenameMatches.length === 1) {
    return { status: "resolved" };
  }

  return { status: basenameMatches.length > 1 ? "ambiguous" : "missing" };
}

function normalizePath(path) {
  return path.replaceAll("\\", "/");
}
