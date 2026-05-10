// Check: the photo page renders an H1 'Photo'
"use strict";

const { BASE_URL } = require("../helpers");

async function firstPhotoId(page) {
  return page.evaluate(async () => {
    const env = await fetch("/manifest/env.json").then((res) => res.json());
    const triples = await fetch(`/manifest/triples.${env.publication_id}.json`).then((res) => res.json());
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
    await page.waitForFunction(
      () => document.querySelector("h1")?.textContent?.trim() === "Photo",
      { timeout: 15_000 },
    );

    const h1Text = await page.$eval("h1", (el) => el.textContent?.trim());
    tst.equal(h1Text, "Photo");
  },
};
