// @ts-check

import eslintPkg from "@eslint/js";
import * as tseslint from "typescript-eslint";
import * as angular from "angular-eslint";
const { configs: eslintConfigs } = eslintPkg;

export default tseslint.config(
  {
    ignores: [".amplify/", ".angular/", "dist/"],
  },
  {
    files: ["**/*.ts"],
    extends: [
      eslintConfigs.all,
      ...tseslint.configs.recommendedTypeChecked,
      ...tseslint.configs.stylistic,
      ...angular.configs.tsAll,
    ],
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      }
    },
    processor: angular.processInlineTemplates,
    rules: {
      "new-cap": [
        "error", { "capIsNew": false }
      ],
      "no-console": [
        "error", { allow: ["warn", "error"] }
      ],
      "one-var": [
        "error", "never"
      ],
      "sort-imports": [
        "error", {
          "allowSeparatedGroups": true,
        }
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
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility,
    ],
    rules: {},
  },
);
