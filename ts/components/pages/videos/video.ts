import m from "mithril";
import { Video } from "../../media/content/video.ts";
import type { Video as VideoType } from "../../../types/domain.ts";
import { AlbumButton } from "../../album/album-button.ts";
import { MediaInfo } from "../../media/metadata/media-info.ts";
import type { ReadThing } from "../../thing/navigation/thing-links.ts";
import type { ReadThingEmoji } from "../../thing/navigation/thing-link.ts";

type VideoPageAttrs = {
  video: VideoType;
  albumHidden: boolean;
  readThing: ReadThing;
  readEmoji: ReadThingEmoji;
  visible: boolean;
};

/** Draw a labelled video resource link when its URL exists. */
function drawVideoLink(href: string | undefined, label: string): m.Children {
  if (href === undefined) return null;
  return m("li", m("a", { href }, label));
}

/** Draw links to the unscaled and 1080p video resources. */
function drawLargeVideoLinks(video: VideoType): m.Children[] {
  const large = drawVideoLink(video.videoUrlUnscaled, "[L]");
  const medium = drawVideoLink(video.videoUrl1080p, "[M]");
  return [large, medium];
}

/** Draw links to the 720p and 480p video resources. */
function drawSmallVideoLinks(video: VideoType): m.Children[] {
  const small = drawVideoLink(video.videoUrl720p, "[S]");
  const extraSmall = drawVideoLink(video.videoUrl480p, "[XS]");
  return [small, extraSmall];
}

/** Collect all available video resource links in size order. */
function drawVideoResourceLinks(video: VideoType): m.Children[] {
  return [...drawLargeVideoLinks(video), ...drawSmallVideoLinks(video)];
}

/** Draw the video's album link with the requested visibility. */
function drawVideoAlbumLink(
  video: VideoType,
  albumHidden: boolean,
): m.Children {
  const attrs = { id: video.albumId, hidden: albumHidden };
  const button = m(AlbumButton, attrs);
  return m("li", button);
}

/** Draw the video resource and album links as one list. */
function drawVideoLinks(video: VideoType, albumHidden: boolean): m.Children {
  const links = drawVideoResourceLinks(video);
  const albumLink = drawVideoAlbumLink(video, albumHidden);
  links.push(albumLink);
  return m("ul.link-list", links);
}

/** Draw semantic metadata for the video. */
function drawVideoInformation(attrs: VideoPageAttrs): m.Children {
  return m(MediaInfo, {
    media: attrs.video,
    readThing: attrs.readThing,
    readEmoji: attrs.readEmoji,
  });
}

/** Draw video details with the current sidebar layout class. */
function drawVideoDetails(attrs: VideoPageAttrs): m.Children {
  const className = attrs.visible ? "page sidebar-visible" : "page";
  const details = [m("h3", "Video Information"), drawVideoInformation(attrs)];
  return m("div", { class: className }, details);
}

/** Draw the non-interactive video player with eager media preload. */
function drawVideo(video: VideoType): m.Children {
  return m(Video, { video, preload: "auto", interactive: false });
}

/** Assemble the video player, links, and details. */
function drawVideoPageContent(attrs: VideoPageAttrs): m.Children[] {
  const video = drawVideo(attrs.video);
  const links = drawVideoLinks(attrs.video, attrs.albumHidden);
  return [
    m("h1", "Video"),
    video,
    links,
    drawVideoDetails(attrs),
  ];
}

/** Draw the video page root. */
function viewVideoPage(vnode: m.Vnode<VideoPageAttrs>): m.Children {
  const content = drawVideoPageContent(vnode.attrs);
  return m("main", content);
}

/** Create the video page component. */
export function VideoPage() {
  return { view: viewVideoPage };
}
