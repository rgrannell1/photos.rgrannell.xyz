// Check: albums page displays at least one album card (verifies data pipeline)
"use strict";

const { BASE_URL } = require("../helpers");

/** @type {import('../types').BrowserCheck} */
module.exports = {
  name: "albums page shows at least one album card",
  async run(page, tst) {
    await page.goto(`${BASE_URL}/#/albums`, { waitUntil: "load" });
    await page.waitForSelector(".photo-album", { timeout: 15_000 });

    const count = await page.$$eval(".photo-album", (els) => els.length);
    tst.ok(count > 0, `${count} album cards visible`);
  },
};
