// Check: only the first sentence in the About introduction links to rated photos
"use strict";

const { BASE_URL } = require("../helpers");

/** @type {import('../types').BrowserCheck} */
module.exports = {
  name: "about page links only the first sentence to rated photos",
  async run(page, tst) {
    await page.goto(`${BASE_URL}/#/about`, { waitUntil: "load" });
    await page.waitForSelector('.about-page a[href="/#/thing/rating:4"]', {
      timeout: 15_000,
    });

    const linkText = await page.$eval(
      '.about-page a[href="/#/thing/rating:4"]',
      (element) => element.textContent?.trim(),
    );
    tst.equal(linkText, "I found beautiful in this world.");
  },
};
