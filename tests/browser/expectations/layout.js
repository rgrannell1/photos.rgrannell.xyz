// Layout expectations shared by responsive browser properties.

"use strict";

const { expect } = require("@playwright/test");

async function expectNoHorizontalOverflow(page, context) {
  const dimensions = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }));
  expect(dimensions.scrollWidth, context).toBeLessThanOrEqual(dimensions.clientWidth);
}

async function expectCardsWithinViewport(page, selector, context) {
  const overflows = await page.locator(selector).evaluateAll((cards) => {
    const viewportWidth = document.documentElement.clientWidth;
    return cards.flatMap((card, idx) => {
      const bounds = card.getBoundingClientRect();
      const isInside = bounds.left >= 0 && bounds.right <= viewportWidth;
      return isInside ? [] : [{ idx, left: bounds.left, right: bounds.right }];
    });
  });
  expect(overflows, context).toEqual([]);
}

function readMainOverflow() {
  const main = document.querySelector("main");
  const viewportWidth = document.documentElement.clientWidth;
  const selectors = [
    "h1",
    "h2",
    "h3",
    "p",
    "li",
    "td",
    "th",
    "img",
    "video",
    "[data-testid]",
    ".photo-album",
    ".checklist-card",
  ].join(",");
  const elements = [main, ...main.querySelectorAll(selectors)];

  return elements.flatMap((element) => {
    const bounds = element.getBoundingClientRect();
    if (bounds.width === 0 || bounds.height === 0) return [];

    const edgeOverflow = Math.max(-bounds.left, bounds.right - viewportWidth, 0);
    const isMain = element === main;
    const contentOverflow = isMain
      ? 0
      : Math.max(element.scrollWidth - element.clientWidth, 0);
    if (edgeOverflow <= 0.5 && contentOverflow <= 0.5) return [];

    const testId = element.getAttribute("data-testid");
    const suffix = testId ? `[data-testid="${testId}"]` : `.${element.className}`;
    return [{
      contentOverflow,
      edgeOverflow,
      element: `${element.tagName.toLowerCase()}${suffix}`,
    }];
  });
}

async function expectMainContentWithinViewport(page, context) {
  const overflows = await page.evaluate(readMainOverflow);
  expect(overflows, context).toEqual([]);
}

module.exports = {
  expectCardsWithinViewport,
  expectMainContentWithinViewport,
  expectNoHorizontalOverflow,
};
