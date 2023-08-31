const { defineConfig } = require("cypress");

module.exports = defineConfig({
  responseTimeout: 30000,
  requestTimeout: 30000,
  viewportWidth: 1920,
  viewportHeight: 1080,
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    charts: true,
    reportPageTitle: "Cypress Test Report",
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: true,
  },
  retries: {
    runMode: 1,
    openMode: 0,
  },
  watchForFileChanges: false,
  e2e: {
    setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin")(on);
    },
    baseUrl: "https://cloud.cypress.io",
  },
  env: {
    mailslurpEmail: "0157ab12-2df2-43fa-bd98-34941db01ebf@mailslurp.biz",
    mailslurpDefaultPassword: "0157ab12-2df2-43fa",
    MAILSLURP_API_KEY:
      "d74ffecbe659d57c03144fac306ae7fd7e232b9edb8155936faa74e88bc0ebae",
  },
});
