/* Resolve video routes and retain the streamed video index. */

import m from "mithril";
import { videoUrn } from "../../commons/urn.ts";
import { VideoPage } from "../../components/pages/video.ts";
import { VideosPage } from "../../components/pages/videos.ts";
import { services, state } from "../context.ts";
import { pageEntry } from "../shell.ts";
import { isNone } from "../../commons/maybe.ts";

const videoPageComponent = VideoPage();
const videosPageComponent = VideosPage();

let videos = services.readAllVideos();
let cachedAfterLoad = false;

export const videosEntry = pageEntry({
  page: videosPageComponent,
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
  page: videoPageComponent,
  resolve() {
    const id = m.route.param("id");
    if (typeof id !== "string") {
      return "No video selected";
    }

    const video = services.readVideo(videoUrn(id));
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
