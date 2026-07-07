/*
 * Photos is ultimately a complex dataset shipped to the client to be rendered properly.
 * I run into data inconsistencies, so lets test them out of existence...
 */

import { asUrn } from "@rgrannell1/tribbledb";
import { loadTribbles } from "../ts/build/loaders.ts";
import {
  readAlbumPhotosByAlbumId,
  readAllAlbums,
} from "../ts/services/albums.ts";
import { readCountries } from "../ts/services/readers.ts";
import { readThingCover } from "../ts/services/photos.ts";
import { readGeocodedPlacesWithCovers } from "../ts/services/places.ts";
import { KnownTypes, PrunableEntityTypes } from "../ts/constants.ts";

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

Deno.test("Browseable entities all have media after pruning", () => {
  // pruneMedialessThings (run by postIndexing) must remove every browseable
  // entity that no photo or video references, so nothing empty is reachable
  // anywhere in the app (map markers, listings, links, thing pages).
  const orphans: string[] = [];

  for (const type of PrunableEntityTypes) {
    for (const urn of tdb.search({ source: { type } }).sources()) {
      const { type: entityType, id } = asUrn(urn);
      const referencing = tdb.nodes({ type: entityType, id }).referencedBy();
      const hasPhoto = referencing.filter({ type: KnownTypes.PHOTO }).count() > 0;
      const hasVideo = referencing.filter({ type: KnownTypes.VIDEO }).count() > 0;

      if (!hasPhoto && !hasVideo) {
        orphans.push(urn);
      }
    }
  }

  if (orphans.length > 0) {
    throw new Error(
      `Media-less entities survived pruning:\n${orphans.join("\n")}`,
    );
  }
});

Deno.test("Bulk place covers match per-place cover lookups", () => {
  // readGeocodedPlacesWithCovers replaced a readThingCover call per place on
  // the map page (a ~1.3s main-thread block); the bulk join must return the
  // same thumbnails the per-place path did.
  const mismatches: string[] = [];

  for (const place of readGeocodedPlacesWithCovers(tdb)) {
    const expected = readThingCover(tdb, place.id)?.thumbnailUrl;

    if (place.coverThumbnailUrl !== expected) {
      mismatches.push(
        `${place.id}: expected ${expected}, got ${place.coverThumbnailUrl}`,
      );
    }
  }

  if (mismatches.length > 0) {
    throw new Error(
      `Place cover mismatch:\n${mismatches.join("\n")}`,
    );
  }
});
