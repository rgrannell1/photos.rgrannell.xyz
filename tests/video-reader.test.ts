/* Indexed video relation reader tests. */

import { asUrn, type Triple } from "@rgrannell1/tribbledb";
import { TribbleDB } from "@rgrannell1/tribbledb/v2";
import { albumUrn } from "../ts/commons/urn.ts";
import { KnownTypes } from "../ts/constants/data.ts";
import { readAlbum, readVideos } from "../ts/services/readers.ts";
import { readVideosByThingIds } from "../ts/services/videos.ts";
import type { Video } from "../ts/types.ts";

const ALBUM = "urn:ró:album:test";
const BIRD = "urn:ró:bird:robin";
const FIRST_VIDEO = "urn:ró:video:first";
const SECOND_VIDEO = "urn:ró:video:second";

const TRIPLES: Triple[] = [
  [ALBUM, "name", "Test"],
  [ALBUM, "minDate", "1704067200000"],
  [ALBUM, "maxDate", "1704067200000"],
  [ALBUM, "thumbnailUrl", "thumb.webp"],
  [ALBUM, "mosaic", "mosaic"],
  [ALBUM, "photosCount", "0"],
  [ALBUM, "videosCount", "2"],
  [ALBUM, "dateRange", "2024"],
  [ALBUM, "shortDateRange", "2024"],
  [FIRST_VIDEO, "albumId", "test"],
  [FIRST_VIDEO, "subject", `${BIRD}?context=wild`],
  [SECOND_VIDEO, "albumId", "test"],
  [SECOND_VIDEO, "subject", BIRD],
];

function sortLegacyVideos(tdb: TribbleDB, videos: Video[]) {
  const dates = new Map(
    videos.map((video) => [
      video.albumId,
      readAlbum(tdb, albumUrn(video.albumId))?.minDate ?? 0,
    ]),
  );

  return videos.map((video) => ({
    ...video,
    year: new Date(dates.get(video.albumId) ?? 0).getFullYear(),
  })).sort((videoA, videoB) =>
    (dates.get(videoB.albumId) ?? 0) - (dates.get(videoA.albumId) ?? 0)
  );
}

function readVideosLegacy(tdb: TribbleDB, thingUrns: Set<string>) {
  const videoUrns = new Set<string>();
  for (const thingUrn of thingUrns) {
    const { type, id } = asUrn(thingUrn);
    const matches = tdb.search({
      source: { type: KnownTypes.VIDEO },
      target: { type, id },
    }).sources();
    for (const match of matches) {
      videoUrns.add(match);
    }
  }

  return sortLegacyVideos(tdb, readVideos(tdb, videoUrns));
}

Deno.test("readVideosByThingIds keeps legacy triple parity", () => {
  const thingUrns = new Set([BIRD, "urn:ró:bird:missing"]);
  const expected = readVideosLegacy(new TribbleDB(TRIPLES), thingUrns);
  const tdb = new TribbleDB(TRIPLES);
  const search = tdb.search.bind(tdb);
  Object.defineProperty(tdb, "search", {
    value: (params: Parameters<TribbleDB["search"]>[0]) => {
      const source = Array.isArray(params) ? params[0] : params.source;
      if (
        typeof source === "object" &&
        !Array.isArray(source) &&
        source?.type === KnownTypes.VIDEO
      ) {
        throw new Error("legacy video relation search called");
      }
      return search(params);
    },
  });

  const actual = readVideosByThingIds(tdb, thingUrns);
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    throw new Error(`expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
  }
});
