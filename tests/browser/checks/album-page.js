// Check: the album page renders an H1 with the album name
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
  name: "album page renders an H1",
  async run(page, tst) {
    await page.goto(BASE_URL, { waitUntil: "load" });

    const albumId = await firstAlbumId(page);
    tst.ok(albumId, `found album ID: ${albumId}`);

    await page.goto(`${BASE_URL}/#!/album/${albumId}`, { waitUntil: "load" });
    await page.waitForFunction(
      () => {
        const text = document.querySelector("h1")?.textContent?.trim();
        return text && text !== "Albums";
      },
      { timeout: 15_000 },
    );

    const h1Text = await page.$eval("h1", (el) => el.textContent?.trim());
    tst.ok(h1Text && h1Text.length > 0, `album H1 reads "${h1Text}"`);
  },
};
