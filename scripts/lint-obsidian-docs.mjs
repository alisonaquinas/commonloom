import process from "node:process";

import { getFormatter, lint } from "markdownlint-obsidian/engine";

const cwd = process.cwd();

const results = await lint({
  cwd,
  config: cwd,
  vaultRoot: "docs",
  globs: ["docs/**/*.md"],
  resolve: true,
});

const formatter = getFormatter("default");
const output = formatter(results);

if (output.trim().length > 0) {
  console.error(output);
}

const errorCount = results.reduce(
  (count, result) =>
    count + result.errors.filter((error) => error.severity === "error").length,
  0,
);

const warningCount = results.reduce(
  (count, result) =>
    count +
    result.errors.filter((error) => error.severity === "warning").length,
  0,
);

console.log(
  `markdownlint-obsidian checked ${results.length} file(s): ${errorCount} error(s), ${warningCount} warning(s)`,
);

if (errorCount > 0 || warningCount > 0) {
  process.exitCode = 1;
}
