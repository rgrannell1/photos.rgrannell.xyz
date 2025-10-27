import { TribbleDB, TripleObject } from "@rgrannell1/tribbledb";
import { z } from "zod";
import { Video } from "../types";
import { VideoSchema } from "./schemas";
import { parseObject } from "./parser";

/* */
export function parseVideo(
  tdb: TribbleDB,
  video: TripleObject,
): Video | undefined {
  return parseObject(VideoSchema, "video", video);
}
