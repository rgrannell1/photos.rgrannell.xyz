import { type DatedVideo } from "../../../domain/media/videos.ts";

import { viewVideosPage } from "./page.ts";

export type VideosPageAttrs = {
  videos: DatedVideo[];
  visible: boolean;
};

export function VideosPage() {
  return { view: viewVideosPage };
}
