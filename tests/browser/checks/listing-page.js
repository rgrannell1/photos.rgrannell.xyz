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

const trimmedText = (page, selector) =>
  page.$eval(selector, (el) => el.textContent?.trim());

/** @type {import('../types').BrowserCheck} */
module.exports = {
  name: "listing pages render title and species cards",
  async run(page, tst) {
    for (const expected of EXPECTED_LISTINGS) {
      // Navigate to root first so Mithril re-initialises the route on each iteration
      await page.goto(BASE_URL, { waitUntil: "load" });
      const listingUrl = `${BASE_URL}/#!/listing/${expected.type}`;
      await page.goto(listingUrl, { waitUntil: "load" });
      await page.waitForSelector("[data-testid='listing-title']", { timeout: 15_000 });

      const titleText = await trimmedText(page, "[data-testid='listing-title']");
      const titleMsg = `listing/${expected.type} has title "${expected.title}"`;
      tst.equal(titleText, expected.title, titleMsg);

      const cardSelector = "[data-testid='listing-cards'] .photo-album";
      const cardCount = await page.$$eval(cardSelector, (els) => els.length);
      tst.ok(cardCount > 0, `listing/${expected.type} shows ${cardCount} cards`);

      const detailsText = await trimmedText(page, "[data-testid='listing-details']");
      const detailsMsg = `listing/${expected.type} has non-empty details`;
      tst.ok(detailsText && detailsText.length > 0, detailsMsg);
    }
  },
};
