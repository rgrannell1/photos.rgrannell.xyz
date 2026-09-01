/* Support videos operations. */

import m from "mithril";
import { drawVideoItem } from "../../media/content/video.ts";
import {
  type DatedVideo,
  groupVideosByYear,
  type VideoYearGroup,
} from "../../../domain/media/videos.ts";
import {
  type BatchRenderer,
  createBatchRenderer,
} from "../../../services/rendering/batch-render.ts";
import { BEFORE_TIMES_FINAL_YEAR } from "../../../constants/display.ts";
import { RENDER_BATCH_SIZE } from "../../../constants/layout.ts";
import type { VideosPageAttrs } from "./videos.ts";

/** Build keyed heading attributes and mark historical year groups. */
export function buildYearHeadingAttrs(
  group: VideoYearGroup,
): { key: string; class: string | undefined } {
  const key = `year-${group.year}`;
  const className = group.year <= BEFORE_TIMES_FINAL_YEAR
    ? "before-times"
    : undefined;
  return { key, class: className };
}

/** Draw the heading for a video year group. */
export function drawYearHeading(group: VideoYearGroup): m.Children {
  const attrs = buildYearHeadingAttrs(group);
  const year = group.year.toString();
  return m("h2.year-heading", attrs, year);
}

/** Draw every video item in a year group. */
export function drawGroupVideos(group: VideoYearGroup): m.Children[] {
  return group.videos.map(drawVideoItem);
}

/** Append a year heading when the group requires one. */
export function appendYearHeading(
  components: m.Children[],
  group: VideoYearGroup,
): void {
  if (group.showHeading) {
    components.push(drawYearHeading(group));
  }
}

/** Draw a year group with its optional heading before its videos. */
export function drawYearGroup(group: VideoYearGroup): m.Children[] {
  const $components: m.Children[] = [];
  const $videos = drawGroupVideos(group);
  appendYearHeading($components, group);
  $components.push(...$videos);

  return $components;
}

/** Schedule enough batched rows for the current video collection. */
export function scheduleVideosBatch(
  batch: BatchRenderer,
  vnode: m.VnodeDOM<VideosPageAttrs>,
): void {
  batch.schedule(vnode.attrs.videos.length);
}

/** Group the currently revealed video slice by year. */
export function readVisibleVideoGroups(
  batch: BatchRenderer,
  videos: DatedVideo[],
): VideoYearGroup[] {
  const currentYear = new Date().getFullYear();
  const limit = batch.count();
  return groupVideosByYear(videos.slice(0, limit), currentYear);
}

/** Render the visible video batches as ordered year groups. */
export function viewVideosList(
  batch: BatchRenderer,
  vnode: m.Vnode<VideosPageAttrs>,
): m.Children {
  const { videos } = vnode.attrs;
  const groups = readVisibleVideoGroups(batch, videos);
  const $videoComponents = groups.flatMap(drawYearGroup);
  return m("section.video-container", $videoComponents);
}

/** Bind batch scheduling to list creation and updates. */
export function bindVideosListHooks(
  batch: BatchRenderer,
): {
  oncreate: (vnode: m.VnodeDOM<VideosPageAttrs>) => void;
  onupdate: (vnode: m.VnodeDOM<VideosPageAttrs>) => void;
} {
  const oncreate = scheduleVideosBatch.bind(null, batch);
  const onupdate = scheduleVideosBatch.bind(null, batch);
  return { oncreate, onupdate };
}

/** Create a video list with incremental batch rendering. */
export function VideosList(): m.Component<VideosPageAttrs> {
  const batch = createBatchRenderer(RENDER_BATCH_SIZE);
  const hooks = bindVideosListHooks(batch);

  return {
    ...hooks,
    view: viewVideosList.bind(null, batch),
  };
}
