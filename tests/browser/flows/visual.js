// Browser preparation for stable visual comparisons.

"use strict";

const { VISUAL_ALBUM_TITLE } = require("../data/visual-media");

// The album card the visual baselines were captured from.
function fixedAlbumRow(page) {
  return page.locator(
    `[data-testid="album-row"][data-album-title="${VISUAL_ALBUM_TITLE}"]`,
  );
}

async function openFixedAboutPage(page) {
  await page.clock.setFixedTime(new Date("2026-09-01T12:00:00Z"));
  await page.goto("/?bust=visual#!/about");
  await page.locator(".about-page").waitFor();
}

async function openFixedAlbumsPage(page) {
  await page.clock.setFixedTime(new Date("2026-09-01T12:00:00Z"));
  await page.goto("/?bust=visual#!/albums");
  await fixedAlbumRow(page).waitFor();
}

module.exports = { fixedAlbumRow, openFixedAboutPage, openFixedAlbumsPage };
