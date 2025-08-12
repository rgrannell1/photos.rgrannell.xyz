/*
 * Validate the site is working as expected.
 */

import puppeteer from "puppeteer";

export async function openBrowser() {
  return puppeteer.launch({ headless: true });
}

export async function openPage(browser, path) {
  const ENDPOINT = "http://127.0.0.1:5501";
  const page = await browser.newPage({ headless: true });

  await page.goto(`${ENDPOINT}/index.html#${path}`, {
    waitUntil: "networkidle2",
  });

  return page;
}
