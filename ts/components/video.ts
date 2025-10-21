import m from "mithril";

export type VideoAttrs = {
  preload: string;
  posterUrl: string;
  videoUrl1080p: string;
  videoUrl480p: string;
  videoUrl720p: string;
  videoUrlUnscaled: string;
};

/*
 *
 */
export function Video() {
  return {
    view(vnode: m.Vnode<VideoAttrs>) {
      const {
        preload,
        posterUrl,
        videoUrl1080p,
        videoUrl480p,
        videoUrl720p,
        videoUrlUnscaled,
      } = vnode.attrs;

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

      return m("div", [
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
