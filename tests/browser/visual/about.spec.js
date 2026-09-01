// Visual contracts for the About page.

"use strict";

const { expect, test } = require("../fixtures/application");
const { openFixedAboutPage } = require("../flows/visual");
const { VISUAL_VIEWPORTS } = require("../data/visual-media");

for (const viewport of VISUAL_VIEWPORTS) {
  test(`the About page matches the ${viewport.name} baseline`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await openFixedAboutPage(page);

    await expect(page.locator("main")).toHaveScreenshot(
      `about-${viewport.name}.png`,
      { animations: "disabled", caret: "hide" },
    );
  });
}
