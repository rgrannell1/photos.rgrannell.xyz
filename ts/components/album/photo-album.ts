import m from "mithril";
import { asUrn } from "@rgrannell1/tribbledb";
import { ImagePair, type ImagePairAttrs } from "../media/images/image-pair.ts";
import { PHOTO_HEIGHT, PHOTO_WIDTH } from "../../constants/layout.ts";
import {
  block,
  broadcast,
  isModifiedClick,
} from "../../services/browser/events.ts";
import { isNone, type Maybe } from "../../commons/collections/maybe.ts";

function mixTripHash(hash: number, characterCode: number): number {
  const mixed = (hash * 31 + characterCode) | 0;
  return mixed;
}

function normaliseTripHash(hash: number): number {
  return Math.abs(hash) % 2;
}

// hash the trip so its colour never changes with render order or history
function tripColourIndex(trip: string): number {
  let hash = 0;
  for (let idx = 0; idx < trip.length; idx++) {
    hash = mixTripHash(hash, trip.charCodeAt(idx));
  }
  return normaliseTripHash(hash);
}

function onTripClick(tripId: string, event: Event) {
  // let modified/middle clicks fall through to the browser so the trip route
  // opens in a new tab
  const isBrowserNavigation = isModifiedClick(event as MouseEvent);
  if (isBrowserNavigation) {
    return;
  }

  const route = `/trip/${tripId}`;
  broadcast("navigate", { route });
  block(event);
}

function tripTagAttrs(trip: string) {
  const tripId = asUrn(trip).id;
  const href = `#!/trip/${tripId}`;
  const onclick = onTripClick.bind(null, tripId);
  const linkAttrs = {
    href,
    title: "Show albums from this trip",
    onclick,
  };
  return linkAttrs;
}

function tripTagSelector(trip: string): string {
  const colourIndex = tripColourIndex(trip);
  const selector = `a.trip-tag .trip-color-${colourIndex}`;
  return selector;
}

function viewTripTag(vnode: m.Vnode<{ trip: Maybe<string> }>): m.Children {
  const { trip } = vnode.attrs;

  if (isNone(trip)) {
    return null;
  }

  const selector = tripTagSelector(trip);
  const linkAttrs = tripTagAttrs(trip);
  return m(selector, linkAttrs);
}

function TripTag() {
  return { view: viewTripTag };
}

export type PhotoAlbumAttrs = {
  trip: Maybe<string>;
  // accessible name for the cover-image link
  label?: string;
  imageUrl?: string;
  href?: string;
  thumbnailUrl: string;
  thumbnailDataUrl: Maybe<string>;
  loading: "eager" | "lazy";
  child?: m.Children;
  onclick?: (e: Event) => void;
  minDate?: number;
};

function photoAlbumImageAttrs(attrs: PhotoAlbumAttrs): ImagePairAttrs {
  const imageAttrs: ImagePairAttrs = {
    thumbnailUrl: attrs.thumbnailUrl,
    thumbnailDataUrl: attrs.thumbnailDataUrl,
    loading: attrs.loading,
    onclick: attrs.onclick,
    width: PHOTO_WIDTH,
    height: PHOTO_HEIGHT,
  };
  if (attrs.label !== undefined) {
    imageAttrs.label = attrs.label;
  }
  if (attrs.imageUrl !== undefined) {
    imageAttrs.imageUrl = attrs.imageUrl;
  }
  if (attrs.href !== undefined) {
    imageAttrs.href = attrs.href;
  }
  return imageAttrs;
}

function viewPhotoAlbum(vnode: m.Vnode<PhotoAlbumAttrs>): m.Children {
  const attrs = vnode.attrs;
  const tripTag = m(TripTag, { trip: attrs.trip });
  const image = m(ImagePair, photoAlbumImageAttrs(attrs));
  const containerAttrs = { "data-min-date": attrs.minDate };
  return m("div.photo-album", containerAttrs, [tripTag, image, attrs.child]);
}

export function PhotoAlbum() {
  return { view: viewPhotoAlbum };
}
