import m from "mithril";
import type { Video } from "../../../types/domain.ts";
import { MetadataIcon } from "../metadata/metadata-icon.ts";
import { formatId } from "../../../commons/urn.ts";
import {
  type VideoPreload,
  VideoPreloadMode,
} from "../../../constants/display.ts";

export type VideoAttrs = {
  preload: VideoPreload;
  video: Video;
  interactive?: boolean;
};

type VideoState = {
  // native controls appear after the first click on the video
  controlsVisible: boolean;
};

/** Reveals native controls after the user selects a video. */
function showControls(videoState: VideoState): void {
  videoState.controlsVisible = true;
  m.redraw();
}

/** Draws the 480p MP4 source for a video. */
function drawVideoSource(video: Video): m.Children {
  const sourceAttrs = { src: video.videoUrl480p, type: "video/mp4" };
  return m("source", sourceAttrs);
}

/** Builds native video attributes from component state and input. */
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

/** Draws the video element and its source. */
function drawVideoElement(
  videoState: VideoState,
  attrs: VideoAttrs,
): m.Children {
  const $source = drawVideoSource(attrs.video);
  const videoAttrs = videoElementAttrs(videoState, attrs);
  return m("video.thumbnail-video", videoAttrs, $source);
}

/** Draws a metadata route for interactive videos. */
function drawVideoMetadata(video: Video, interactive: boolean): m.Children {
  if (!interactive) {
    return null;
  }
  const route = `/video/${formatId(video.id)}`;
  const iconAttrs = { route, colour: "white" };
  const $icon = m(MetadataIcon, iconAttrs);
  return $icon;
}

/** Draws the video with its optional metadata control. */
function drawVideoContent(
  videoState: VideoState,
  attrs: VideoAttrs,
): m.Children {
  const $videoElement = drawVideoElement(videoState, attrs);
  const $metadataIcon = drawVideoMetadata(
    attrs.video,
    attrs.interactive ?? false,
  );
  return m("div", [m("div.photo", [$metadataIcon, $videoElement])]);
}

/** Draws an available video or a clear fallback message. */
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

/** Creates a video component whose controls start hidden. */
export function Video(): m.Component<VideoAttrs> {
  const videoState: VideoState = { controlsVisible: false };

  return { view: viewVideo.bind(null, videoState) };
}

/* Preload is "none" so lists fetch only the poster, not the video data. */
/** Draws an interactive list video that initially loads only its poster. */
export function drawVideoItem(video: Video): m.Children {
  const videoAttrs = {
    key: `video-${video.id}`,
    video,
    preload: VideoPreloadMode.None,
    interactive: true,
  };
  const $item = m(Video, videoAttrs);
  return $item;
}
