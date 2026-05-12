// Check: albums page displays at least one album card (verifies data pipeline)
"use strict";

const { BASE_URL } = require("../helpers");

/**
 * Extract text content from a selector within a parent element, returning null if absent.
 * @param {import('playwright').ElementHandle} parent
 * @param {string} selector
 * @returns {Promise<string|null>}
 */
async function textOf(parent, selector) {
  const el = await parent.$(selector);
  if (!el) return null;
  return (await el.evaluate((node) => node.textContent ?? "")).trim();
}

/**
 * @typedef {{ title: string, date: string, count: string, country: string }} AlbumExpectation
 */

/** @type {AlbumExpectation[]} */
const EXPECTED_ALBUMS = [
  { title: "Wicklow", date: "9 May 2026", count: "17 photos", country: "🇮🇪" },
];

/** @type {import('../types').BrowserCheck} */
module.exports = {
  name: "albums page shows at least one album card",
  async run(page, tst) {
    await page.goto(`${BASE_URL}/#/albums`, { waitUntil: "load" });
    await page.waitForSelector(".photo-album", { timeout: 15_000 });

    const albumCount = await page.$$eval(".photo-album", (els) => els.length);
    tst.ok(albumCount > 0, `${albumCount} album cards visible`);

    // Each album row is a div wrapping .photo-album + .photo-album-metadata (siblings)
    const rowEls = await page.$$(".album-container > div");

    for (const expected of EXPECTED_ALBUMS) {
      let matched = null;

      for (const rowEl of rowEls) {
        const title = await textOf(rowEl, ".photo-album-title");
        if (title === expected.title) {
          matched = rowEl;
          break;
        }
      }

      tst.ok(matched, `album "${expected.title}" present`);
      if (!matched) continue;

      const date = await textOf(matched, "time");
      const count = await textOf(matched, ".photo-album-count");
      const countries = await textOf(matched, ".photo-album-countries");

      tst.equal(date, expected.date, `"${expected.title}" date is ${expected.date}`);
      tst.equal(count, expected.count, `"${expected.title}" has ${expected.count}`);
      tst.ok(countries?.includes(expected.country), `"${expected.title}" shows ${expected.country} (got: ${countries})`);
    }
  },
};
