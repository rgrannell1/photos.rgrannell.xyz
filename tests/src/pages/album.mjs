import tap from "tap";
import { openBrowser, openPage } from "../browser.mjs";

const browser = await openBrowser();

/*
 * Country testing
 */
await tap.test("Album page renders descriptions", async (test) => {
  const page = await openPage(browser, "#/album/cologne-25");
  const description = await page.$eval(
    ".photo-album-description",
    (el) => el.textContent.trim(),
  );
  test.match(
    description,
    /enormous cathedral/,
    "Description should contain 'enormous cathedral'",
  );

  await page.close();
  test.end();
});

await tap.test("Album page renders photo count", async (test) => {
  const page = await openPage(browser, "#/album/cologne-25");
  const photoCount = await page.$eval(
    ".photo-album-count",
    (el) => el.textContent.trim(),
  );
  test.equal(photoCount, "3 photos", "Photo count should be '3 photos'");

  await page.close();
  test.end();
});

await tap.test("Album page renders country flag", async (test) => {
  const page = await openPage(browser, "#/album/cologne-25");
  const flag = await page.$('span[title="Germany"]');
  test.ok(flag, "Country flag (Germany) should exist");

  const flagText = await page.$eval(
    'span[title="Germany"]',
    (el) => el.textContent.trim(),
  );
  test.equal(flagText, "🇩🇪", "Country flag should be the German flag emoji");
  await page.close();
  test.end();
});

await browser.close();
