import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';

export default [
  {
    files: ['src/**/*.ts'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      ...tseslint.configs.recommendedTypeChecked.rules,

      // Variables
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',

      // Code style
      quotes: ['warn', 'single'],
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-var-requires': 'off',

      // Async/Await safety
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-misused-promises': 'error',
      '@typescript-eslint/require-await': 'warn',
      '@typescript-eslint/return-await': ['error', 'always'],

      // Node.js
      'no-console': 'off',

      // Additional backend safety
      '@typescript-eslint/explicit-function-return-type': 'warn',
      '@typescript-eslint/no-throw-literal': 'error',

      // Enforce @/ alias - warns on relative imports from same directory
      'no-restricted-imports': [
        'warn',
        {
          patterns: [
            {
              group: ['./*'],
              message:
                'Use @/ alias instead of relative imports: "{{importName}}"',
            },
          ],
        },
      ],
    },
  },
];
