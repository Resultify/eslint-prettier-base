import globals from "globals";
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import pluginJsxA11y from "eslint-plugin-jsx-a11y";
import eslintConfigPrettier from "eslint-config-prettier";
import * as reactHooks from "eslint-plugin-react-hooks";
import css from "@eslint/css";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores([".tmp/", "temp/", "dist/"]),
  { name: "global files", files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  {
    name: "global language options",
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: import.meta.dirname,
      },
      globals: { ...globals.browser, ...globals.node },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  {
    name: "global linter options",
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    linterOptions: {
      reportUnusedDisableDirectives: "error",
    },
  },
  {
    name: "global js recommended rules",
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    plugins: { js },
    extends: ["js/recommended"],
    rules: {
      "no-duplicate-imports": "error",
      "no-self-compare": "error",
      "no-template-curly-in-string": "error",
      "capitalized-comments": "error",
      camelcase: "error",
      eqeqeq: "error",
      "prefer-object-spread": "error",
      "prefer-template": "error",
      "no-useless-rename": "error",
    },
  },
  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  pluginReact.configs.flat.recommended,
  pluginReact.configs.flat["jsx-runtime"],
  reactHooks.configs["recommended-latest"],
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  pluginJsxA11y.flatConfigs.strict,
  eslintConfigPrettier,
  {
    files: ["**/*.css"],
    ignores: ["src/app/styles.css"],
    plugins: {
      css,
    },
    language: "css/css",
    rules: {
      "css/no-empty-blocks": "error",
      "css/no-duplicate-imports": "error",
      "css/no-invalid-at-rules": "error",
      "css/no-invalid-properties": "error",
      "css/require-baseline": ["error", { available: "newly" }],
    },
  },
]);
// Run to debug: bunx eslint --inspect-config
