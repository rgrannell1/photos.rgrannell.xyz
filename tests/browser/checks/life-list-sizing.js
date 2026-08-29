// Check: mobile life-list placeholders match photographed cards.
"use strict";

const { BASE_URL } = require("../helpers");

const MOBILE_VIEWPORT = { width: 390, height: 844 };

const readWidth = (page, selector) =>
  page.$eval(selector, (element) => element.getBoundingClientRect().width);

/** @type {import('../types').BrowserCheck} */
module.exports = {
  name: "mobile life-list placeholders match photo widths",
  async run(page, tst) {
    await page.setViewport(MOBILE_VIEWPORT);
    await page.goto(`${BASE_URL}/?bust=life-list-sizing#!/life-list/ireland`, {
      waitUntil: "load",
    });
    await page.waitForSelector(".checklist-card--mystery", { timeout: 15_000 });

    const photoWidth = await readWidth(page, ".checklist-card:not(.checklist-card--mystery) img");
    const placeholderWidth = await readWidth(page, ".mystery-bird");

    tst.equal(placeholderWidth, photoWidth, "placeholder matches photo width");
  },
};
