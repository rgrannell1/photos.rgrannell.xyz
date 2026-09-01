// Playwright configuration for tests that use existing built assets.

"use strict";

const { defineConfig } = require("@playwright/test");
const config = require("./playwright.config");

module.exports = defineConfig({
  ...config,
  webServer: {
    ...config.webServer,
    command: "exec ./bs/test:serve-built.zsh",
  },
});
