import { TribbleDB } from "@rgrannell1/tribbledb";
import type { Video } from "../types.ts";
import { readAlbum, readVideos } from "./readers.ts";
import { albumUrn } from "../models/urn.ts";

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
