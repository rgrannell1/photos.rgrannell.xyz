// User journeys through the albums routes.

"use strict";

const { expect, test } = require("../fixtures/application");
const {
  openAlbums,
  openFirstAlbum,
  openFirstAlbumInNewTab,
  selectFirstCountry,
} = require("../flows/albums");
const { expectAlbumsMatchCountry } = require("../expectations/albums");
const { expectVisibleImagesLoaded } = require("../expectations/media");

test("the albums catalogue boots from the built application", async ({ page }) => {
  await openAlbums(page);

  await expect(page.locator('.album-banner[aria-label="Albums"]')).toBeVisible();
  await expect(page.getByTestId("album-row").first()).toBeVisible();
});

test("an album link supports normal and new-tab navigation", async ({ context, page }) => {
  await openAlbums(page);

  const newPage = await openFirstAlbumInNewTab(page);
  await expect(newPage.getByTestId("album-heading")).toBeVisible();
  await expectVisibleImagesLoaded(context);
  await newPage.close();

  const albumName = await openFirstAlbum(page);
  await expect(page.getByTestId("album-heading")).toHaveText(albumName);
  await expect(page.getByTestId("album-date")).not.toBeEmpty();
  await expect(page.getByTestId("album-count")).toHaveText(/\d+ photos?/);
  await expect(page.getByTestId("album-photo-grid").locator("img").first())
    .toBeVisible();
  await expect(page).toHaveURL(/#!\/album\//);
});

test("country filtering changes route state and hides year recaps", async ({ page }) => {
  await openAlbums(page);
  const initialCount = await page.getByTestId("album-row").count();

  const { country, countryName } = await selectFirstCountry(page);
  await expect(page).toHaveURL(/#!\/albums\/.+/);
  await expect(country).toHaveClass(/country-filter-flag--selected/);
  await expect(page.locator(".year-recap")).toHaveCount(0);
  expect(countryName).not.toBeNull();
  await expectAlbumsMatchCountry(page, countryName);
  expect(await page.getByTestId("album-row").count()).toBeLessThan(initialCount);

  await country.click();
  await expect(page).toHaveURL(/#!\/albums$/);
});

test("photo details preserve browser history", async ({ page }) => {
  await openAlbums(page);
  const albumName = await openFirstAlbum(page);

  await page.locator('a.photo-metadata-popover[href*="/photo/"]').first().click();
  await expect(page.getByTestId("photo-heading")).toHaveText("Photo");
  await expect(page).toHaveURL(/#!\/photo\//);
  await expect(page.getByTestId("photo-links")).toBeVisible();
  await expect(page.getByTestId("photo-links").getByRole("link")).not.toHaveCount(0);

  await page.goBack();
  await expect(page.getByTestId("album-heading")).toHaveText(albumName);

  await page.goForward();
  await expect(page.getByTestId("photo-heading")).toHaveText("Photo");
});
