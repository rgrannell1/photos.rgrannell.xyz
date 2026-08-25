/* Resolve the album route and prepare its page data. */

import m from "mithril";
import { setify } from "../../commons/sets.ts";
import { albumUrn } from "../../commons/urn.ts";
import { AlbumPage } from "../../components/pages/album.ts";
import type { Album, Country, Photo, Video } from "../../types.ts";
import { services, state } from "../context.ts";
import { pageEntry } from "../shell.ts";
import { fromNullable, isNone, type Maybe, NONE } from "../../commons/maybe.ts";

const albumPageComponent = AlbumPage();

type AlbumPageModel = {
  album: Album;
  photos: Photo[];
  videos: Video[];
  countries: Country[];
  bannerPhoto: Maybe<Photo>;
  tripPreviousAlbums: Album[];
};

let cachedId: Maybe<string> = NONE;
let cachedModel: Maybe<AlbumPageModel | string> = NONE;
let cachedAfterLoad = false;

function readAlbumPageModel(id: string): AlbumPageModel | string {
  const urn = albumUrn(id);

  const album = services.readAlbum(urn);
  if (isNone(album)) {
    return "Album not found";
  }

  const tripPreviousAlbums = album.trip
    ? services.readTripAlbums(album.trip)
      .filter((tripAlbum) => tripAlbum.minDate < album.minDate)
      .sort((albumA, albumB) => albumB.minDate - albumA.minDate)
    : [];

  return {
    album,
    photos: services.readAlbumPhotosByAlbumId(urn),
    videos: services.readAlbumVideosByAlbumId(urn),
    countries: services.readCountries(setify(fromNullable(album.country))),
    bannerPhoto: album.albumBanner ? services.readPhoto(album.albumBanner) : NONE,
    tripPreviousAlbums,
  };
}

export const albumEntry = pageEntry({
  page: albumPageComponent,
  resolve() {
    const id = m.route.param("id");
    if (typeof id !== "string") {
      return "No album selected";
    }

    const shouldRefreshCache = id !== cachedId || !state.loaded || !cachedAfterLoad;
    if (shouldRefreshCache) {
      cachedId = id;
      cachedModel = readAlbumPageModel(id);
      cachedAfterLoad = state.loaded;
    }

    if (typeof cachedModel === "string") {
      return cachedModel;
    }
    if (isNone(cachedModel)) {
      return "Album not found";
    }

    return {
      appClass: cachedModel.album.albumBanner ? "album-page" : undefined,
      attrs: {
        ...cachedModel,
        visible: state.sidebarVisible,
      },
    };
  },
});
