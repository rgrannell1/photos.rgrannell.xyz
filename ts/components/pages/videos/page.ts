/* Support videos operations. */

import m from "mithril";
import { type DatedVideo } from "../../../domain/media/videos.ts";
import { countLabel } from "../../../commons/strings.ts";
import type { VideosPageAttrs } from "./videos.ts";
import { VideosList } from "./groups.ts";

/** Render the videos page heading and singular-aware count. */
export function drawVideosMetadata(videoLengthText: string): m.Children {
  const $heading = m("h1", "Videos");
  const $count = m("p.photo-album-count", videoLengthText);
  return m("section.photos-metadata", [$heading, $count]);
}

/** Selects the page class for the current sidebar visibility. */
export function selectVideosPageClass(visible: boolean): string {
  return visible ? "page sidebar-visible" : "page";
}

/** Render the videos page shell, metadata, and grouped video list. */
export function drawVideosPage(
  className: string,
  metadata: m.Children,
  attrs: VideosPageAttrs,
): m.Children {
  return m("main", { class: className }, metadata, m(VideosList, attrs));
}

/** Format a singular-aware count for the videos collection. */
export function formatVideosCountText(videos: DatedVideo[]): string {
  return countLabel(videos.length, "video");
}

/** Render the videos page from its current visibility and video data. */
export function viewVideosPage(vnode: m.Vnode<VideosPageAttrs>): m.Children {
  const videoLengthText = formatVideosCountText(vnode.attrs.videos);
  const metadata = drawVideosMetadata(videoLengthText);
  const className = selectVideosPageClass(vnode.attrs.visible);

  return drawVideosPage(className, metadata, vnode.attrs);
}
