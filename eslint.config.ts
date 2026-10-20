
import eslint from '@eslint/js';
import ts from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import vitest from '@vitest/eslint-plugin';
import cypress from 'eslint-plugin-cypress';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import vue from 'eslint-plugin-vue';
import globals from 'globals';
import vueParser from 'vue-eslint-parser';

const cypressGlobals = {
  ...globals.browser,
  ...globals.node,
  cy: 'readonly',
  Cypress: 'readonly',
  expect: 'readonly',
  assert: 'readonly',
  chai: 'readonly',
};

export default [
  // Base ignore patterns
  {
    ignores: [
      '**/dist/**',
      '**/dist-ssr/**',
      '**/coverage/**',
      '**/node_modules/**',
    ],
  },

  // JavaScript core rules
  eslint.configs.recommended,

  // TypeScript setup
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

  // Vue recommended flat configuration
  ...vue.configs['flat/essential'],

  // Vue SFC rules and parser
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
      '@typescript-eslint': ts,
    },
    rules: {
      ...ts.configs.recommended.rules,
      'vue/multi-word-component-names': 'off',
      'vue/max-len': 'off',
      'vue/html-indent': [
        'error',
        2,
        {
          attribute: 1,
          baseIndent: 1,
          closeBracket: 0,
          alignAttributesVertically: false,
          ignores: [],
        },
      ],
    },
  },

  // Sorting imports
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

  // Vitest
  {
    ...vitest.configs.recommended,
    files: ['src/**/__tests__/**/*'],
  },

  // Cypress recommended rules
  {
    ...cypress.configs.recommended,
    files: [
      'cypress/e2e/**/*.{js,ts,jsx,tsx}',
      'cypress/support/**/*.{js,ts,jsx,tsx}',
    ],
  },

  // Cypress globals
  {
    files: [
      'cypress/e2e/**/*.{js,ts,jsx,tsx}',
      'cypress/support/**/*.{js,ts,jsx,tsx}',
    ],
    languageOptions: {
      globals: cypressGlobals,
    },
  },

  // Cypress configuration file globals
  {
    files: ['cypress.config.{js,ts,mjs,cjs,mts,cts}'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },

  // Global stylistic rules
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
