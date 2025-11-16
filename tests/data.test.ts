/*
 * Photos is ultimately a complex dataset shipped to the client to be rendered properly.
 * I run into data inconsistencies, so lets test them out of existence...
 */

import { loadTribbles } from "../ts/build/loaders.ts";
import { readCountries } from "../ts/services/location.ts";

const tdb = await loadTribbles();

Deno.test("All countries are named and have a flag", () => {
  const countries = tdb.search({ source: { type: "country" } }).sources();

  readCountries(tdb, countries);
});
