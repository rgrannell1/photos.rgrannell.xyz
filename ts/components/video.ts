import m from "mithril";
import type { Video } from "../types";

export type VideoAttrs = {
  preload: string;
  video: Video;
};

/* */
export function Video() {
  return {
    view(vnode: m.Vnode<VideoAttrs>) {
      const {
        preload,
        video,
      } = vnode.attrs;

      if (!video) {
        return m("div", "No video");
      }

      const {
        posterUrl,
        videoUrl1080p,
        videoUrl480p,
        videoUrl720p,
        videoUrlUnscaled,
      } = video;

      const $source = m("source", {
        src: videoUrl480p,
        type: "video/mp4",
      });

      const $resolutionLinks = m("ul", [
        m("a", { href: videoUrlUnscaled }, "[L]"),
        m("a", { href: videoUrl1080p }, "[M]"),
        m("a", { href: videoUrl720p }, "[S]"),
        m("a", { href: videoUrl480p }, "[XS]"),
      ]);

      return m("div", { key: `video-${video.id}` }, [
        m("video.thumbnail-video", {
          controls: true,
          preload,
          poster: posterUrl,
        }, $source),
        $resolutionLinks,
      ]);
    },
  };
}
