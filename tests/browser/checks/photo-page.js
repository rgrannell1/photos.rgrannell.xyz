// Check: the photo page renders with heading and download links
"use strict";

const { BASE_URL } = require("../helpers");

async function firstPhotoId(page) {
  return page.evaluate(async () => {
    const env = await fetch("/manifest/env.json").then((res) => res.json());
    const triplesUrl = `/manifest/triples.${env.publication_id}.json`;
    const triples = await fetch(triplesUrl).then((res) => res.json());
    const subject = triples.find((triple) => String(triple[0]).includes("photo:"))?.[0];
    return subject?.replace(/^\[i:photo:/, "").replace(/\]$/, "");
  });
}

/** @type {import('../types').BrowserCheck} */
module.exports = {
  name: "photo page renders an H1 'Photo'",
  async run(page, tst) {
    await page.goto(BASE_URL, { waitUntil: "load" });

    const photoId = await firstPhotoId(page);
    tst.ok(photoId, `found photo ID: ${photoId}`);

    await page.goto(`${BASE_URL}/#!/photo/${photoId}`, { waitUntil: "load" });
    await page.waitForSelector("[data-testid='photo-heading']", { timeout: 15_000 });

    const headingSelector = "[data-testid='photo-heading']";
    const headingText = await page.$eval(headingSelector, (el) => el.textContent?.trim());
    tst.equal(headingText, "Photo", `photo heading reads "${headingText}"`);

    const linksEl = await page.$("[data-testid='photo-links']");
    tst.ok(linksEl, "photo download links are present");
  },
};
