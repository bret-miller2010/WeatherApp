import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";

/** @type {import('eslint').Linter.Config[]} */
export default [
   {
      rules: {
         "no-console": "warn",
         "no-unused-vars": "warn",
         "no-undef": "warn",
         "no-constant-condition": "warn",
         "no-empty": "warn",
         "no-unsafe-optional-chaining": "warn",
      },
   },
   { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
   { languageOptions: { globals: globals.browser } },
   pluginJs.configs.recommended,
   ...tseslint.configs.recommended,
   pluginReact.configs.flat.recommended,
];
