// Check: individual listing pages render correct title and at least one species card
"use strict";

const { BASE_URL } = require("../helpers");

/**
 * @typedef {{ type: string, title: string, hasDetails: boolean }} ListingExpectation
 */

/** @type {ListingExpectation[]} */
const EXPECTED_LISTINGS = [
  { type: "bird",   title: "Birds",   hasDetails: true  },
  { type: "mammal", title: "Mammals", hasDetails: true  },
];

/** @type {import('../types').BrowserCheck} */
module.exports = {
  name: "listing pages render title and species cards",
  async run(page, tst) {
    for (const expected of EXPECTED_LISTINGS) {
      // Navigate to root first so Mithril re-initialises the route on each iteration
      await page.goto(BASE_URL, { waitUntil: "load" });
      await page.goto(`${BASE_URL}/#!/listing/${expected.type}`, { waitUntil: "load" });
      await page.waitForSelector("h1.albums-header", { timeout: 15_000 });

      const h1Text = await page.$eval("h1.albums-header", (el) => el.textContent?.trim());
      tst.equal(h1Text, expected.title, `listing/${expected.type} has H1 "${expected.title}"`);

      const cardCount = await page.$$eval(".photo-album", (els) => els.length);
      tst.ok(cardCount > 0, `listing/${expected.type} shows ${cardCount} cards`);

      const detailsText = await page.$eval("p.listing-details", (el) => el.textContent?.trim());
      tst.ok(detailsText && detailsText.length > 0, `listing/${expected.type} has non-empty details`);
    }
  },
};
