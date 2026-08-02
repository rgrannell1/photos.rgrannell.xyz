import m from "mithril";
import { asUrn } from "@rgrannell1/tribbledb";
import { ImagePair } from "../media/photo.ts";
import { PHOTO_HEIGHT, PHOTO_WIDTH } from "../../constants/layout.ts";
import { block, broadcast, isModifiedClick } from "../../commons/events.ts";

// stable two-colour assignment: hash the trip so its colour never changes
// with render order or navigation history
function tripColourIndex(trip: string): number {
  let hash = 0;
  for (let idx = 0; idx < trip.length; idx++) {
    hash = (hash * 31 + trip.charCodeAt(idx)) | 0;
  }
  return Math.abs(hash) % 2;
}

function onTripClick(tripId: string, event: Event) {
  // let modified/middle clicks fall through to the browser so the trip route
  // opens in a new tab
  if (isModifiedClick(event as MouseEvent)) {
    return;
  }

  broadcast("navigate", { route: `/trip/${tripId}` });
  block(event);
}

function TripTag() {
  return {
    view(vnode: m.Vnode<{ trip: string | undefined }>) {
      const { trip } = vnode.attrs;

      if (!trip) {
        return null;
      }

      const tripId = asUrn(trip).id;

      // two colours supported
      return m("a.trip-tag .trip-color-" + tripColourIndex(trip), {
        href: `#!/trip/${tripId}`,
        title: "Show albums from this trip",
        onclick: onTripClick.bind(null, tripId),
      });
    },
  };
}

export type PhotoAlbumAttrs = {
  trip: string | undefined;
  imageUrl?: string;
  href?: string;
  thumbnailUrl: string;
  thumbnailDataUrl: string;
  loading: "eager" | "lazy";
  child?: m.Children;
  onclick?: (e: Event) => void;
  minDate?: number;
};

/* */
export function PhotoAlbum() {
  return {
    view(vnode: m.Vnode<PhotoAlbumAttrs>) {
      const {
        imageUrl,
        href,
        thumbnailUrl,
        thumbnailDataUrl,
        loading,
        child,
        minDate,
        onclick,
        trip,
      } = vnode.attrs;

      return m("div.photo-album", { "data-min-date": minDate }, [
        m(TripTag, { trip }),
        m(ImagePair, {
          thumbnailUrl,
          thumbnailDataUrl,
          loading,
          onclick,
          width: PHOTO_WIDTH,
          height: PHOTO_HEIGHT,
          ...(imageUrl !== undefined && { imageUrl }),
          ...(href !== undefined && { href }),
        }),
        // NODE this might be broken
        child,
      ]);
    },
  };
}
