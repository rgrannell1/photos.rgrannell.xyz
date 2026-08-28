// Check: the album page renders with correct metadata
"use strict";

const { BASE_URL } = require("../helpers");

function firstMixedMediaAlbumId(page) {
  return page.evaluate(async () => {
    const env = await fetch("/manifest/env.json").then((res) => res.json());
    const triplesUrl = `/manifest/triples.${env.publication_id}.json`;
    const triples = await fetch(triplesUrl).then((res) => res.json());
    const subject = triples.find((triple) => {
      return triple[1] === "videosCount" && Number(triple[2]) > 0;
    })?.[0];
    return subject?.replace(/^\[i:album:/, "").replace(/\]$/, "");
  });
}

const trimmedText = (page, selector) =>
  page.$eval(selector, (el) => el.textContent?.trim());

/** @type {import('../types').BrowserCheck} */
module.exports = {
  name: "album page renders with correct metadata",
  async run(page, tst) {
    await page.setViewport({ width: 390, height: 844 });
    await page.goto(BASE_URL, { waitUntil: "load" });

    const albumId = await firstMixedMediaAlbumId(page);
    tst.ok(albumId, `found mixed-media album ID: ${albumId}`);

    await page.goto(`${BASE_URL}/#!/album/${albumId}`, { waitUntil: "load" });
    await page.waitForSelector("[data-testid='album-heading']", { timeout: 15_000 });

    const headingText = await trimmedText(page, "[data-testid='album-heading']");
    tst.ok(headingText && headingText.length > 0, `album heading reads "${headingText}"`);

    const dateText = await trimmedText(page, "[data-testid='album-date']");
    tst.ok(dateText && dateText.length > 0, `album date is present: "${dateText}"`);

    const countText = await trimmedText(page, "[data-testid='album-count']");
    tst.ok(/\d+ photos?/.test(countText ?? ""), `album count reads "${countText}"`);

    const gridSelector = "[data-testid='album-photo-grid'] img";
    const photoGridCount = await page.$$eval(gridSelector, (els) => els.length);
    tst.ok(photoGridCount > 0, `album photo grid has ${photoGridCount} images`);

    await page.waitForSelector(".video-container video", { timeout: 15_000 });
    const gridGap = await page.evaluate(() => {
      const photoGrid = document.querySelector("[data-testid='album-photo-grid']");
      const videoGrid = document.querySelector("main > .video-container");
      return videoGrid.getBoundingClientRect().top - photoGrid.getBoundingClientRect().bottom;
    });
    tst.equal(gridGap, 10, "mobile album media grids have a 10px gap");
  },
};
