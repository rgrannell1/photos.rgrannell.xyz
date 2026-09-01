// Playwright configuration for built-site browser tests.

"use strict";

const { defineConfig } = require("@playwright/test");

const BASE_URL = "http://127.0.0.1:3030";
const REPORTERS = process.env.CI
  ? [["line"], ["html", { open: "never" }]]
  : "line";

module.exports = defineConfig({
  testDir: "tests/browser",
  testMatch: "**/*.spec.js",
  timeout: 30_000,
  expect: { timeout: 10_000 },
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: 0,
  reporter: REPORTERS,
  use: {
    baseURL: BASE_URL,
    headless: true,
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
    timezoneId: "Europe/Dublin",
    viewport: { width: 1280, height: 800 },
  },
  webServer: {
    command: "exec ./bs/test:serve.zsh",
    url: BASE_URL,
    reuseExistingServer: false,
    timeout: 120_000,
  },
});
