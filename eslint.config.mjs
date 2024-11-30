// @ts-check

import { includeIgnoreFile } from "@eslint/compat";
import eslintPkg from "@eslint/js";
import path from "node:path";
import { fileURLToPath } from "node:url";

import * as tseslint from "typescript-eslint";
import * as angular from "angular-eslint";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const gitignorePath = path.resolve(__dirname, ".gitignore");

const { configs: eslintConfigs } = eslintPkg;

// The 'files' patterns need to match paths in check-eslint.yaml

export default tseslint.config(
  includeIgnoreFile(gitignorePath),
  {
    files: ["**/*.ts"],
    extends: [
      eslintConfigs.all,
      ...tseslint.configs.strictTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
      ...angular.configs.tsAll,
    ],
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    processor: angular.processInlineTemplates,
    rules: {
      "new-cap": ["error", { capIsNew: false }],
      "no-console": ["error", { allow: ["warn", "error"] }],
      "one-var": ["error", "never"],
      "sort-imports": [
        "error",
        {
          allowSeparatedGroups: true,
        },
      ],
      "@angular-eslint/directive-selector": [
        "error",
        {
          type: "attribute",
          prefix: "app",
          style: "camelCase",
        },
      ],
      "@angular-eslint/component-selector": [
        "error",
        {
          type: "element",
          prefix: "app",
          style: "kebab-case",
        },
      ],
    },
  },
  {
    files: ["**/*.html"],
    extends: [
      ...angular.configs.templateAll,
      ...angular.configs.templateAccessibility,
    ],
    rules: {
      "@angular-eslint/template/i18n": ["off"],
    },
  },
);
