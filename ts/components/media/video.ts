import m from "mithril";
import type { Video } from "../../types.ts";
import { MetadataIcon } from "./metadata-icon.ts";
import { formatId } from "../../models/urn.ts";

export type VideoAttrs = {
  preload: string;
  video: Video;
  interactive?: boolean;
};

/* */
export function Video() {
  let controlsVisible = false;

  function onInteract() {
    controlsVisible = true;
    m.redraw();
  }

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
        controls: controlsVisible,
        preload,
        poster: posterUrl,
        onclick: onInteract,
      }, $source);

      const $mdIcon = interactive
        ? m(MetadataIcon, { route: `/video/${id}`, colour: "white" })
        : null;

      // keys belong on the m(Video, ...) call site, not this internal root
      return m("div", [
        m("div.photo", [
          $mdIcon,
          $video,
        ]),
      ]);
    },
  };
}
