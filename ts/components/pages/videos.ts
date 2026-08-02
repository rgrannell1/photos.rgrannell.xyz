import m from "mithril";
import type { Video as VideoType } from "../../types.ts";
import { Video } from "../media/video.ts";
import { createBatchRenderer } from "../media/batch-render.ts";
import { RENDER_BATCH_SIZE } from "../../constants/layout.ts";
import { countLabel } from "../../commons/strings.ts";

type VideosPageAttrs = {
  videos: VideoType[];
  visible: boolean;
};


function VideosList() {
  const batch = createBatchRenderer(RENDER_BATCH_SIZE);

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
          m(Video, {
            key: `video-${video.id}`,
            video,
            preload: "auto",
            interactive: true,
          })
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
        "main",
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
