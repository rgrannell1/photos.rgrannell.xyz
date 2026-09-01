// Album expectations shared by filter journeys.

"use strict";

const { expect } = require("@playwright/test");

function readMismatchedAlbumCountries(rows, countryName) {
  return rows.flatMap((row) => {
    const flags = row.querySelectorAll('[role="img"][aria-label]');
    const countries = [...flags].map((flag) => flag.getAttribute("aria-label"));
    const hasCountry = countries.includes(`${countryName} flag`);
    const title = row.getAttribute("data-album-title");
    return hasCountry ? [] : [{ title, countries }];
  });
}

async function expectAlbumsMatchCountry(page, countryName) {
  const rows = page.getByTestId("album-row");
  await expect(rows.first()).toBeVisible();
  const mismatches = await rows.evaluateAll(
    readMismatchedAlbumCountries,
    countryName,
  );
  expect(mismatches, `${countryName} album countries`).toEqual([]);
}

module.exports = { expectAlbumsMatchCountry };
