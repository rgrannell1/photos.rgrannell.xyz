import m from "mithril";
import type { Video as VideoType } from "../../types.ts";
import { drawVideoItem } from "../media/video.ts";
import {
  type BatchRenderer,
  createBatchRenderer,
} from "../media/batch-render.ts";
import { RENDER_BATCH_SIZE } from "../../constants/layout.ts";
import { countLabel } from "../../commons/strings.ts";

type VideosPageAttrs = {
  videos: VideoType[];
  visible: boolean;
};

function scheduleVideosBatch(
  batch: BatchRenderer,
  vnode: m.VnodeDOM<VideosPageAttrs>,
): void {
  batch.schedule(vnode.attrs.videos.length);
}

function viewVideosList(
  batch: BatchRenderer,
  vnode: m.Vnode<VideosPageAttrs>,
): m.Children {
  const { videos } = vnode.attrs;
  return m(
    "section.video-container",
    videos.slice(0, batch.count()).map(drawVideoItem),
  );
}

function VideosList() {
  const batch = createBatchRenderer(RENDER_BATCH_SIZE);

  return {
    oncreate: scheduleVideosBatch.bind(null, batch),
    onupdate: scheduleVideosBatch.bind(null, batch),
    view: viewVideosList.bind(null, batch),
  };
}

function viewVideosPage(vnode: m.Vnode<VideosPageAttrs>): m.Children {
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
}

/* */
export function VideosPage() {
  return { view: viewVideosPage };
}
