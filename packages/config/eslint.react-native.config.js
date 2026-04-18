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
];
