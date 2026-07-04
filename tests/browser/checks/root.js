// Check: root page renders the Albums banner labelled "Albums"
"use strict";

const { BASE_URL } = require("../helpers");

/** @type {import('../types').BrowserCheck} */
module.exports = {
  name: "root page banner labelled 'Albums'",
  async run(page, tst) {
    await page.goto(BASE_URL, { waitUntil: "load" });
    await page.waitForSelector('.album-banner[aria-label="Albums"]', { timeout: 15_000 });

    const label = await page.$eval(
      ".album-banner",
      (el) => el.getAttribute("aria-label")?.trim(),
    );
    tst.equal(label, "Albums");
  },
};
