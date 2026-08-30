/* Support videos operations. */

import m from "mithril";
import { type DatedVideo } from "../../../domain/media/videos.ts";
import { countLabel } from "../../../commons/strings.ts";
import type { VideosPageAttrs } from "./videos.ts";
import { VideosList } from "./groups.ts";

export function drawVideosMetadata(videoLengthText: string): m.Children {
  const heading = m("h1", "Videos");
  const count = m("p.photo-album-count", videoLengthText);
  return m("section.photos-metadata", [heading, count]);
}

export function readVideosPageClass(visible: boolean): string {
  return visible ? "page sidebar-visible" : "page";
}

export function drawVideosPage(
  className: string,
  metadata: m.Children,
  attrs: VideosPageAttrs,
): m.Children {
  return m("main", { class: className }, metadata, m(VideosList, attrs));
}

export function readVideosCountText(videos: DatedVideo[]): string {
  return countLabel(videos.length, "video");
}

export function viewVideosPage(vnode: m.Vnode<VideosPageAttrs>): m.Children {
  const videoLengthText = readVideosCountText(vnode.attrs.videos);
  const metadata = drawVideosMetadata(videoLengthText);
  const className = readVideosPageClass(vnode.attrs.visible);

  return drawVideosPage(className, metadata, vnode.attrs);
}
