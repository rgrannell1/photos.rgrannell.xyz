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

export function readYearHeadingAttrs(group: VideoYearGroup) {
  const key = `year-${group.year}`;
  const className = group.year <= BEFORE_TIMES_FINAL_YEAR
    ? "before-times"
    : undefined;
  return { key, class: className };
}

export function drawYearHeading(group: VideoYearGroup): m.Children {
  const attrs = readYearHeadingAttrs(group);
  const year = group.year.toString();
  return m("h2.year-heading", attrs, year);
}

export function drawGroupVideos(group: VideoYearGroup): m.Children[] {
  return group.videos.map(drawVideoItem);
}

export function appendYearHeading(
  components: m.Children[],
  group: VideoYearGroup,
): void {
  if (group.showHeading) {
    components.push(drawYearHeading(group));
  }
}

export function drawYearGroup(group: VideoYearGroup): m.Children[] {
  const $components: m.Children[] = [];
  const videos = drawGroupVideos(group);
  appendYearHeading($components, group);
  $components.push(...videos);

  return $components;
}

export function scheduleVideosBatch(
  batch: BatchRenderer,
  vnode: m.VnodeDOM<VideosPageAttrs>,
): void {
  batch.schedule(vnode.attrs.videos.length);
}

export function readVisibleVideoGroups(
  batch: BatchRenderer,
  videos: DatedVideo[],
): VideoYearGroup[] {
  const currentYear = new Date().getFullYear();
  const limit = batch.count();
  return groupVideosByYear(videos.slice(0, limit), currentYear);
}

export function viewVideosList(
  batch: BatchRenderer,
  vnode: m.Vnode<VideosPageAttrs>,
): m.Children {
  const { videos } = vnode.attrs;
  const groups = readVisibleVideoGroups(batch, videos);
  const $videoComponents = groups.flatMap(drawYearGroup);
  return m("section.video-container", $videoComponents);
}

export function bindVideosListHooks(batch: BatchRenderer) {
  const oncreate = scheduleVideosBatch.bind(null, batch);
  const onupdate = scheduleVideosBatch.bind(null, batch);
  return { oncreate, onupdate };
}

export function VideosList() {
  const batch = createBatchRenderer(RENDER_BATCH_SIZE);
  const hooks = bindVideosListHooks(batch);

  return {
    ...hooks,
    view: viewVideosList.bind(null, batch),
  };
}
