// Check: mobile viewport shows page headings and does not overflow horizontally
"use strict";

const { BASE_URL } = require("../helpers");

const MOBILE_VIEWPORT = { width: 330, height: 844 };
const RESIZE_WIDTHS = Array.from(
  { length: 13 },
  (_unused, idx) => 260 + idx * 20,
);

/**
 * @typedef {Object} MobileLayoutCase
 * @property {string} route
 * @property {string} readySelector css selector that marks the page as loaded
 * @property {string | null} headingSelector heading that must be visible
 * @property {string | null} captionSelector caption that must start on-screen
 * @property {string | null} captionText caption that must stay inside its image
 */

/** @type {MobileLayoutCase[]} */
const CASES = [
  {
    route: "#!/life-list",
    readySelector: ".checklist-grid",
    headingSelector: "h1.albums-header",
    captionSelector: ".checklist-card-name",
    captionText: "Black-crowned Night Heron",
  },
  {
    route: "#!/listing/bird",
    readySelector: "[data-testid='listing-cards'] .photo-album",
    headingSelector: "[data-testid='listing-title']",
    captionSelector: ".photo-album-title",
    captionText: "Black-crowned Night Heron",
  },
  {
    route: "#!/listings",
    readySelector: "[data-testid='listings-grid'] .photo-album",
    headingSelector: "[data-testid='listings-heading']",
    captionSelector: "[data-testid='listing-card-label']",
    captionText: null,
  },
];

const isVisible = (page, selector) =>
  page.$eval(selector, (el) => {
    const rect = el.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0;
  }).catch(() => false);

const leftEdge = (page, selector) =>
  page.$eval(selector, (el) => el.getBoundingClientRect().left);

const captionOverflow = (page, selector, captionText) =>
  page.$$eval(selector, (elements, text) => {
    const caption = elements.find((element) => element.textContent.includes(text));
    const card = caption.closest(".photo-album, .checklist-card");
    const image = card.querySelector(".thumbnail-image");
    const metadata = caption.closest(
      ".photo-album-metadata, .checklist-card-metadata",
    );
    const metadataElements = [metadata, ...metadata.querySelectorAll("*")];
    const rightmost = metadataElements.reduce((current, element) =>
      element.getBoundingClientRect().right > current.getBoundingClientRect().right
        ? element
        : current
    );
    const imageRight = image.getBoundingClientRect().right;

    return {
      amount: rightmost.getBoundingClientRect().right - imageRight,
      element: rightmost.className,
    };
  }, captionText);

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

        if (testCase.captionText) {
          await page.waitForFunction(
            (captionText) => document.body.textContent.includes(captionText),
            {},
            testCase.captionText,
          );
          const overflow = await captionOverflow(
            page,
            testCase.captionSelector,
            testCase.captionText,
          );
          tst.ok(
            overflow.amount <= 0,
            `${testCase.route} caption fits its image ` +
              `(overflow ${overflow.amount} from ${overflow.element})`,
          );
        }
      }
    }

    await page.goto(`${BASE_URL}/#!/life-list`, { waitUntil: "load" });
    await page.waitForSelector(".checklist-grid", { timeout: 15_000 });
    await page.waitForFunction(
      (captionText) => document.body.textContent.includes(captionText),
      {},
      "Black-crowned Night Heron",
    );

    for (const width of RESIZE_WIDTHS) {
      await page.setViewport({ width, height: MOBILE_VIEWPORT.height });
      const overflow = await captionOverflow(
        page,
        ".checklist-card-name",
        "Black-crowned Night Heron",
      );
      tst.ok(
        overflow.amount <= 0,
        `life-list caption fits at ${width}px ` +
          `(overflow ${overflow.amount} from ${overflow.element})`,
      );
    }
  },
};
