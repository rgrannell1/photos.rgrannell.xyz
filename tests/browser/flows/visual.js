// Browser preparation for stable visual comparisons.

"use strict";

async function openFixedAboutPage(page) {
  await page.clock.setFixedTime(new Date("2026-09-01T12:00:00Z"));
  await page.goto("/?bust=visual#!/about");
  await page.locator(".about-page").waitFor();
}

async function openFixedAlbumsPage(page) {
  await page.clock.setFixedTime(new Date("2026-09-01T12:00:00Z"));
  await page.goto("/?bust=visual#!/albums");
  await page.getByTestId("album-row").first().waitFor();
}

module.exports = { openFixedAboutPage, openFixedAlbumsPage };
