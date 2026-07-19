import { asUrn } from "@rgrannell1/tribbledb";
import { TribbleDB } from "@rgrannell1/tribbledb/v2";
import type { Video } from "../types.ts";
import { readAlbum, readVideos } from "./readers.ts";
import { albumUrn } from "../models/urn.ts";
import { KnownTypes } from "../constants/data.ts";

/*
 * Sort videos by their album's start date, newest album first.
 */
function sortByAlbumDate(tdb: TribbleDB, videos: Video[]): Video[] {
  const albumMinDate = new Map(
    videos.map((video) => [video.albumId, readAlbum(tdb, albumUrn(video.albumId))?.minDate ?? 0])
  );

  return videos.sort((videoA, videoB) =>
    (albumMinDate.get(videoB.albumId) ?? 0) - (albumMinDate.get(videoA.albumId) ?? 0)
  );
}

/*
 * Read and parse all videos, sorted chronologically by album date (oldest first).
 *
 * @param tdb The TribbleDB instance
 *
 * @return The parsed videos
 */
export function readAllVideos(tdb: TribbleDB): Video[] {
  const videoUrns = tdb.search({
    source: { type: KnownTypes.VIDEO },
  }).sources();

  return sortByAlbumDate(tdb, readVideos(tdb, videoUrns));
}

/*
 * Read videos associated with a set of thing URNs (subjects or locations).
 */
export function readVideosByThingIds(
  tdb: TribbleDB,
  thingUrns: Set<string>,
): Video[] {
  const videoIds = new Set<string>();

  for (const thingUrn of thingUrns) {
    const { type, id } = asUrn(thingUrn);

    const results = tdb.search({
      source: { type: KnownTypes.VIDEO },
      target: { type, id },
    }).sources();

    for (const result of results) {
      videoIds.add(result);
    }
  }

  return sortByAlbumDate(tdb, readVideos(tdb, videoIds));
}
