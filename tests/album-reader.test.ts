/* Indexed album reader parity tests. */

import type { Triple } from "@rgrannell1/tribbledb";
import { asUrn } from "@rgrannell1/tribbledb";
import { TribbleDB } from "@rgrannell1/tribbledb/v2";
import {
  isAlbumHidden,
  readAlbumPhotoIds,
  readAlbumVideoIds,
  readTripAlbums,
  readTripName,
  readYearRecap,
} from "../ts/services/albums.ts";
import { KnownRelations, KnownTypes } from "../ts/constants/data.ts";

const ALBUM = "urn:ró:album:test";
const TRIP = "urn:ró:trip:test";

function legacyFirstTarget(
  tdb: TribbleDB,
  type: string,
  id: string,
  relation: string,
): string | undefined {
  return tdb.search({ source: { type, id }, relation }).firstTarget();
}

function legacyMediaIds(tdb: TribbleDB, type: string): Set<string> {
  return tdb.search({
    source: { type },
    relation: KnownRelations.ALBUM_ID,
    target: { id: asUrn(ALBUM).id },
  }).sources();
}

function albumTriples(urn: string, minDate: string): Triple[] {
  return [
    [urn, "name", urn],
    [urn, "trip", TRIP],
    [urn, "minDate", minDate],
    [urn, "maxDate", minDate],
    [urn, "thumbnailUrl", "thumb.webp"],
    [urn, "mosaic", "hash"],
    [urn, "photosCount", "1"],
    [urn, "videosCount", "0"],
    [urn, "dateRange", "date"],
    [urn, "shortDateRange", "date"],
  ];
}

const triples: Triple[] = [
  [`${ALBUM}?view=private`, "hidden", "true"],
  ["urn:ró:year:2025?edition=first", "recap", "First recap"],
  ["urn:ró:year:2025?edition=second", "recap", "Second recap"],
  [`${TRIP}?lang=ga`, "title", "First title"],
  [`${TRIP}?lang=en`, "title", "Second title"],
  ["urn:ró:photo:first?context=wild", "albumId", `${ALBUM}?part=one`],
  ["urn:ró:photo:second", "albumId", ALBUM],
  ["urn:ró:video:first?cut=short", "albumId", `${ALBUM}?part=two`],
  ...albumTriples("urn:ró:album:earlier?edition=one", "100"),
  ...albumTriples("urn:ró:album:later", "200"),
];

Deno.test("album point and relation readers match legacy search", () => {
  const tdb = new TribbleDB(triples);
  const hidden = legacyFirstTarget(tdb, KnownTypes.ALBUM, "test", "hidden");
  const recap = legacyFirstTarget(tdb, KnownTypes.YEAR, "2025", KnownRelations.RECAP);
  const title = legacyFirstTarget(tdb, "trip", "test", KnownRelations.TITLE);

  if (isAlbumHidden(tdb, "test") !== (hidden === "true")) {
    throw new Error("hidden value differs from legacy search");
  }
  if (readYearRecap(tdb, 2025) !== recap || readYearRecap(tdb, 2024) !== undefined) {
    throw new Error("recap value differs from legacy search");
  }
  if (readTripName(tdb, TRIP) !== title) {
    throw new Error("trip title differs from legacy search");
  }
  if (JSON.stringify([...readAlbumPhotoIds(tdb, ALBUM)]) !==
    JSON.stringify([...legacyMediaIds(tdb, KnownTypes.PHOTO)])) {
    throw new Error("photo order differs from legacy search");
  }
  if (JSON.stringify([...readAlbumVideoIds(tdb, ALBUM)]) !==
    JSON.stringify([...legacyMediaIds(tdb, KnownTypes.VIDEO)])) {
    throw new Error("video order differs from legacy search");
  }
});

Deno.test("trip album traversal matches legacy ordering and qs variants", () => {
  const tdb = new TribbleDB(triples);
  const legacyIds = tdb.search({
    source: { type: KnownTypes.ALBUM },
    relation: KnownRelations.TRIP,
    target: { type: "trip", id: "test" },
  }).sources();
  const actualIds = readTripAlbums(tdb, TRIP).map((album) => album.id);

  if (JSON.stringify(actualIds) !== JSON.stringify([...legacyIds])) {
    throw new Error("trip albums differ from legacy search");
  }
});

Deno.test("album point and relation readers do not call legacy search", () => {
  const tdb = new TribbleDB(triples);
  Object.defineProperty(tdb, "search", {
    value: () => {
      throw new Error("legacy search called");
    },
  });

  isAlbumHidden(tdb, "test");
  readYearRecap(tdb, 2025);
  readAlbumPhotoIds(tdb, ALBUM);
  readAlbumVideoIds(tdb, ALBUM);
  readTripName(tdb, TRIP);
});
