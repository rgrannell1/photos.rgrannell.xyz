// Relative media layout properties across bounded mobile widths.

"use strict";

const { expect, test } = require("../fixtures/application");
const { MOBILE_WIDTHS } = require("../data/layout");
const { openReferencedAlbum } = require("../flows/things");

const LIFE_LIST_ROUTE = "/?bust=media-layout#!/life-list/ireland";
const WIDTH_TOLERANCE = 0.5;

function readCardWidths(page) {
  return page.locator(".checklist-card").evaluateAll((cards) => {
    return cards.map((card) => ({
      isMystery: card.classList.contains("checklist-card--mystery"),
      width: card.querySelector("img, .mystery-bird").getBoundingClientRect().width,
    }));
  });
}

function expectMatchingCardWidths(cardWidths, context) {
  const photographed = cardWidths.filter((card) => !card.isMystery);
  const mysteries = cardWidths.filter((card) => card.isMystery);
  expect(photographed.length, `${context}: photographed cards`).toBeGreaterThan(0);
  expect(mysteries.length, `${context}: mystery cards`).toBeGreaterThan(0);

  const expectedWidth = photographed[0].width;
  const differences = cardWidths.map((card) => Math.abs(card.width - expectedWidth));
  expect(Math.max(...differences), context).toBeLessThanOrEqual(WIDTH_TOLERANCE);
}

function readAlbumMediaGap(page) {
  return page.evaluate(() => {
    const photoGrid = document.querySelector('[data-testid="album-photo-grid"]');
    const videoGrid = document.querySelector("main > .video-container");
    return videoGrid.getBoundingClientRect().top -
      photoGrid.getBoundingClientRect().bottom;
  });
}

test("life-list media has one width at every mobile viewport", async ({ page }) => {
  await page.setViewportSize({ width: MOBILE_WIDTHS[0], height: 844 });
  await page.goto(LIFE_LIST_ROUTE);
  await page.locator(".checklist-card--mystery").first().waitFor();

  for (const width of MOBILE_WIDTHS) {
    await page.setViewportSize({ width, height: 844 });
    expectMatchingCardWidths(await readCardWidths(page), `life list at ${width}px`);
  }
});

test("album media keeps its gap at every mobile viewport", async ({ page }) => {
  await page.setViewportSize({ width: MOBILE_WIDTHS[0], height: 844 });
  await openReferencedAlbum(page);

  for (const width of MOBILE_WIDTHS) {
    await page.setViewportSize({ width, height: 844 });
    expect(await readAlbumMediaGap(page), `album at ${width}px`).toBe(10);
  }
});
