// Shared browser setup for integration tests
"use strict";

const puppeteer = require("puppeteer-core");

const CHROME_PATH = process.env.CHROME_EXECUTABLE ?? "/usr/bin/google-chrome";

const BASE_URL = "http://localhost:3030";

const LAUNCH_ARGS = [
  "--no-sandbox",
  "--disable-setuid-sandbox",
  "--disable-dev-shm-usage",
  "--no-first-run",
  "--no-default-browser-check",
];

async function withPage(fn) {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    args: LAUNCH_ARGS,
    headless: true,
    protocolTimeout: 30_000,
  });

  try {
    const page = await browser.newPage();
    await fn(page);
  } finally {
    await browser.close();
  }
}

module.exports = { withPage, BASE_URL };
