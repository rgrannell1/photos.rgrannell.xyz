import m from "mithril";
import { drawVideoItem } from "../media/video.ts";
import {
  type DatedVideo,
  groupVideosByYear,
  type VideoYearGroup,
} from "../../services/videos.ts";
import {
  type BatchRenderer,
  createBatchRenderer,
} from "../../services/batch-render.ts";
import { BEFORE_TIMES_FINAL_YEAR } from "../../constants/display.ts";
import { RENDER_BATCH_SIZE } from "../../constants/layout.ts";
import { countLabel } from "../../commons/strings.ts";

type VideosPageAttrs = {
  videos: DatedVideo[];
  visible: boolean;
};

function drawYearGroup(group: VideoYearGroup): m.Children[] {
  const $components: m.Children[] = [];

  if (group.showHeading) {
    $components.push(m(
      "h2.year-heading",
      {
        key: `year-${group.year}`,
        class: group.year <= BEFORE_TIMES_FINAL_YEAR ? "before-times" : undefined,
      },
      group.year.toString(),
    ));
  }

  for (const video of group.videos) {
    $components.push(drawVideoItem(video));
  }

  return $components;
}

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

  const groups = groupVideosByYear(
    videos.slice(0, batch.count()),
    new Date().getFullYear(),
  );

  const $videoComponents: m.Children[] = [];
  for (const group of groups) {
    $videoComponents.push(...drawYearGroup(group));
  }

  return m("section.video-container", $videoComponents);
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

export function VideosPage() {
  return { view: viewVideosPage };
}
