import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor';
import * as esbuild from '@badeball/cypress-cucumber-preprocessor/esbuild';
import createBundler from '@bahmutov/cypress-esbuild-preprocessor';
import { defineConfig } from 'cypress';
// @ts-expect-error cypress-mochawesome-reporter does not provide TypeScript types for /plugin.
import mochawesome from 'cypress-mochawesome-reporter/plugin';

export default defineConfig({
  viewportWidth: 1280,
  viewportHeight: 720,

  reporter: 'cypress-mochawesome-reporter',

  reporterOptions: {
    charts: true,
    reportPageTitle: 'Cypress Test Report',
    embeddedScreenshots: true,
    inlineAssets: true,
    screenshotsFolder: 'cypress/screenshots',
  },

  e2e: {
    specPattern: '**/*.feature',
    baseUrl: 'http://localhost:4173',

    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config);

      on(
        'file:preprocessor',
        createBundler({
          plugins: [esbuild.createEsbuildPlugin(config)],
        }),
      );

      mochawesome(on);

      return config;
    },
  },
});