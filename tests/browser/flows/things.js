// Browser actions for thing and referenced-media journeys.

"use strict";

const { VIDEO_ONLY_THING } = require("../data/things");

async function openVideoOnlyThing(page) {
  await page.goto(VIDEO_ONLY_THING.route);
  await page.locator(VIDEO_ONLY_THING.ready).first().waitFor();
}

async function selectReferencedVideo(page) {
  await page.locator('a.photo-metadata-popover[href*="/video/"]').first().click();
  await page.getByRole("heading", { level: 1, name: "Video" }).waitFor();
}

async function openReferencedVideo(page) {
  await openVideoOnlyThing(page);
  await selectReferencedVideo(page);
}

async function openReferencedAlbum(page) {
  await openReferencedVideo(page);
  await page.getByRole("link", { name: "[album]" }).click();
  await page.getByTestId("album-photo-grid").waitFor();
  await page.locator("main > .video-container").waitFor();
}

module.exports = {
  openReferencedAlbum,
  openReferencedVideo,
  openVideoOnlyThing,
  selectReferencedVideo,
};
