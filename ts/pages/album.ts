import m from "mithril";
import { isSmallerThan, setTitle } from "../services/window.ts";
import * as Dates from "../services/dates.ts";
import { AlbumBanner } from "../components/album-banner.ts";
import { AlbumShareButton } from "../components/album-share-button.ts";
import { CountryLink } from "../components/place-links.ts";
import { Video } from "../components/video.ts";
import type { VideoAttrs } from "../components/video.ts";
import { encodeBitmapDataURL, loadingMode } from "../services/photos.ts";

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
import { KnownRelations, SMALL_DEVICE_WIDTH } from "../constants.ts";
import { asUrn } from "@rgrannell1/tribbledb";
import { TripPreviousAlbums } from "../components/trip-previous-albums.ts";

type AlbumAttrs = {
  album: Album;
  subjects: Thing[];
  locations: Location[];
  country: Country[];
  photos: PhotoType[];
  videos: VideoType[];
  services: Services;
  visible: boolean;
  tripPreviousAlbums: Album[];
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
        visible,
        tripPreviousAlbums,
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

      const $countryLinks = services.readCountries(setify(country)).map((country) => {
        return m(CountryLink, {
          country,
          mode: "flag",
        });
      });

      const { id } = asUrn(album.id);
      const url = `https://sharephoto.rgrannell.xyz/album/${id}`;

      const bannerPhoto = album.albumBanner ? services.readPhoto(album.albumBanner) : null;
      const bannerSrc = bannerPhoto
        ? (bannerPhoto as Record<string, string>)[KnownRelations.MID_IMAGE_LOSSY_URL] ??
          (bannerPhoto as Record<string, string>)[KnownRelations.THUMBNAIL_URL]
        : null;
      const bannerMosaic = (bannerPhoto as Record<string, string> | null)?.[KnownRelations.MOSAIC_BANNER] ?? null;
      const thumbnailDataUrl = bannerMosaic ? encodeBitmapDataURL(bannerMosaic, 10, 10) : null;

      const $banner = bannerSrc
        ? m(AlbumBanner, { src: bannerSrc, alt: name, thumbnailDataUrl })
        : null;

      const $albumMetadata = m("section.photos-metadata", [
        m("h1", name),
        m("p.photo-album-date", m("time", dateRangeText)),
        m("p.photo-album-count", photoCountMessage),
        m("p.photo-album-countries", $countryLinks),
        m(TripPreviousAlbums, { albums: tripPreviousAlbums }),
        m(
          "p.photo-album-description",
          m.trust(preprocessDescription(description ?? "") ?? ""),
        ),
        m("br"),
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
        "div",
        {
          class: visible ? "page sidebar-visible" : "page",
        },
        $banner,
        $albumMetadata,
        m("section.photo-container", $photosList),
        m("section.video-container", $videosList),
      );
    },
  };
}
