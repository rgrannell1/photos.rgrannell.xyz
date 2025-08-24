
import tap from "tap";
import { openBrowser, openPage } from "../browser.mjs";

const browser = await openBrowser();

/*
 * Country testing
 *
 */
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


await tap.test("Known URLs are present", async test => {
  const page = await openPage(browser, "#/thing/country:ireland");

  const knownUrls = [
    "https://photos-cdn.rgrannell.xyz/4c92d4b408.webp",
    "https://photos-cdn.rgrannell.xyz/5e62180f7e.webp"
  ];

  await Promise.all(knownUrls.map(async url => {
    const img = await page.$(`img[src="${url}"]`);
    test.ok(img, `Image with src "${url}" should be present`);
  }));

  await page.close();
  test.end();
});

await tap.test("Check geoname images load", async test => {
  const page = await openPage(browser, "#/thing/geoname:6947520");

  const imgCount = await page.$$eval('img', imgs => imgs.filter(img => img.src.startsWith('https://photos-cdn.')).length);
  test.ok(imgCount >= 2, `Page should have at least 2 img tag, found ${imgCount}`);

  await page.close();
  test.end();
});

await tap.test("Hohenzollernbrücke page title is correct", async (test) => {
  const page = await openPage(browser, "#/thing/geoname:6947520");

  const title = await page.$eval('h1', el => el.textContent.trim());
  test.equal(title, "Hohenzollernbrücke", "Page title should be 'Hohenzollernbrücke'");

  await page.close();
  test.end();
});

await tap.test("Hohenzollernbrücke page has Wikipedia link", async (test) => {
  const page = await openPage(browser, "#/thing/geoname:6947520");

  const linkHandle = await page.$('a[href="https://en.wikipedia.org/wiki/Hohenzollern_Bridge"]');
  test.ok(linkHandle, "Wikipedia link should be present");

  if (linkHandle) {
    const linkText = await page.evaluate(el => el.textContent.trim(), linkHandle);
    test.equal(linkText, "[wikipedia]", "Wikipedia link text should be '[wikipedia]'");
  }

  await page.close();
  test.end();
});

await tap.test("Hohenzollernbrücke page has Maps link", async (test) => {
  const page = await openPage(browser, "#/thing/geoname:6947520");

  const mapsLinkHandle = await page.$('a[href="https://www.google.com/maps?q=50.94142,6.96535"]');
  test.ok(mapsLinkHandle, "Maps link should be present");

  if (mapsLinkHandle) {
    const linkText = await page.evaluate(el => el.textContent.trim(), mapsLinkHandle);
    test.equal(linkText, "[maps]", "Maps link text should be '[maps]'");
  }

  await page.close();
  test.end();
});

await browser.close();
