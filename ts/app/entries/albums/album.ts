/* Resolve the album route and prepare its page data. */

import m from "mithril";
import { setify } from "../../../commons/collections/sets.ts";
import { buildAlbumUrn } from "../../../commons/urn.ts";
import { AlbumPage } from "../../../components/pages/albums/album.ts";
import type { Album, Country, Photo, Video } from "../../../types/domain.ts";
import { services, state } from "../../context.ts";
import { pageEntry } from "../../shell.ts";
import { fromNullable, isNone, type Maybe, NONE } from "../../../commons/collections/maybe.ts";
import type { Result } from "../../../commons/collections/result.ts";

type AlbumPageModel = {
  album: Album;
  photos: Photo[];
  videos: Video[];
  countries: Country[];
  bannerPhoto: Maybe<Photo>;
  tripPreviousAlbums: Album[];
};

let cachedId: Maybe<string> = NONE;
let cachedModel: Maybe<Result<AlbumPageModel, string>> = NONE;
let cachedAfterLoad = false;

/**
 * Build the complete album view model or report a missing album.
 */
function readAlbumPageModel(id: string): Result<AlbumPageModel, string> {
  const urn = buildAlbumUrn(id);

  const album = services.readAlbum(urn);
  if (isNone(album)) {
    return { ok: false, error: "Album not found" };
  }

  const tripPreviousAlbums = album.trip
    ? services.readTripAlbums(album.trip)
      .filter((tripAlbum) => tripAlbum.minDate < album.minDate)
      .sort((albumA, albumB) => albumB.minDate - albumA.minDate)
    : [];

  return {
    ok: true,
    value: {
      album,
      photos: services.readAlbumPhotosByAlbumId(urn),
      videos: services.readAlbumVideosByAlbumId(urn),
      countries: services.readCountries(setify(fromNullable(album.country))),
      bannerPhoto: album.albumBanner
        ? services.readPhoto(album.albumBanner)
        : NONE,
      tripPreviousAlbums,
    },
  };
}

export const albumEntry = pageEntry({
  page: AlbumPage,
  /** Resolves the current route into cached album page data. */
  resolve() {
    const id = m.route.param("id");
    if (typeof id !== "string") {
      return "No album selected";
    }

    const shouldRefreshCache = id !== cachedId || !state.loaded ||
      !cachedAfterLoad;
    if (shouldRefreshCache) {
      cachedId = id;
      cachedModel = readAlbumPageModel(id);
      cachedAfterLoad = state.loaded;
    }

    if (isNone(cachedModel)) {
      return "Album not found";
    }
    if (!cachedModel.ok) {
      return cachedModel.error;
    }
    const model = cachedModel.value;

    return {
      appClass: model.album.albumBanner ? "album-page" : undefined,
      attrs: {
        ...model,
        visible: state.sidebarVisible,
      },
    };
  },
});
