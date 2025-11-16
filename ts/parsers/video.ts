import { TribbleDB } from "@rgrannell1/tribbledb";
import type { TripleObject } from "@rgrannell1/tribbledb";
import { VideoSchema } from "./schemas.ts";
import { parseObject } from "./parser.ts";

/* */
export function parseVideo(
  _: TribbleDB,
  video: TripleObject,
) {
  return parseObject(VideoSchema, "video", video);
}
