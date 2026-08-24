// Check the section layout for a thing that has videos but no photos.
"use strict";

const { BASE_URL } = require("../helpers");

const THING_ROUTE = "#!/thing/place:7";

/** @type {import('../types').BrowserCheck} */
module.exports = {
  name: "video-only thing pages omit the photos section",
  async run(page, tst) {
    await page.goto(`${BASE_URL}/${THING_ROUTE}`, { waitUntil: "load" });
    await page.waitForSelector(".thing-page video", { timeout: 15_000 });

    const headings = await page.$$eval(".thing-page h3", (elements) =>
      elements.map((element) => element.textContent?.trim())
    );

    tst.ok(headings.includes("Videos"), "the videos section is visible");
    tst.notOk(headings.includes("Photos"), "the photos section is absent");
  },
};
