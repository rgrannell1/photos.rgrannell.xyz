import { TribbleDB } from "@rgrannell1/tribbledb";
import type { Video } from "../types.ts";
import { readVideos } from "./readers.ts";

/*
 * Read and parse a video by URNs
 *
 * @param tdb The TribbleDB instance
 *
 * @return The parsed videos
 */
export function readAllVideos(tdb: TribbleDB): Video[] {
  const videos = tdb.search({
    source: { type: "video" },
  }).sources();

  return readVideos(tdb, videos);
}
