// User journeys through listings and mobile navigation.

"use strict";

const { expect, test } = require("../fixtures/application");
const {
  collectListingContracts,
  openListingContract,
} = require("../flows/listings");

test("a listing category preserves browser history", async ({ page }) => {
  await page.goto("/?bust=playwright#!/listings");
  const category = page.locator('[data-testid="listings-grid"] a[href*="/listing/"]').first();
  await category.waitFor();
  const route = await category.getAttribute("href");

  await category.click();
  await expect(page.getByTestId("listing-title")).toBeVisible();
  await expect(page.getByTestId("listing-cards").locator(".photo-album").first())
    .toBeVisible();

  await page.goBack();
  await expect(page.getByTestId("listings-heading")).toHaveText("Listings");

  await page.goForward();
  await expect(page).toHaveURL(new RegExp(`${route}$`));
  await expect(page.getByTestId("listing-title")).toBeVisible();
});

test("mobile navigation reaches the life list", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/?bust=playwright#!/albums");

  await page.locator(".burger").click();
  await expect(page.locator(".photo-sidebar")).toHaveClass(/sidebar-visible/);
  await page.getByRole("link", { name: "LIFE LIST" }).click();

  await expect(page.locator(".checklist-grid").first()).toBeVisible();
  await expect(page).toHaveURL(/#!\/life-list/);
  await expect(page.locator(".photo-sidebar")).not.toHaveClass(/sidebar-visible/);
});

test("every advertised listing route has matching content", async ({ page }) => {
  const contracts = await collectListingContracts(page);
  expect(contracts.length).toBeGreaterThan(0);

  for (const contract of contracts) {
    await openListingContract(page, contract);
    await expect(page.getByTestId("listing-title")).toHaveText(contract.title);
    await expect(page.getByTestId("listing-cards").locator(".photo-album").first())
      .toBeVisible();
  }
});

test("the About introduction links only its first sentence", async ({ page }) => {
  await page.goto("/?bust=about#!/about");

  const ratedPhotos = page.locator('.about-page a[href$="/thing/rating:4"]');
  await expect(ratedPhotos).toHaveText("I found beautiful in this world.");
});
