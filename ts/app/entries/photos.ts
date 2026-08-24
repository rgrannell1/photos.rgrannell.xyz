/* Resolve photo routes and retain the streamed photo index. */

import m from "mithril";
import { photoUrn } from "../../commons/urn.ts";
import { PhotoPage } from "../../components/pages/photo.ts";
import { PhotosPage } from "../../components/pages/photos.ts";
import type { Photo } from "../../types.ts";
import { services, state } from "../context.ts";
import { pageEntry } from "../shell.ts";

const photoPageComponent = PhotoPage();
const photosPageComponent = PhotosPage();

// Photo URNs loaded per navigation, not redraw. Re-read until stream completes.
let photoUrns: string[] = [];

function readPhotosByLimit(limit: number): Photo[] {
  const photos: Photo[] = [];
  for (const urn of photoUrns.slice(0, limit)) {
    const photo = services.readPhoto(urn);
    if (photo) {
      photos.push(photo);
    }
  }
  return photos;
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
    if (!photo) {
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
