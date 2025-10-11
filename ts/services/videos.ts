import { TribbleDB, TripleObject } from "@rgrannell1/tribbledb";
import { Video } from "../types.ts";
import { z } from "zod";

const VideoSchema = z.object({
  id: z.string(),
  albumId: z.string(),
  description: z.string(),
  posterUrl: z.string().url(),
  videoUrl1080p: z.string().url(),
  videoUrl480p: z.string().url(),
  videoUrl720p: z.string().url(),
  videoUrlUnscaled: z.string().url(),
});

export function parseVideo(tdb: TribbleDB, video: TripleObject): Video {
  const result = VideoSchema.safeParse(video);
  if (!result.success) {
    throw new Error(
      `Invalid video object: ${JSON.stringify(result.error.issues)}`,
    );
  }

  return {
    id: result.data.id,
    albumId: result.data.albumId,
    description: result.data.description,
    posterUrl: result.data.posterUrl,
    videoUrl1080p: result.data.videoUrl1080p,
    videoUrl480p: result.data.videoUrl480p,
    videoUrl720p: result.data.videoUrl720p,
    videoUrlUnscaled: result.data.videoUrlUnscaled,
  };
}

export function readVideos(tdb: TribbleDB): Video[] {
  return tdb.search({
    source: { type: "video" },
  }).objects().map(parseVideo.bind(null, tdb));
}
