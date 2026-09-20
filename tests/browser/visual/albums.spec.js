// Visual contracts for a fixed album card.

"use strict";

const { expect, test } = require("../fixtures/application");
const { VISUAL_VIEWPORTS } = require("../data/visual-media");
const { fixedAlbumRow, openFixedAlbumsPage } = require("../flows/visual");

for (const viewport of VISUAL_VIEWPORTS) {
  test(`an album card matches the ${viewport.name} baseline`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await openFixedAlbumsPage(page);

    await expect(fixedAlbumRow(page)).toHaveScreenshot(
      `album-card-${viewport.name}.png`,
      { animations: "disabled", caret: "hide" },
    );
  });
}
