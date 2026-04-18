// @ts-check
import { baseConfig } from './eslint.config.js';
import globals from 'globals';

export default [
  ...baseConfig,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      globals: { ...globals.browser, __DEV__: 'readonly' },
    },
    rules: {
      // RN allows console.log during dev — we gate this in release via babel-plugin-transform-remove-console.
      'no-console': 'off',
    },
  },
  {
    // Metro and Babel must be CommonJS files for the RN toolchain to load them.
    files: ['metro.config.js', 'babel.config.js'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: { ...globals.node, module: 'readonly', require: 'readonly', __dirname: 'readonly' },
    },
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
      'import/order': 'off',
    },
  },
];
