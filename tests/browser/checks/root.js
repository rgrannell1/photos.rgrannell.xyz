// Check: root page renders the Albums H1
"use strict";

const { BASE_URL } = require("../helpers");

/** @type {import('../types').BrowserCheck} */
module.exports = {
  name: "root page has H1 'Albums'",
  async run(page, tst) {
    await page.goto(BASE_URL, { waitUntil: "load" });
    await page.waitForSelector("h1.albums-header", { timeout: 15_000 });

    const h1Text = await page.$eval("h1.albums-header", (el) => el.textContent?.trim());
    tst.equal(h1Text, "Albums");
  },
};
