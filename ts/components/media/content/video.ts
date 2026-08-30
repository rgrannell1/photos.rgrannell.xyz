import m from "mithril";
import type { Video } from "../../../types/domain.ts";
import { MetadataIcon } from "../metadata/metadata-icon.ts";
import { formatId } from "../../../commons/urn.ts";

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

function drawVideoSource(video: Video): m.Children {
  const sourceAttrs = { src: video.videoUrl480p, type: "video/mp4" };
  return m("source", sourceAttrs);
}

function videoElementAttrs(
  videoState: VideoState,
  attrs: VideoAttrs,
): m.Attributes {
  const onclick = showControls.bind(null, videoState);
  const elementAttrs = {
    controls: videoState.controlsVisible,
    preload: attrs.preload,
    poster: attrs.video.posterUrl,
    onclick,
  };
  return elementAttrs;
}

function drawVideoElement(
  videoState: VideoState,
  attrs: VideoAttrs,
): m.Children {
  const source = drawVideoSource(attrs.video);
  const videoAttrs = videoElementAttrs(videoState, attrs);
  return m("video.thumbnail-video", videoAttrs, source);
}

function drawVideoMetadata(video: Video, interactive: boolean): m.Children {
  if (!interactive) {
    return null;
  }
  const route = `/video/${formatId(video.id)}`;
  const iconAttrs = { route, colour: "white" };
  const icon = m(MetadataIcon, iconAttrs);
  return icon;
}

function drawVideoContent(
  videoState: VideoState,
  attrs: VideoAttrs,
): m.Children {
  const videoElement = drawVideoElement(videoState, attrs);
  const metadataIcon = drawVideoMetadata(
    attrs.video,
    attrs.interactive ?? false,
  );
  return m("div", [m("div.photo", [metadataIcon, videoElement])]);
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

  // keys belong on the m(Video, ...) call site, not this internal root
  return drawVideoContent(videoState, { ...vnode.attrs, interactive });
}

export function Video() {
  const videoState: VideoState = { controlsVisible: false };

  return { view: viewVideo.bind(null, videoState) };
}

/* Preload is "none" so lists fetch only the poster, not the video data. */
export function drawVideoItem(video: Video): m.Children {
  const videoAttrs = {
    key: `video-${video.id}`,
    video,
    preload: "none",
    interactive: true,
  };
  const item = m(Video, videoAttrs);
  return item;
}
