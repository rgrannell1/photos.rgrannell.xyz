// Check: the album page renders with correct metadata
"use strict";

const { BASE_URL } = require("../helpers");

async function firstAlbumId(page) {
  return page.evaluate(async () => {
    const env = await fetch("/manifest/env.json").then((res) => res.json());
    const triples = await fetch(`/manifest/triples.${env.publication_id}.json`).then((res) => res.json());
    const subject = triples.find((triple) => String(triple[0]).includes("album:"))?.[0];
    return subject?.replace(/^\[i:album:/, "").replace(/\]$/, "");
  });
}

/** @type {import('../types').BrowserCheck} */
module.exports = {
  name: "album page renders with correct metadata",
  async run(page, tst) {
    await page.goto(BASE_URL, { waitUntil: "load" });

    const albumId = await firstAlbumId(page);
    tst.ok(albumId, `found album ID: ${albumId}`);

    await page.goto(`${BASE_URL}/#!/album/${albumId}`, { waitUntil: "load" });
    await page.waitForSelector("[data-testid='album-heading']", { timeout: 15_000 });

    const headingText = await page.$eval("[data-testid='album-heading']", (el) => el.textContent?.trim());
    tst.ok(headingText && headingText.length > 0, `album heading reads "${headingText}"`);

    const dateText = await page.$eval("[data-testid='album-date']", (el) => el.textContent?.trim());
    tst.ok(dateText && dateText.length > 0, `album date is present: "${dateText}"`);

    const countText = await page.$eval("[data-testid='album-count']", (el) => el.textContent?.trim());
    tst.ok(/\d+ photos?/.test(countText ?? ""), `album count reads "${countText}"`);

    const photoGridCount = await page.$$eval("[data-testid='album-photo-grid'] img", (els) => els.length);
    tst.ok(photoGridCount > 0, `album photo grid has ${photoGridCount} images`);
  },
};
