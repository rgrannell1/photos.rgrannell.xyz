import m from "mithril";
import type { Video } from "../../types/domain.ts";
import { MetadataIcon } from "./metadata-icon.ts";
import { formatId } from "../../commons/urn.ts";

export type VideoAttrs = {
  preload: string;
  video: Video;
  interactive?: boolean;
};

type VideoState = {
  // native controls appear after the first click on the video
  controlsVisible: boolean;
};

function showControls(videoState: VideoState): void {
  videoState.controlsVisible = true;
  m.redraw();
}

function drawVideoElement(
  videoState: VideoState,
  attrs: VideoAttrs,
): m.Children {
  const source = m("source", {
    src: attrs.video.videoUrl480p,
    type: "video/mp4",
  });

  return m("video.thumbnail-video", {
    controls: videoState.controlsVisible,
    preload: attrs.preload,
    poster: attrs.video.posterUrl,
    onclick: showControls.bind(null, videoState),
  }, source);
}

function viewVideo(
  videoState: VideoState,
  vnode: m.Vnode<VideoAttrs>,
): m.Children {
  const { video, interactive = false } = vnode.attrs;

  if (!video) {
    return m("div", "No video");
  }

  const hasValidUrl = video.videoUrl480p && video.videoUrl480p.length > 0;

  if (!hasValidUrl) {
    return m("div", "Video unavailable");
  }

  const videoElement = drawVideoElement(videoState, vnode.attrs);
  const metadataIcon = interactive
    ? m(MetadataIcon, { route: `/video/${formatId(video.id)}`, colour: "white" })
    : null;

  // keys belong on the m(Video, ...) call site, not this internal root
  return m("div", [m("div.photo", [metadataIcon, videoElement])]);
}

export function Video() {
  const videoState: VideoState = { controlsVisible: false };

  return { view: viewVideo.bind(null, videoState) };
}

/* Preload is "none" so lists fetch only the poster, not the video data. */
export function drawVideoItem(video: Video): m.Children {
  return m(Video, {
    key: `video-${video.id}`,
    video,
    preload: "none",
    interactive: true,
  });
}
