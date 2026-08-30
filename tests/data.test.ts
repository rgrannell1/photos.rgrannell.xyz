/*
 * Photos is ultimately a complex dataset shipped to the client to be rendered properly.
 * I run into data inconsistencies, so lets test them out of existence...
 */

import { asUrn } from "@rgrannell1/tribbledb";
import { loadTribbles } from "../ts/build/loaders.ts";
import {
  readAlbumPhotosByAlbumId,
  readAllAlbums,
} from "../ts/services/data/albums/albums.ts";
import { readCountries } from "../ts/services/data/readers.ts";
import {
  readMammalStats,
  readWildBirdChecklist,
} from "../ts/services/data/stats.ts";
import { readThingCover } from "../ts/services/data/media/photos.ts";
import { readGeocodedPlacesWithCovers } from "../ts/services/data/entities/places.ts";
import { KnownRelations, KnownTypes } from "../ts/constants/data.ts";
import { browseableEntityTypes } from "../ts/semantic/derive/mod.ts";
import { isNone } from "../ts/commons/collections/maybe.ts";

const tdb = await loadTribbles();

Deno.test("All countries are named and have a flag", () => {
  // countries are place entities with a flag; there is no `country` type
  const countryUrns = [...tdb.search({
    source: { type: KnownTypes.PLACE },
    relation: KnownRelations.FLAG,
  }).sources()];

  if (countryUrns.length === 0) {
    throw new Error("no countries found in the data");
  }

  const unnamed = readCountries(tdb, new Set(countryUrns))
    .filter((country) => !country.name || !country.flag);

  if (unnamed.length > 0) {
    throw new Error(
      `countries missing name or flag: ${JSON.stringify(unnamed)}`,
    );
  }
});

Deno.test("Mammal stats find wild species seen in Ireland", () => {
  // Ireland is a place entity with a numeric id, not urn:ró:place:ireland.
  // The stat must resolve Ireland from the data, or it reports 0 forever.
  const { irishWildSpecies, wildSpecies } = readMammalStats(tdb);

  if (wildSpecies === 0) {
    throw new Error("no wild mammal species found in the data");
  }

  if (irishWildSpecies === 0) {
    throw new Error(
      "no Irish wild mammal species found, despite Irish mammal photos",
    );
  }
});

Deno.test("Wildlife checklist entries retain derived labels", () => {
  const entries = readWildBirdChecklist(tdb);
  const kingfisher = entries.find((entry) => entry.name === "Kingfisher");

  if (!kingfisher?.isWild || !kingfisher.isIrish) {
    throw new Error("Kingfisher checklist labels are incomplete");
  }
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

  for (const type of browseableEntityTypes(tdb)) {
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
    const cover = readThingCover(tdb, place.id);
    const expected = isNone(cover) ? undefined : cover.thumbnailUrl;

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
