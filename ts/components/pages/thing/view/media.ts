/* Support thing operations. */

import m from "mithril";
import type {
  Photo as PhotoType,
  Video as VideoType,
} from "../../../../types/domain.ts";
import { Video } from "../../../media/content/video.ts";
import {
  AlbumCard,
  type AlbumCardAttrs,
} from "../../../album/cards/album-card.ts";
import { NONE } from "../../../../commons/collections/maybe.ts";
import type {
  AlbumEntry,
  CachedReader,
  ThingMetadata,
  ThingPageAttrs,
  ThingSectionComponent,
} from "./thing.ts";
import {
  cachedByUrn,
  readAlbumEntries,
  readThingVideos,
} from "../data/cache.ts";
import {
  addThingListMetadata,
  readBaseThingMetadata,
  readRankMetadata,
} from "../data/metadata.ts";
import {
  ImageLoadingMode,
  VideoPreloadMode,
} from "../../../../constants/display.ts";

/** Add each metadata item to the thing metadata rows. */
export function addMetadataItems(
  metadata: Record<string, m.Children>,
  attrs: ThingPageAttrs,
  items: ThingMetadata[],
): void {
  for (const item of items) {
    addThingListMetadata(metadata, attrs, item);
  }
}

/** Metadata rows for a single thing, not a wildcard listing. */
export function addSingleThingMetadata(
  metadata: Record<string, m.Children>,
  attrs: ThingPageAttrs,
): void {
  const [thing] = attrs.things;
  const baseItems = readBaseThingMetadata(thing);
  const rankItems = readRankMetadata(thing);
  const items = [...baseItems, ...rankItems];
  addMetadataItems(metadata, attrs, items);
}

/** Draw an album card for a thing reference. */
export function drawThingAlbumCard(entry: AlbumEntry): m.Children {
  const attrs: AlbumCardAttrs = {
    album: entry.album,
    countries: entry.countries,
    loading: ImageLoadingMode.Lazy,
    trip: NONE,
    child: m("p"),
  };
  const $card = m(AlbumCard, attrs);
  return $card;
}

/** Wrap media content in a titled section. */
export function drawMediaSection(
  title: string,
  className: string,
  children: m.Children,
): m.Children {
  const $heading = m("h3", title);
  const $content = m(className, children);
  return m("div", [$heading, $content]);
}

/** Draw referenced albums when the thing has album entries. */
export function viewAlbumSection(
  entriesFor: CachedReader<AlbumEntry[]>,
  vnode: m.Vnode<ThingPageAttrs>,
): m.Children {
  const $albums = entriesFor(vnode.attrs).map(drawThingAlbumCard);

  if ($albums.length === 0) {
    return null;
  }

  const $section = drawMediaSection(
    "Albums",
    "section.album-container",
    $albums,
  );
  return $section;
}

/** Create an album section with a reader cached by thing URN. */
export function AlbumSection(): ThingSectionComponent {
  const entriesFor = cachedByUrn(readAlbumEntries);

  return { view: viewAlbumSection.bind(null, entriesFor) };
}

/** Draw an interactive video without eager media loading. */
export function drawThingVideo(video: VideoType): m.Children {
  return m(Video, {
    key: `video-${video.id}`,
    video,
    preload: VideoPreloadMode.None,
    interactive: true,
  });
}

/** Draw the video section when the thing has videos. */
export function viewVideoSection(
  videosFor: CachedReader<VideoType[]>,
  vnode: m.Vnode<ThingPageAttrs>,
): m.Children {
  const videos = videosFor(vnode.attrs);

  if (videos.length === 0) {
    return null;
  }

  const children = videos.map(drawThingVideo);
  return drawMediaSection("Videos", "section.photo-container", children);
}

/** Create a video section with a reader cached by thing URN. */
export function VideoSection(): ThingSectionComponent {
  const videosFor = cachedByUrn(readThingVideos);

  return { view: viewVideoSection.bind(null, videosFor) };
}

/** Limit photos while preserving their current order. */
export function slicePhotos(photos: PhotoType[], limit: number): PhotoType[] {
  return photos.slice(0, limit);
}
