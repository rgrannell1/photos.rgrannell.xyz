import type m from "mithril";
import type { DatedVideo } from "../../../domain/media/videos.ts";

import { viewVideosPage } from "./page.ts";

export type VideosPageAttrs = {
  videos: DatedVideo[];
  visible: boolean;
};

/** Create the videos page component. */
export function VideosPage(): m.Component<VideosPageAttrs> {
  return { view: viewVideosPage };
}
