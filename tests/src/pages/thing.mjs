
import tap from "tap";
import { openBrowser, openPage } from "../browser.mjs";

const browser = await openBrowser();

await tap.test("Ireland's page title is 'Ireland'", async (test) => {
  const page = await openPage(browser, "#/thing/country:ireland");

  const title = await page.$eval('h1', el => el.textContent.trim());
  test.equal(title, "Ireland", "Page title should be 'Ireland'");

  await page.close();
  test.end();
});

await tap.test("Ireland's page has expected number of CDN image links", async (test) => {
  const page = await openPage(browser, "#/thing/country:ireland");
  const imgCount = await page.$$eval('img', imgs => imgs.filter(img => img.src.startsWith('https://photos-cdn.')).length);

  test.ok(imgCount >= 500, `Page should have at least 500 img tags, found ${imgCount}`);

  await page.close();
  test.end();
});

await tap.test("At least 450 images use lazy-loading", async (test) => {
  const page = await openPage(browser, "#/thing/country:ireland");
  const lazyCount = await page.$$eval('img', imgs =>
    imgs.filter(img => img.loading === 'lazy').length
  );

  test.ok(lazyCount >= 450, `At least 450 images should use lazy-loading, found ${lazyCount}`);

  await page.close();
  test.end();
});

await browser.close();
