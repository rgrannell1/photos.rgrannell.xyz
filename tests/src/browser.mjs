/*
 * Validate the site is working as expected.
 */

import puppeteer from "puppeteer";

export async function openBrowser() {
  return puppeteer.launch({
    headless: true ,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--single-process",
        "--no-zygote",
      ],
  });
}

const ENDPOINT = "http://localhost:5501";

export async function openPage(browser, path) {
  const page = await browser.newPage({ headless: true });

  await page.goto(`${ENDPOINT}/index.html${path}`, {
    waitUntil: "networkidle2",
  });

  return page;
}
