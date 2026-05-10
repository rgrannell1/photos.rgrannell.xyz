// Check: navigating into an album then a photo renders the photo page
"use strict";

const { BASE_URL } = require("../helpers");

/** @type {import('../types').BrowserCheck} */
module.exports = {
  name: "photo page renders an H1 'Photo'",
  async run(page, tst) {
    await page.goto(`${BASE_URL}/#/albums`, { waitUntil: "load" });
    await page.waitForSelector("img.thumbnail-image", { timeout: 15_000 });

    await Promise.all([
      page.waitForFunction(
        () => window.location.hash.startsWith("#!/album/"),
        { timeout: 15_000 },
      ),
      page.click("img.thumbnail-image"),
    ]);

    await page.waitForSelector(".photo-metadata-popover", { timeout: 15_000 });

    await Promise.all([
      page.waitForFunction(
        () => window.location.hash.startsWith("#!/photo/"),
        { timeout: 15_000 },
      ),
      page.click(".photo-metadata-popover"),
    ]);

    await page.waitForFunction(
      () => document.querySelector("h1")?.textContent?.trim() === "Photo",
      { timeout: 15_000 },
    );

    const h1Text = await page.$eval("h1", (el) => el.textContent?.trim());
    tst.equal(h1Text, "Photo");
  },
};
