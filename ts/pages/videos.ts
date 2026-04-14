import m from "mithril";
import type { Video as VideoType } from "../types.ts";
import { Video } from "../components/video.ts";
import type { VideoAttrs } from "../components/video.ts";

type VideosPageAttrs = {
  videos: VideoType[];
  visible: boolean;
};

const BATCH_SIZE = 10;

function VideosList() {
  let rendered = BATCH_SIZE;
  let batchScheduled = false;

  function scheduleBatch(total: number) {
    if (rendered >= total || batchScheduled) return;
    batchScheduled = true;
    setTimeout(() => {
      rendered = Math.min(rendered + BATCH_SIZE, total);
      batchScheduled = false;
      m.redraw();
    }, 1);
  }

  return {
    oncreate(vnode: m.VnodeDOM<VideosPageAttrs>) {
      scheduleBatch(vnode.attrs.videos.length);
    },
    onupdate(vnode: m.VnodeDOM<VideosPageAttrs>) {
      scheduleBatch(vnode.attrs.videos.length);
    },
    view(vnode: m.Vnode<VideosPageAttrs>) {
      const { videos } = vnode.attrs;
      return m("section.photo-container",
        videos.slice(0, rendered).map((video) => m(Video, { video, preload: "auto" } satisfies VideoAttrs))
      );
    },
  };
}

/* */
export function VideosPage() {
  return {
    view(vnode: m.Vnode<VideosPageAttrs>) {
      const { videos, visible } = vnode.attrs;
      const videoLengthText = videos.length === 1
        ? "1 video"
        : `${videos.length} videos`;

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
