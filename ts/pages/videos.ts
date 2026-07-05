import m from "mithril";
import type { Video as VideoType } from "../types.ts";
import { Video } from "../components/video.ts";
import type { VideoAttrs } from "../components/video.ts";
import { createBatchRenderer } from "../components/batch-render.ts";
import { countLabel } from "../commons/strings.ts";

type VideosPageAttrs = {
  videos: VideoType[];
  visible: boolean;
};

const BATCH_SIZE = 10;

function VideosList() {
  const batch = createBatchRenderer(BATCH_SIZE);

  return {
    oncreate(vnode: m.VnodeDOM<VideosPageAttrs>) {
      batch.schedule(vnode.attrs.videos.length);
    },
    onupdate(vnode: m.VnodeDOM<VideosPageAttrs>) {
      batch.schedule(vnode.attrs.videos.length);
    },
    view(vnode: m.Vnode<VideosPageAttrs>) {
      const { videos } = vnode.attrs;
      return m(
        "section.video-container",
        videos.slice(0, batch.count()).map((video) =>
          m(Video, { video, preload: "auto", interactive: true } satisfies VideoAttrs)
        ),
      );
    },
  };
}

/* */
export function VideosPage() {
  return {
    view(vnode: m.Vnode<VideosPageAttrs>) {
      const { videos, visible } = vnode.attrs;
      const videoLengthText = countLabel(videos.length, "video");

      return m(
        "div",
        {
          class: visible ? "page sidebar-visible" : "page",
        },
        m("section.photos-metadata", [
          m("h1", "Videos"),
          m("p.photo-album-count", videoLengthText),
        ]),
        m(VideosList, { videos, visible }),
      );
    },
  };
}
