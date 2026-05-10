// Check: listings page renders with an H1
"use strict";

const { BASE_URL } = require("../helpers");

/** @type {import('../types').BrowserCheck} */
module.exports = {
  name: "listings page has H1 'Listings'",
  async run(page, tst) {
    await page.goto(`${BASE_URL}/#/listings`, { waitUntil: "load" });
    await page.waitForSelector("h1.albums-header", { timeout: 15_000 });

    const h1Text = await page.$eval("h1.albums-header", (el) => el.textContent?.trim());
    tst.equal(h1Text, "Listings");
  },
};
