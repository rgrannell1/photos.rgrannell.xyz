// User journeys through the cached application without a network.

"use strict";

const { expect, test } = require("../fixtures/application");
const { PHOTO_CDN_PATTERN } = require("../data/visual-media");
const {
  collectServiceWorkerResponse,
  isNavigationResponse,
  warmOfflineApplication,
} = require("../flows/offline");
const { expectVisiblePhotoFallbacks } = require("../expectations/media");

test("a warm application reloads and routes offline", async ({
  applicationErrors,
  context,
  page,
}) => {
  await warmOfflineApplication(page);
  await context.unroute(PHOTO_CDN_PATTERN);

  const cachedUrls = [];
  context.on("response", collectServiceWorkerResponse.bind(null, cachedUrls));
  applicationErrors.startOffline();
  await context.setOffline(true);

  const navigationResponse = page.waitForResponse(isNavigationResponse);
  const [, response] = await Promise.all([page.reload(), navigationResponse]);
  expect(response.fromServiceWorker()).toBe(true);
  await expect(page.getByTestId("album-row").first()).toBeVisible();
  await expectVisiblePhotoFallbacks(page);

  await page.goto("/?bust=offline-route#!/listings");
  await expect(page.getByTestId("listings-heading")).toHaveText("Listings");
  await page.locator('[data-testid="listings-grid"] a').first().click();
  await expect(page.getByTestId("listing-title")).toBeVisible();

  expect(cachedUrls.some((url) => url.includes("/dist/js/app."))).toBe(true);
  expect(cachedUrls.some((url) => url.includes("/manifest/tribbles."))).toBe(true);
});
