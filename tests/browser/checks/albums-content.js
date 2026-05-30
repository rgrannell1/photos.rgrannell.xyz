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
    await page.waitForSelector("[data-testid='album-row']", { timeout: 15_000 });

    const albumCount = await page.$$eval("[data-testid='album-row']", (els) => els.length);
    tst.ok(albumCount > 0, `${albumCount} album cards visible`);

    for (const expected of EXPECTED_ALBUMS) {
      const rowSelector =
        `[data-testid='album-row'][data-album-title='${expected.title}']`;
      const matched = await page.$(rowSelector);

      tst.ok(matched, `album "${expected.title}" present`);
      if (!matched) continue;

      const date = await textOf(matched, "[data-testid='album-date']");
      const count = await textOf(matched, "[data-testid='album-count']");
      const countries = await textOf(matched, "[data-testid='album-countries']");

      tst.equal(date, expected.date, `"${expected.title}" date is ${expected.date}`);
      tst.equal(count, expected.count, `"${expected.title}" has ${expected.count}`);

      const hasCountry = countries?.includes(expected.country);
      const countryMsg =
        `"${expected.title}" shows ${expected.country} (got: ${countries})`;
      tst.ok(hasCountry, countryMsg);
    }
  },
};
