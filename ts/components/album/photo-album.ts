import m from "mithril";
import { ImagePair } from "../media/photo.ts";
import { PHOTO_HEIGHT, PHOTO_WIDTH } from "../../constants/layout.ts";

// use this to keep track of trips, to assign each a
// colour distinct from the adjacent ones
const TRIPS: string[] = [];

function TripTag() {
  return {
    view(vnode: m.Vnode<{ trip: string | undefined }>) {
      const { trip } = vnode.attrs;

      if (!trip) {
        return null;
      }

      if (!TRIPS.includes(trip)) {
        TRIPS.push(trip);
      }

      // two colours supported
      const tripIndex = TRIPS.indexOf(trip);
      return m("div.trip-tag .trip-color-" + (tripIndex % 2));
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
