// @ts-check

const eslint = require("@eslint/js");
const tseslint = require("typescript-eslint");
const angular = require("angular-eslint");

module.exports = tseslint.config(
  {
    ignores: [".amplify/", ".angular/", "dist/"],
  },
  {
    files: ["**/*.ts"],
    extends: [
      eslint.configs.all,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...angular.configs.tsAll,
    ],
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
  }
);
