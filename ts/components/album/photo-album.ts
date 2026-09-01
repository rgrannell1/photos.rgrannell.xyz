import m from "mithril";
import { asUrn } from "@rgrannell1/tribbledb";
import { ImagePair, type ImagePairAttrs } from "../media/images/image-pair.ts";
import { PHOTO_HEIGHT, PHOTO_WIDTH } from "../../constants/layout.ts";
import {
  type ImageLoading,
  TRIP_COLOUR_COUNT,
  TRIP_HASH_MULTIPLIER,
} from "../../constants/display.ts";
import {
  routeLinkAttrs,
} from "../../services/browser/routes.ts";
import { isNone, type Maybe } from "../../commons/collections/maybe.ts";

/** Mix one character into a stable trip hash. */
function mixTripHash(hash: number, characterCode: number): number {
  const mixed = (hash * TRIP_HASH_MULTIPLIER + characterCode) | 0;
  return mixed;
}

/** Map a trip hash to an available colour index. */
function normaliseTripHash(hash: number): number {
  return Math.abs(hash) % TRIP_COLOUR_COUNT;
}

/** Hash the trip so its colour never changes with render order or history. */
function calculateTripColourIndex(trip: string): number {
  let hash = 0;
  for (let idx = 0; idx < trip.length; idx++) {
    hash = mixTripHash(hash, trip.charCodeAt(idx));
  }
  return normaliseTripHash(hash);
}

/** Build accessible link attributes for a trip tag. */
function buildTripTagAttrs(trip: string) {
  const tripId = asUrn(trip).id;
  const href = `/trip/${tripId}`;
  return routeLinkAttrs(href, {
    title: "Show albums from this trip",
  });
}

/** Select the stable colour class for a trip tag. */
function selectTripTagSelector(trip: string): string {
  const colourIndex = calculateTripColourIndex(trip);
  const selector = `a.trip-tag .trip-color-${colourIndex}`;
  return selector;
}

/** Draw a trip tag when the album belongs to a trip. */
function viewTripTag(vnode: m.Vnode<{ trip: Maybe<string> }>): m.Children {
  const { trip } = vnode.attrs;

  if (isNone(trip)) {
    return null;
  }

  const selector = selectTripTagSelector(trip);
  const linkAttrs = buildTripTagAttrs(trip);
  return m(m.route.Link, { ...linkAttrs, selector });
}

/** Create the trip tag component. */
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
  loading: ImageLoading;
  child?: m.Children;
  minDate?: number;
};

/** Map album attributes to the image pair contract. */
function photoAlbumImageAttrs(attrs: PhotoAlbumAttrs): ImagePairAttrs {
  const imageAttrs: ImagePairAttrs = {
    thumbnailUrl: attrs.thumbnailUrl,
    thumbnailDataUrl: attrs.thumbnailDataUrl,
    loading: attrs.loading,
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

/** Draw an album cover with its trip tag and optional child content. */
function viewPhotoAlbum(vnode: m.Vnode<PhotoAlbumAttrs>): m.Children {
  const attrs = vnode.attrs;
  const $tripTag = m(TripTag, { trip: attrs.trip });
  const $image = m(ImagePair, photoAlbumImageAttrs(attrs));
  const containerAttrs = { "data-min-date": attrs.minDate };
  return m("div.photo-album", containerAttrs, [$tripTag, $image, attrs.child]);
}

/** Create an album cover component. */
export function PhotoAlbum() {
  return { view: viewPhotoAlbum };
}
