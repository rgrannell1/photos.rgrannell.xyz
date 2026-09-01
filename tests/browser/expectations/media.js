// Media expectations shared by browser journeys.

"use strict";

const { expect } = require("@playwright/test");

function readBrokenVisibleImages(images) {
  return images.flatMap((image) => {
    const bounds = image.getBoundingClientRect();
    const isVisible =
      bounds.width > 0 &&
      bounds.height > 0 &&
      bounds.bottom > 0 &&
      bounds.top < window.innerHeight &&
      bounds.right > 0 &&
      bounds.left < window.innerWidth;
    const hasPixels = image.complete && image.naturalWidth > 0;
    return isVisible && !hasPixels ? [image.currentSrc || image.src] : [];
  });
}

async function collectBrokenVisibleImages(context) {
  const sources = [];
  for (const page of context.pages()) {
    if (page.isClosed()) continue;
    const broken = await page.locator("img").evaluateAll(readBrokenVisibleImages);
    sources.push(...broken);
  }
  return sources;
}

async function expectVisibleImagesLoaded(context) {
  const collectBroken = collectBrokenVisibleImages.bind(null, context);
  await expect.poll(collectBroken, { message: "broken visible images" }).toEqual([]);
}

function readMissingVisiblePlaceholders(images) {
  return images.flatMap((image) => {
    const bounds = image.getBoundingClientRect();
    const isVisible = bounds.bottom > 0 && bounds.top < window.innerHeight;
    if (!isVisible) return [];

    const placeholder = image.parentElement.querySelector(".thumbnail-placeholder");
    const hasPlaceholder =
      placeholder !== null &&
      placeholder.complete &&
      placeholder.naturalWidth > 0;
    return hasPlaceholder ? [] : [image.currentSrc || image.src];
  });
}

async function expectVisiblePhotoFallbacks(page) {
  const photos = page.locator("img.thumbnail-image:not(.thumbnail-placeholder)");
  const missing = await photos.evaluateAll(readMissingVisiblePlaceholders);
  expect(missing, "visible photos without placeholders").toEqual([]);
}

module.exports = { expectVisibleImagesLoaded, expectVisiblePhotoFallbacks };
