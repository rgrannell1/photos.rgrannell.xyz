import m from "mithril";
import { Video } from "../media/video.ts";
import type { Video as VideoType, Services } from "../../types.ts";
import { AlbumButton } from "../album/album-button.ts";
import { MediaInfo } from "../media/media-info.ts";

type VideoPageAttrs = {
  video: VideoType;
  services: Services;
  visible: boolean;
};

function viewVideoPage(vnode: m.Vnode<VideoPageAttrs>): m.Children {
  const { video, services, visible } = vnode.attrs;

  const $links = m("ul.link-list", [
    m("li", m("a", { href: video.videoUrlUnscaled }, "[L]")),
    m("li", m("a", { href: video.videoUrl1080p }, "[M]")),
    m("li", m("a", { href: video.videoUrl720p }, "[S]")),
    m("li", m("a", { href: video.videoUrl480p }, "[XS]")),
    m("li", m(AlbumButton, { id: video.albumId })),
  ]);

  const $videoInfo = m(MediaInfo, { media: video, services });

  return m("main", [
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
}

export function VideoPage() {
  return { view: viewVideoPage };
}
