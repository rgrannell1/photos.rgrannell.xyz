// User journeys through thing and video routes.

"use strict";

const { expect, test } = require("../fixtures/application");
const {
  openVideoOnlyThing,
  selectReferencedVideo,
} = require("../flows/things");

test("a video-only thing leads to its video details", async ({ page }) => {
  await openVideoOnlyThing(page);

  const headings = await page.locator(".thing-page h3").allTextContents();
  expect(headings).toContain("Videos");
  expect(headings).not.toContain("Photos");

  await selectReferencedVideo(page);
  await expect(page.getByRole("heading", { level: 1, name: "Video" })).toBeVisible();
  await expect(page).toHaveURL(/#!\/video\//);
  await expect(page.getByRole("link", { name: "[album]" })).toBeVisible();
});
