/* Resolve photo routes and retain the streamed photo index. */

import m from "mithril";
import { photoUrn } from "../../commons/urn.ts";
import { PhotoPage } from "../../components/pages/photo.ts";
import { PhotosPage } from "../../components/pages/photos.ts";
import type { Photo } from "../../types/domain.ts";
import { services, state } from "../context.ts";
import { pageEntry } from "../shell.ts";
import { readPrefix } from "../../commons/cache.ts";
import { isNone, type Maybe } from "../../commons/maybe.ts";

const photoPageComponent = PhotoPage();
const photosPageComponent = PhotosPage();

// Photo URNs loaded per navigation, not redraw. Re-read until stream completes.
let photoUrns: string[] = [];
const photoCache = new Map<string, Maybe<Photo>>();

function readPhotoMaybe(urn: string): Maybe<Photo> {
  return services.readPhoto(urn);
}

function readPhotosByLimit(limit: number): Photo[] {
  const cache = state.loaded
    ? photoCache
    : new Map<string, Maybe<Photo>>();
  return readPrefix(photoUrns, limit, cache, readPhotoMaybe);
}

export const photosEntry = pageEntry({
  page: photosPageComponent,
  onmatch() {
    photoUrns = services.readAllPhotoUrns();
  },
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
  page: photoPageComponent,
  resolve() {
    const id = m.route.param("id");
    if (typeof id !== "string") {
      return "No photo selected";
    }

    const photo = services.readPhoto(photoUrn(id));
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
