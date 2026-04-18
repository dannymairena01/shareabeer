// @ts-check
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import';
import unicorn from 'eslint-plugin-unicorn';
import prettier from 'eslint-config-prettier';
import globals from 'globals';

/** Shared base ESLint config for server / library packages. */
export const baseConfig = tseslint.config(
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/build/**',
      '**/out/**',
      '**/.next/**',
      '**/.expo/**',
      '**/.turbo/**',
      '**/coverage/**',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: { import: importPlugin, unicorn },
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: { ...globals.node, ...globals.es2022 },
    },
    rules: {
      'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
      '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_', ignoreRestSiblings: true },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
      'unicorn/prefer-node-protocol': 'error',
      'unicorn/no-array-for-each': 'off',
      'unicorn/prevent-abbreviations': 'off',
    },
  },
  prettier,
);

export default baseConfig;
