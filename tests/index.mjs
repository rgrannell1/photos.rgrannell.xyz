import assert from "assert";
import puppeteer from "puppeteer";
import { promises as fs } from "fs";

class Artifacts {
  static async albums() {
    const data = JSON.parse(
      await fs.readFile(
        "/home/rg/Code/websites/photos.rgrannell.xyz/manifest/albums.json",
        "utf8",
      ),
    );

    const headers = data[0];
    const albumRows = [];

    for (const album of data.slice(1)) {
      const albumData = {};

      for (let idx = 0; idx < headers.length; idx++) {
        albumData[headers[idx]] = album[idx];
      }

      albumRows.push(albumData);
    }

    return albumRows;
  }
}

async function openBrowser() {
  return puppeteer.launch({ headless: true });
}

async function openPage(browser, path) {
  const ENDPOINT = "http://127.0.0.1:5501";
  const page = await browser.newPage({ headless: true });

  await page.goto(`${ENDPOINT}/index.html#${path}`, {
    waitUntil: "networkidle2",
  });

  return page;
}

const browser = await openBrowser();

for (const album of await Artifacts.albums()) {
  const {
    id,
    album_name: albumName,
    image_count: imageCount,
  } = album;

  var page;
  try {
    page = await openPage(browser, `/album/${id}`);
  } catch (err) {
    throw new Error(`failure while opening ${id}`, { cause: err });
  }

  const h1Text = await page.$eval("h1", (element) => element.textContent);

  // assert the title is set for the album
  assert.equal(h1Text, albumName);

  const imageCountText = await page.$eval(
    ".photo-album-count",
    (element) => element.textContent,
  );

  // assert the album count field is correct
  assert.equal(
    imageCountText,
    imageCount === 1 ? `${imageCount} photo` : `${imageCount} photos`,
  );

  const actualImageCount = await page.$$eval(
    ".photo",
    (elements) => elements.length,
  );

  assert.equal(actualImageCount, imageCount);
}

await browser.close();
