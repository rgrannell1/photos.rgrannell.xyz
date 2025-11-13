import m from "mithril";
import type { Video as VideoType } from "../types.ts";
import { Video } from "../components/video.ts";
import type { VideoAttrs } from "../components/video.ts";

type VideosPageAttrs = {
  videos: VideoType[];
};

/* */
export function VideosPage() {
  return {
    view(vnode: m.Vnode<VideosPageAttrs>) {
      const { videos } = vnode.attrs;
      const videoLengthText = videos.length === 1
        ? "1 video"
        : `${videos.length} videos`;

      const $videosList = videos.map((video) => {
        return m(Video, { video, preload: "auto" } satisfies VideoAttrs);
      });

      return m(
        "div",
        m("section.photos-metadata", [
          m("h1", "Videos"),
          m("p.photo-album-count", videoLengthText),
        ]),
        m("section.photo-container", $videosList),
      );
    },
  };
}
