import m from "mithril";
import { parseUrn } from "@rgrannell1/tribbledb";
import type { Video } from "../types.ts";
import { MetadataIcon } from "./metadata-icon.ts";

function formatId(id: string): string {
  return id.startsWith("urn:") ? parseUrn(id).id : id;
}

export type VideoAttrs = {
  preload: string;
  video: Video;
  interactive?: boolean;
};

/* */
export function Video() {
  return {
    view(vnode: m.Vnode<VideoAttrs>) {
      const {
        preload,
        video,
        interactive = false,
      } = vnode.attrs;

      if (!video) {
        return m("div", "No video");
      }

      const {
        id: rawId,
        posterUrl,
        videoUrl480p,
      } = video;

      const id = formatId(rawId);
      const hasValidUrl = videoUrl480p && videoUrl480p.length > 0;

      if (!hasValidUrl) {
        return m("div", "Video unavailable");
      }

      const $source = m("source", {
        src: videoUrl480p,
        type: "video/mp4",
      });

      const $video = m("video.thumbnail-video", {
        controls: true,
        preload,
        poster: posterUrl,
      }, $source);

      const $mdIcon = interactive
        ? m(MetadataIcon, { route: `/video/${id}`, colour: "white" })
        : null;

      return m("div", { key: `video-${id}` }, [
        m("div.photo", [
          $mdIcon,
          $video,
        ]),
      ]);
    },
  };
}
