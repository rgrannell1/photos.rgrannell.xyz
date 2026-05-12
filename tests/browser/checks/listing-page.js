// Check: individual listing pages render correct title and at least one species card
"use strict";

const { BASE_URL } = require("../helpers");

/**
 * @typedef {{ type: string, title: string }} ListingExpectation
 */

/** @type {ListingExpectation[]} */
const EXPECTED_LISTINGS = [
  { type: "bird",   title: "Birds"   },
  { type: "mammal", title: "Mammals" },
];

/** @type {import('../types').BrowserCheck} */
module.exports = {
  name: "listing pages render title and species cards",
  async run(page, tst) {
    for (const expected of EXPECTED_LISTINGS) {
      // Navigate to root first so Mithril re-initialises the route on each iteration
      await page.goto(BASE_URL, { waitUntil: "load" });
      await page.goto(`${BASE_URL}/#!/listing/${expected.type}`, { waitUntil: "load" });
      await page.waitForSelector("[data-testid='listing-title']", { timeout: 15_000 });

      const titleText = await page.$eval("[data-testid='listing-title']", (el) => el.textContent?.trim());
      tst.equal(titleText, expected.title, `listing/${expected.type} has title "${expected.title}"`);

      const cardCount = await page.$$eval("[data-testid='listing-cards'] .photo-album", (els) => els.length);
      tst.ok(cardCount > 0, `listing/${expected.type} shows ${cardCount} cards`);

      const detailsText = await page.$eval("[data-testid='listing-details']", (el) => el.textContent?.trim());
      tst.ok(detailsText && detailsText.length > 0, `listing/${expected.type} has non-empty details`);
    }
  },
};
