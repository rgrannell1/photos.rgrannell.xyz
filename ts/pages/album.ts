import m from "mithril";
import { isSmallerThan, setTitle } from "../services/window.ts";
import * as Dates from "../services/dates.ts";
import { AlbumShareButton } from "../components/album-share-button.ts";
import { CountryLink } from "../components/place-links.ts";
import { Video } from "../components/video.ts";
import type { VideoAttrs } from "../components/video.ts";
import { loadingMode } from "../services/photos.ts";

import type {
  Album,
  Country,
  Photo as PhotoType,
  Services,
  Thing,
  Video as VideoType,
} from "../types.ts";
import { Photo } from "../components/photo.ts";
import type { PhotoAttrs } from "../components/photo.ts";
import { AlbumsButton } from "../components/albums-button.ts";
import { preprocessDescription } from "../commons/strings.ts";
import { setify } from "../commons/sets.ts";
import { SMALL_DEVICE_WIDTH } from "../constants.ts";
import { asUrn } from "@rgrannell1/tribbledb";

type AlbumAttrs = {
  album: Album;
  subjects: Thing[];
  locations: Location[];
  country: Country[];
  photos: PhotoType[];
  videos: VideoType[];
  services: Services;
};

/* */
export function AlbumPage() {
  return {
    oninit() {
      setTitle("Album - photos");
    },
    view(vnode: m.Vnode<AlbumAttrs>) {
      const {
        album,
        photos,
        videos,
        services,
      } = vnode.attrs;

      const {
        name,
        minDate,
        maxDate,
        photosCount,
        description,
        country,
        dateRange,
        shortDateRange,
      } = album;

      const dateRangeText = isSmallerThan(SMALL_DEVICE_WIDTH)
        ? shortDateRange
        : dateRange;

      const photoCountMessage = photosCount === 1
        ? "1 photo"
        : `${photosCount} photos`;

      const $countryLinks = services.readCountries(
        services.namesToUrns(setify(country)),
      ).map((country) => {
        return m(CountryLink, {
          country,
          mode: "flag",
        });
      });

      const { id } = asUrn(album.id);
      const url = `https://sharephoto.rgrannell.xyz/album/${id}`;

      const $albumMetadata = m("section.photos-metadata", [
        m("h1", name),
        m("p.photo-album-date", m("time", dateRangeText)),
        m("p.photo-album-count", photoCountMessage),
        m("p.photo-album-countries", $countryLinks),
        m(
          "p.photo-album-description",
          m.trust(preprocessDescription(description ?? "") ?? ""),
        ),
        m(AlbumShareButton, { url, name }),
        " ",
        m(AlbumsButton),
        " ",
      ]);

      const $photosList = photos.map((photo, idx) => {
        return m(
          Photo,
          {
            photo,
            loading: loadingMode(idx),
            interactive: true,
          } satisfies PhotoAttrs,
        );
      });
      const $videosList = videos.map((video) => {
        return m(Video, { video, preload: "auto" } satisfies VideoAttrs);
      });

      return m(
        "div.page",
        $albumMetadata,
        m("section.photo-container", $photosList),
        m("section.video-container", $videosList),
      );
    },
  };
}
