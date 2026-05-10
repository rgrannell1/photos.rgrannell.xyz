// Check: clicking an album card navigates to an album page with an H1
"use strict";

const { BASE_URL } = require("../helpers");

/** @type {import('../types').BrowserCheck} */
module.exports = {
  name: "album page renders an H1",
  async run(page, tst) {
    await page.goto(`${BASE_URL}/#/albums`, { waitUntil: "load" });
    await page.waitForSelector("img.thumbnail-image", { timeout: 15_000 });
    await page.click("img.thumbnail-image");

    // album page replaces the albums H1 with the album name
    await page.waitForFunction(
      () => document.querySelector("h1")?.textContent?.trim() !== "Albums",
      { timeout: 15_000 },
    );

    const h1Text = await page.$eval("h1", (el) => el.textContent?.trim());
    tst.ok(h1Text && h1Text.length > 0, `album H1 reads "${h1Text}"`);
  },
};
