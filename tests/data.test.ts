/*
 * Photos is ultimately a complex dataset shipped to the client to be rendered properly.
 * I run into data inconsistencies, so lets test them out of existence...
 */

import { loadTribbles } from "../ts/build/loaders.ts";
import {
  readAlbumPhotosByAlbumId,
  readAllAlbums,
} from "../ts/services/albums.ts";
import { readCountries } from "../ts/services/readers.ts";

const tdb = await loadTribbles();

Deno.test("All countries are named and have a flag", () => {
  const countries = tdb.search({ source: { type: "country" } }).sources();

  readCountries(tdb, countries);
});

Deno.test("Album photo counts match renderable photos", () => {
  const mismatches = readAllAlbums(tdb).flatMap((album) => {
    const photos = readAlbumPhotosByAlbumId(tdb, album.id);
    if (photos.length === album.photosCount) {
      return [];
    }

    return [
      `${album.name} (${album.id}): expected ${album.photosCount}, parsed ${photos.length}`,
    ];
  });

  if (mismatches.length > 0) {
    throw new Error(
      `Album photo count mismatch:\n${mismatches.join("\n")}`,
    );
  }
});
