import { TribbleDB } from "@rgrannell1/tribbledb";
import type { TripleObject } from "@rgrannell1/tribbledb";
import type { Video } from "../types";
import { VideoSchema } from "./schemas";
import { parseObject } from "./parser";

/* */
export function parseVideo(
  _: TribbleDB,
  video: TripleObject,
): Video | undefined {
  return parseObject(VideoSchema, "video", video);
}
