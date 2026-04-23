import globals from "globals"
import pluginJs from "@eslint/js"

export default [
  {
    files: ["**/*.js"],
    languageOptions: { globals: { ...globals.node, ...globals.es2021 } },
    ...pluginJs.configs.recommended,
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "warn",
    },
  },
]
