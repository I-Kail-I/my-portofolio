import globals from "globals"
import pluginJs from "@eslint/js"

export default [
  pluginJs.configs.recommended,
  {
    files: ["**/*.js"],
    languageOptions: {
      globals: { ...globals.node, ...globals.es2021 },
      sourceType: "module",
      ecmaVersion: 2021,
    },
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "warn",
    },
  },
]
