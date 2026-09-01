/* Resolve video routes and retain the streamed video index. */

import m from "mithril";
import { buildVideoUrn } from "../../../commons/urn.ts";
import { VideoPage } from "../../../components/pages/videos/video.ts";
import { VideosPage } from "../../../components/pages/videos/videos.ts";
import { services, state } from "../../context.ts";
import { pageEntry } from "../../shell.ts";
import { isNone } from "../../../commons/collections/maybe.ts";

let videos = services.readAllVideos();
let cachedAfterLoad = false;

export const videosEntry = pageEntry({
  page: VideosPage,
  onmatch() {
    videos = services.readAllVideos();
    cachedAfterLoad = state.loaded;
  },
  resolve() {
    const shouldRefreshCache = !state.loaded || !cachedAfterLoad;
    if (shouldRefreshCache) {
      videos = services.readAllVideos();
      cachedAfterLoad = state.loaded;
    }

    return {
      attrs: { videos, visible: state.sidebarVisible },
    };
  },
});

export const videoEntry = pageEntry({
  page: VideoPage,
  resolve() {
    const id = m.route.param("id");
    if (typeof id !== "string") {
      return "No video selected";
    }

    const video = services.readVideo(buildVideoUrn(id));
    if (isNone(video)) {
      return "Video not found";
    }

    return {
      attrs: {
        video,
        albumHidden: services.isAlbumHidden(video.albumId),
        readThing: services.readThing,
        readEmoji: services.readThingEmoji,
        visible: state.sidebarVisible,
      },
    };
  },
});
