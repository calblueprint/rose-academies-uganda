import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import eslintPluginPrettier from "eslint-plugin-prettier";
import { defineConfig } from "eslint/config";

export default defineConfig([
  ...nextVitals,
  ...nextTs,

  {
    files: ["apps/**/*.{js,jsx,ts,tsx,mts}"],
    settings: {
      next: {
        rootDir: ["apps/local", "apps/cloud"],
      },
    },
  },

  {
    ignores: [
      "**/node_modules/**",
      "**/dist/**",
      "**/.next/**",
      "**/build/**",
      "**/.vscode/**",
      "**/next-env.d.ts",
      "setup-scripts/**",
    ],
  },

  // bp web-app-template only enforces these rules on *.ts (NOT .tsx)??
  {
    files: ["**/*.ts"],
    plugins: {
      prettier: eslintPluginPrettier,
      "@typescript-eslint": tsPlugin,
    },
    languageOptions: {
      parser: tsParser,
    },
    rules: {
      "prettier/prettier": "error",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-shadow": "error",
    },
  },
]);
