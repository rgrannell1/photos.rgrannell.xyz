import m from "mithril";
import { Video } from "../components/video.ts";
import type { Video as VideoType, Services } from "../types.ts";
import { AlbumButton } from "../components/album-button.ts";
import { VideoInfo } from "../components/video-info.ts";

type VideoPageAttrs = {
  video: VideoType;
  services: Services;
  visible: boolean;
};

/* */
export function VideoPage() {
  return {
    view(vnode: m.Vnode<VideoPageAttrs>) {
      const { video, services, visible } = vnode.attrs;

      const $links = m("li.link-list", [m(AlbumButton, { id: video.albumId })]);

      const $videoInfo = m(VideoInfo, { video, services });

      return m("section", [
        m("h1", "Video"),
        m(Video, {
          video,
          preload: "auto",
          interactive: false,
        }),
        $links,
        m(
          "div",
          {
            class: visible ? "page sidebar-visible" : "page",
          },
          m("h3", "Video Information"),
          $videoInfo,
        ),
      ]);
    },
  };
}
