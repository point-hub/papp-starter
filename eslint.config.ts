import eslint from '@eslint/js';
import ts from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import vitest from '@vitest/eslint-plugin';
import cypress from 'eslint-plugin-cypress/flat';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import vue from 'eslint-plugin-vue';
import globals from 'globals';
import vueParser from 'vue-eslint-parser';

export default [
  // -----------------------------
  // Base ignore patterns
  // -----------------------------
  {
    ignores: [
      '**/dist/**',
      '**/dist-ssr/**',
      '**/coverage/**',
      '**/node_modules/**',
    ],
  },

  // -----------------------------
  // JavaScript core rules
  // -----------------------------
  eslint.configs.recommended,

  // -----------------------------
  // TypeScript setup
  // -----------------------------
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        sourceType: 'module',
        ecmaVersion: 'latest',
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      '@typescript-eslint': ts,
    },
    rules: {
      ...ts.configs.recommended.rules,
    },
  },

  // -----------------------------
  // Vue SFC rules + Vue parser
  // -----------------------------
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tsParser,
        extraFileExtensions: ['.vue'],
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      vue,
      '@typescript-eslint': ts,
    },
    rules: {
      ...vue.configs['flat/essential'].rules,
      ...ts.configs.recommended.rules,

      'vue/multi-word-component-names': 'off',
      'vue/max-len': 'off',
      'vue/html-indent': ['error', 2, {
        attribute: 1,
        baseIndent: 1,
        closeBracket: 0,
        alignAttributesVertically: false,
        ignores: [],
      }],
    },
  },

  // -----------------------------
  // Sorting imports
  // -----------------------------
  {
    files: ['**/*.{js,ts,jsx,tsx,vue}'],
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
    },
  },

  // -----------------------------
  // Vitest
  // -----------------------------
  {
    files: ['src/**/__tests__/**/*'],
    ...vitest.configs.recommended,
  },

  // -----------------------------
  // Cypress
  // -----------------------------
  {
    files: [
      'cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}',
      'cypress/support/**/*.{js,ts,jsx,tsx}',
    ],
    ...cypress.configs.recommended,
  },

  // -----------------------------
  // Cypress Configuration File Globals
  // -----------------------------
  {
    files: ['**/*.{ts,tsx}'],
    ...cypress.configs.globals,
  },

  // -----------------------------
  // Global stylistic rules
  // -----------------------------
  {
    rules: {
      quotes: ['error', 'single', { avoidEscape: true }],
      semi: ['error', 'always'],
      indent: ['error', 2],
      'comma-dangle': ['error', 'always-multiline'],
      'no-trailing-spaces': 'error',
      'max-len': 'off',
    },
  },
];
