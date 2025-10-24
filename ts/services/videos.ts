import { TribbleDB } from "@rgrannell1/tribbledb";
import { Video } from "../types.ts";
import { readParsedThing, readParsedThings } from "./things.ts";
import { parseVideo } from "../parsers/video.ts";

export const readVideo = readParsedThing.bind(null, parseVideo);
export const readParsedVideos = readParsedThings.bind(null, parseVideo);

/*
 * Read and parse a video by URNs
 *
 * @param tdb The TribbleDB instance
 *
 * @return The parsed videos
 */
export function readVideos(tdb: TribbleDB): Video[] {
  const videos = tdb.search({
    source: { type: "video" },
  }).sources();

  return readParsedVideos(tdb, videos) as Video[]; // TODO
}
