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

    const headingSelector = "[data-testid='listings-heading']";
    const headingText = await page.$eval(headingSelector, (el) => el.textContent?.trim());
    tst.equal(headingText, "Listings", "listings page heading is 'Listings'");

    await page.waitForSelector("[data-testid='listings-grid']", { timeout: 15_000 });

    for (const expected of EXPECTED_CATEGORIES) {
      const cardSelector =
        `[data-testid='listing-card-label'][data-listing-type='${expected.type}']`;
      const cardEl = await page.$(cardSelector);
      tst.ok(cardEl, `listings grid has "${expected.label}" card`);

      if (!cardEl) continue;
      const labelText = await cardEl.evaluate((el) => el.textContent?.trim());
      const labelMsg = `"${expected.type}" card label reads "${expected.label}"`;
      tst.equal(labelText, expected.label, labelMsg);
    }
  },
};
