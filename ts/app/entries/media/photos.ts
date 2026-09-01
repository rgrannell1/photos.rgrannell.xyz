/* Resolve photo routes and retain the streamed photo index. */

import m from "mithril";
import { buildPhotoUrn } from "../../../commons/urn.ts";
import { PhotoPage } from "../../../components/pages/photo/photo.ts";
import { PhotosPage } from "../../../components/pages/photo/photos.ts";
import type { Photo } from "../../../types/domain.ts";
import { services, state } from "../../context.ts";
import { pageEntry } from "../../shell.ts";
import { readPrefix } from "../../../commons/cache.ts";
import { isNone, type Maybe } from "../../../commons/collections/maybe.ts";

// Photo URNs loaded per navigation, not redraw. Re-read until stream completes.
let photoUrns: string[] = [];
const photoCache = new Map<string, Maybe<Photo>>();

/** Reads one photo while preserving the missing-value result. */
function readPhotoMaybe(urn: string): Maybe<Photo> {
  return services.readPhoto(urn);
}

/** Reads a limited photo prefix through the navigation cache. */
function readPhotosByLimit(limit: number): Photo[] {
  const cache = state.loaded ? photoCache : new Map<string, Maybe<Photo>>();
  const photos = readPrefix(photoUrns, limit, cache, readPhotoMaybe);
  return photos;
}

export const photosEntry = pageEntry({
  page: PhotosPage,
  /** Captures the photo URN index once for the new navigation. */
  onmatch() {
    photoUrns = services.readAllPhotoUrns();
  },
  /** Resolves the photo collection page from the current streamed index. */
  resolve() {
    if (!state.loaded) {
      photoUrns = services.readAllPhotoUrns();
    }

    return {
      attrs: {
        total: photoUrns.length,
        getPhotos: readPhotosByLimit,
        visible: state.sidebarVisible,
      },
    };
  },
});

export const photoEntry = pageEntry({
  page: PhotoPage,
  /** Resolves one photo route and its page services. */
  resolve() {
    const id = m.route.param("id");
    if (typeof id !== "string") {
      return "No photo selected";
    }

    const photo = services.readPhoto(buildPhotoUrn(id));
    if (isNone(photo)) {
      return "Photo not found";
    }

    return {
      attrs: {
        photo,
        albumHidden: services.isAlbumHidden(photo.albumId),
        readThing: services.readThing,
        readEmoji: services.readThingEmoji,
        visible: state.sidebarVisible,
      },
    };
  },
});
