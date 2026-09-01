// Browser actions for album journeys.

"use strict";

async function openAlbums(page) {
  await page.goto("/?bust=playwright#!/albums");
  await page.getByTestId("album-row").first().waitFor();
}

function selectFirstAlbumLink(page) {
  return page.getByTestId("album-row").first().locator('a[href*="/album/"]').first();
}

async function openFirstAlbum(page) {
  const albumLink = selectFirstAlbumLink(page);
  const albumName = await albumLink.getAttribute("aria-label");
  await albumLink.click();
  return albumName;
}

async function openFirstAlbumInNewTab(page) {
  const albumLink = selectFirstAlbumLink(page);
  const href = await albumLink.getAttribute("href");
  if (href === null) throw new Error("Album link has no URL");
  const newPage = await page.context().newPage();
  await newPage.goto(new URL(href, page.url()).href);
  return newPage;
}

async function selectFirstCountry(page) {
  const country = page.locator(".country-filter-flag").first();
  const countryName = await country.getAttribute("title");
  await country.click();
  return { country, countryName };
}

module.exports = {
  openAlbums,
  openFirstAlbum,
  openFirstAlbumInNewTab,
  selectFirstCountry,
};
