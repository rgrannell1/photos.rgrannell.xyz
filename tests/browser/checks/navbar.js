// Check: the site navbar is present on the root page
"use strict";

const { BASE_URL } = require("../helpers");

/** @type {import('../types').BrowserCheck} */
module.exports = {
  name: "navbar is present on root page",
  async run(page, tst) {
    await page.goto(BASE_URL, { waitUntil: "load" });
    await page.waitForSelector("nav.header", { timeout: 15_000 });

    const nav = await page.$("nav.header");
    tst.ok(nav !== null, "nav.header exists");
  },
};
