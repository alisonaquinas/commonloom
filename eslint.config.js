import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import ts from 'typescript-eslint';

export default defineConfig(
  {
    ignores: ['dist/**', 'node_modules/**', 'coverage/**'],
  },
  js.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  ts.configs.strictTypeChecked,
  ts.configs.stylisticTypeChecked,
  {
    files: ['**/*.ts'],
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
  },
  {
    files: ['**/*.js'],
    extends: [ts.configs.disableTypeChecked],
  },
);
