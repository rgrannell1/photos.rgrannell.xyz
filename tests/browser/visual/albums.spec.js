// Visual contracts for the first album card.

"use strict";

const { expect, test } = require("../fixtures/application");
const { VISUAL_VIEWPORTS } = require("../data/visual-media");
const { openFixedAlbumsPage } = require("../flows/visual");

for (const viewport of VISUAL_VIEWPORTS) {
  test(`an album card matches the ${viewport.name} baseline`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await openFixedAlbumsPage(page);

    await expect(page.getByTestId("album-row").first()).toHaveScreenshot(
      `album-card-${viewport.name}.png`,
      { animations: "disabled", caret: "hide" },
    );
  });
}
