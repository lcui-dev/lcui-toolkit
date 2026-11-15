import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";

const tsFiles = ["**/*.{ts,tsx}"];

export default tseslint.config(
  {
    ignores: [
      "**/node_modules/",
      "**/lib/",
      "**/dist/",
      "**/build/",
      "**/coverage/",
      "**/.nyc_output/",
      "**/.lcui/",
      "**/.xmake/",
      "packages/cli/test/fixtures/*/project/",
      "packages/fluent-icons/src/",
      "packages/fluent-icons/fonts/",
      "packages/fluent-icons/scripts/convert.js",
      // Ambient type declarations - not parseable as a module by ESLint.
      "packages/react/types.d.ts",
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended.map((config) => ({
    ...config,
    files: config.files ?? tsFiles,
  })),
  {
    files: tsFiles,
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: { ...globals.node },
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    rules: {
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-this-alias": "off",
    },
  },
  {
    // @lcui/react sources: relax a few rules that the upstream codebase
    // historically relied on. Tightening these should be a separate PR.
    files: ["packages/react/src/**/*.{ts,tsx}"],
    rules: {
      "no-fallthrough": "off",
      "prefer-const": "warn",
      "@typescript-eslint/no-restricted-types": "off",
      "@typescript-eslint/no-unsafe-function-type": "off",
      "@typescript-eslint/no-wrapper-object-types": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-namespace": "off",
      "@typescript-eslint/triple-slash-reference": "off",
    },
  },
  {
    // Mocha / node test files (plain JS / MJS)
    files: ["packages/*/test/**/*.{js,mjs}"],
    languageOptions: {
      sourceType: "module",
      globals: { ...globals.node, ...globals.mocha },
    },
  },
  {
    // TSX fixtures used by ts-loader tests
    files: ["packages/cli/test/fixtures/**/*.{ts,tsx}"],
    rules: {
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
  {
    // Node CLI entry & build scripts (plain JS, ESM)
    files: ["packages/cli/bin/**/*.js", "packages/fluent-icons/scripts/**/*.{js,mjs}"],
    languageOptions: {
      sourceType: "module",
      globals: { ...globals.node },
    },
  },
  {
    // CommonJS config files
    files: ["**/*.cjs"],
    languageOptions: { sourceType: "commonjs" },
  }
);
