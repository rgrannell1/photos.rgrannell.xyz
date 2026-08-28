import m from "mithril";
import { Video } from "../media/video.ts";
import type { Video as VideoType } from "../../types/domain.ts";
import { AlbumButton } from "../album/album-button.ts";
import { MediaInfo } from "../media/media-info.ts";
import type { ReadThing } from "../thing/thing-links.ts";
import type { ReadThingEmoji } from "../thing/thing-link.ts";

type VideoPageAttrs = {
  video: VideoType;
  albumHidden: boolean;
  readThing: ReadThing;
  readEmoji: ReadThingEmoji;
  visible: boolean;
};

function drawVideoLinks(video: VideoType, albumHidden: boolean): m.Children {
  return m("ul.link-list", [
    m("li", m("a", { href: video.videoUrlUnscaled }, "[L]")),
    m("li", m("a", { href: video.videoUrl1080p }, "[M]")),
    m("li", m("a", { href: video.videoUrl720p }, "[S]")),
    m("li", m("a", { href: video.videoUrl480p }, "[XS]")),
    m("li", m(AlbumButton, { id: video.albumId, hidden: albumHidden })),
  ]);
}

function drawVideoDetails(attrs: VideoPageAttrs): m.Children {
  const { video, readThing, readEmoji, visible } = attrs;
  return m("div", { class: visible ? "page sidebar-visible" : "page" }, [
    m("h3", "Video Information"),
    m(MediaInfo, { media: video, readThing, readEmoji }),
  ]);
}

function viewVideoPage(vnode: m.Vnode<VideoPageAttrs>): m.Children {
  const { video, albumHidden } = vnode.attrs;

  return m("main", [
    m("h1", "Video"),
    m(Video, { video, preload: "auto", interactive: false }),
    drawVideoLinks(video, albumHidden),
    drawVideoDetails(vnode.attrs),
  ]);
}

export function VideoPage() {
  return { view: viewVideoPage };
}
