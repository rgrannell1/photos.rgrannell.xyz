/*
 * Photos is ultimately a complex dataset shipped to the client to be rendered properly.
 * I run into data inconsistencies, so lets test them out of existence...
 */

import { loadTribbles } from "../ts/build/loaders.ts";

const tdb = await loadTribbles();

Deno.test("Countries have expected structure", () => {
  // historically, this had duplicated names...
  const country = tdb.search({
    source: {
      type: 'country',
      id: 'lanzarote'
    }
  }).firstObject();

  if (!country) {
    throw new Error("Country not found");
  }

  const expected = {
    id: "urn:ró:country:lanzarote",
    contains: "urn:ró:place:106",
    name: "Lanzarote",
    flag: "🇪🇸"
  };

  if (country.id !== expected.id) {
    throw new Error(`Expected id ${expected.id}, got ${country.id}`);
  }
  if (country.contains !== expected.contains) {
    throw new Error(`Expected contains ${expected.contains}, got ${country.contains}`);
  }
  if (country.name !== expected.name) {
    throw new Error(`Expected name ${expected.name}, got ${country.name}`);
  }
  if (country.flag !== expected.flag) {
    throw new Error(`Expected flag ${expected.flag}, got ${country.flag}`);
  }
});
