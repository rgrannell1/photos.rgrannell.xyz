// Check: clicking an album card navigates to an album page with an H1
"use strict";

const { BASE_URL } = require("../helpers");

/** @type {import('../types').BrowserCheck} */
module.exports = {
  name: "album page renders an H1",
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

    await page.waitForFunction(
      () => {
        const text = document.querySelector("h1")?.textContent?.trim();
        return text && text !== "Albums";
      },
      { timeout: 15_000 },
    );

    const h1Text = await page.$eval("h1", (el) => el.textContent?.trim());
    tst.ok(h1Text && h1Text.length > 0, `album H1 reads "${h1Text}"`);
  },
};
