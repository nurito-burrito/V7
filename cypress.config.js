const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportWidth: 1920,
  viewportHeight: 1080,
  retries: {
    runMode: 1,
    openMode: 0,
  },
  watchForFileChanges: false,
  e2e: {
    setupNodeEvents(on, config) {},
    baseUrl: "https://cloud.cypress.io",
  },
  env: {
    mailslurpEmail: "0157ab12-2df2-43fa-bd98-34941db01ebf@mailslurp.biz",
    mailslurpDefaultPassword: "0157ab12-2df2-43fa",
  },
});
