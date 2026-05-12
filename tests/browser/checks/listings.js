// Check: listings page renders heading and category cards
"use strict";

const { BASE_URL } = require("../helpers");

/**
 * @typedef {{ type: string, label: string }} CategoryExpectation
 */

/** @type {CategoryExpectation[]} */
const EXPECTED_CATEGORIES = [
  { type: "bird",   label: "Birds"   },
  { type: "mammal", label: "Mammals" },
  { type: "place",  label: "Places"  },
];

/** @type {import('../types').BrowserCheck} */
module.exports = {
  name: "listings page has H1 'Listings'",
  async run(page, tst) {
    await page.goto(`${BASE_URL}/#/listings`, { waitUntil: "load" });
    await page.waitForSelector("[data-testid='listings-heading']", { timeout: 15_000 });

    const headingText = await page.$eval("[data-testid='listings-heading']", (el) => el.textContent?.trim());
    tst.equal(headingText, "Listings", "listings page heading is 'Listings'");

    await page.waitForSelector("[data-testid='listings-grid']", { timeout: 15_000 });

    for (const expected of EXPECTED_CATEGORIES) {
      const cardEl = await page.$(`[data-testid='listing-card-label'][data-listing-type='${expected.type}']`);
      tst.ok(cardEl, `listings grid has "${expected.label}" card`);

      if (!cardEl) continue;
      const labelText = await cardEl.evaluate((el) => el.textContent?.trim());
      tst.equal(labelText, expected.label, `"${expected.type}" card label reads "${expected.label}"`);
    }
  },
};
