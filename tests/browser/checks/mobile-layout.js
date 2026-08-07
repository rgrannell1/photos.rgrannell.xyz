// Check: mobile viewport shows page headings and does not overflow horizontally
"use strict";

const { BASE_URL } = require("../helpers");

const MOBILE_VIEWPORT = { width: 390, height: 844 };

/**
 * @typedef {Object} MobileLayoutCase
 * @property {string} route
 * @property {string} readySelector css selector that marks the page as loaded
 * @property {string | null} headingSelector heading that must be visible
 * @property {string | null} captionSelector caption that must start on-screen
 */

/** @type {MobileLayoutCase[]} */
const CASES = [
  {
    route: "#!/life-list",
    readySelector: ".checklist-table",
    headingSelector: "h1.albums-header",
    captionSelector: null,
  },
  {
    route: "#!/listing/bird",
    readySelector: "[data-testid='listing-cards'] .photo-album",
    headingSelector: "[data-testid='listing-title']",
    captionSelector: ".photo-album-title",
  },
  {
    route: "#!/listings",
    readySelector: "[data-testid='listings-grid'] .photo-album",
    headingSelector: "[data-testid='listings-heading']",
    captionSelector: "[data-testid='listing-card-label']",
  },
];

const isVisible = (page, selector) =>
  page.$eval(selector, (el) => {
    const rect = el.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0;
  }).catch(() => false);

const leftEdge = (page, selector) =>
  page.$eval(selector, (el) => el.getBoundingClientRect().left);

/** @type {import('../types').BrowserCheck} */
module.exports = {
  name: "mobile layout shows headings without horizontal overflow",
  async run(page, tst) {
    await page.setViewport(MOBILE_VIEWPORT);

    for (const testCase of CASES) {
      await page.goto(BASE_URL, { waitUntil: "load" });
      await page.goto(`${BASE_URL}/${testCase.route}`, { waitUntil: "load" });
      await page.waitForSelector(testCase.readySelector, { timeout: 15_000 });

      const scrollWidth = await page.evaluate(() =>
        document.documentElement.scrollWidth
      );
      tst.ok(
        scrollWidth <= MOBILE_VIEWPORT.width,
        `${testCase.route} does not overflow (scrollWidth ${scrollWidth})`,
      );

      if (testCase.headingSelector) {
        const visible = await isVisible(page, testCase.headingSelector);
        tst.ok(visible, `${testCase.route} heading is visible`);
      }

      if (testCase.captionSelector) {
        const left = await leftEdge(page, testCase.captionSelector);
        tst.ok(
          left >= 0,
          `${testCase.route} caption starts on-screen (left ${left})`,
        );
      }
    }
  },
};
