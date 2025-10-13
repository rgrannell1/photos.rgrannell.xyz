import { TribbleDB } from "@rgrannell1/tribbledb";
import { Video } from "../types.ts";
import { parseVideo } from "../parsers/video.ts";

export function readVideos(tdb: TribbleDB): Video[] {
  return tdb.search({
    source: { type: "video" },
  }).objects().map(parseVideo.bind(null, tdb));
}
