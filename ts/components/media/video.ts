import m from "mithril";
import type { Video } from "../../types.ts";
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

function viewVideo(
  videoState: VideoState,
  vnode: m.Vnode<VideoAttrs>,
): m.Children {
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
    controls: videoState.controlsVisible,
    preload,
    poster: posterUrl,
    onclick: showControls.bind(null, videoState),
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
}

/* */
export function Video() {
  const videoState: VideoState = { controlsVisible: false };

  return { view: viewVideo.bind(null, videoState) };
}

/* A keyed interactive video for video lists. */
export function drawVideoItem(video: Video): m.Children {
  return m(Video, {
    key: `video-${video.id}`,
    video,
    preload: "auto",
    interactive: true,
  });
}
