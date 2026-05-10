// Browser integration tests for the root (albums) page
"use strict";

const tap = require("tap");
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

tap.test("root page has H1 with text 'Albums'", async (tst) => {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    args: LAUNCH_ARGS,
    headless: true,
    protocolTimeout: 30_000,
  });

  try {
    const page = await browser.newPage();
    await page.goto(BASE_URL, { waitUntil: "load" });
    await page.waitForSelector("h1", { timeout: 15_000 });

    const h1Text = await page.$eval("h1", (el) => el.textContent?.trim());
    tst.equal(h1Text, "Albums", "H1 reads Albums");
  } finally {
    await browser.close();
  }
});
