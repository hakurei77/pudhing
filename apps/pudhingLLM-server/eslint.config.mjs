import eslint from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export const config =  tseslint.config(
  {
    ignores: [
        'eslint.config.mjs',
        'ecosystem.config.js'
    ],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      ecmaVersion: 5,
      sourceType: 'module',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      'indent': ['error', 4], 
    },
  },
);