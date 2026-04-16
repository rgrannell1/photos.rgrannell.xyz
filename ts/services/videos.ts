import { asUrn, TribbleDB } from "@rgrannell1/tribbledb";
import type { Video } from "../types.ts";
import { readAlbum, readVideos } from "./readers.ts";
import { albumUrn } from "../models/urn.ts";
import { KnownTypes } from "../constants.ts";

/*
 * Read and parse all videos, sorted chronologically by album date (oldest first).
 *
 * @param tdb The TribbleDB instance
 *
 * @return The parsed videos
 */
export function readAllVideos(tdb: TribbleDB): Video[] {
  const videoUrns = tdb.search({
    source: { type: "video" },
  }).sources();

  const videos = readVideos(tdb, videoUrns);

  const albumMinDate = new Map(
    videos.map((video) => [video.albumId, readAlbum(tdb, albumUrn(video.albumId))?.minDate ?? 0])
  );

  return videos.sort((videoA, videoB) =>
    (albumMinDate.get(videoB.albumId) ?? 0) - (albumMinDate.get(videoA.albumId) ?? 0)
  );
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

  const videos = readVideos(tdb, videoIds);

  const albumMinDate = new Map(
    videos.map((video) => [video.albumId, readAlbum(tdb, albumUrn(video.albumId))?.minDate ?? 0])
  );

  return videos.sort((videoA, videoB) =>
    (albumMinDate.get(videoB.albumId) ?? 0) - (albumMinDate.get(videoA.albumId) ?? 0)
  );
}
