import { TribbleDB } from "@rgrannell1/tribbledb";
import { Video } from "../types.ts";
import { readParsedThing, readParsedThings } from "./things.ts";
import { parseVideo } from "../parsers/video.ts";

export const readVideo = (
  tdb: TribbleDB,
  id: string,
) => {
  return readParsedThing(parseVideo, tdb, id);
};

export const readParsedVideos = (
  tdb: TribbleDB,
  urns: Set<string>,
) => {
  return readParsedThings(parseVideo, tdb, urns);
};

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
