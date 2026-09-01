// Overflow properties across routes and responsive boundaries.

"use strict";

const { test } = require("../fixtures/application");
const { OVERFLOW_CASES, OVERFLOW_WIDTHS } = require("../data/layout");
const {
  expectCardsWithinViewport,
  expectMainContentWithinViewport,
  expectNoHorizontalOverflow,
} = require("../expectations/layout");

for (const testCase of OVERFLOW_CASES) {
  test(`${testCase.name} has no horizontal overflow`, async ({ page }) => {
    await page.setViewportSize({ width: OVERFLOW_WIDTHS[0], height: 844 });
    await page.goto(testCase.route);
    await page.locator(testCase.ready).first().waitFor();

    for (const width of OVERFLOW_WIDTHS) {
      await page.setViewportSize({ width, height: 844 });
      const context = `${testCase.name} at ${width}px`;
      await expectMainContentWithinViewport(page, context);
      await expectCardsWithinViewport(page, testCase.cards, context);
      await expectNoHorizontalOverflow(page, context);
    }
  });
}
