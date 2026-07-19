import m from "mithril";
import { isSmallerThan, setTitle, sharePhotoUrl } from "../services/window.ts";
import { AlbumBanner } from "../components/album-banner.ts";
import { AlbumShareButton } from "../components/album-share-button.ts";
import { countryFlagLinks } from "../components/place-links.ts";
import { Video } from "../components/video.ts";
import type { VideoAttrs } from "../components/video.ts";
import { encodeBitmapDataURL, loadingMode } from "../services/photos.ts";

import type {
  Album,
  Location,
  Photo as PhotoType,
  Services,
  Thing,
  Video as VideoType,
} from "../types.ts";
import { Photo } from "../components/photo.ts";
import type { PhotoAttrs } from "../components/photo.ts";
import { AlbumsButton } from "../components/albums-button.ts";
import { countLabel, preprocessDescription } from "../commons/strings.ts";
import { setify } from "../commons/sets.ts";
import { SMALL_DEVICE_WIDTH } from "../constants/layout.ts";
import { KnownRelations } from "../constants/data.ts";
import { asUrn } from "@rgrannell1/tribbledb";
import { TripPreviousAlbums } from "../components/trip-previous-albums.ts";

type AlbumAttrs = {
  album: Album;
  subjects: Thing[];
  locations: Location[];
  // country URNs; resolved to Country objects via services.readCountries
  country: string | string[];
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
        photosCount,
        description,
        country,
        dateRange,
        shortDateRange,
      } = album;

      const dateRangeText = isSmallerThan(SMALL_DEVICE_WIDTH)
        ? shortDateRange
        : dateRange;

      const photoCountMessage = countLabel(photosCount, "photo");

      const $countryLinks = countryFlagLinks(
        album.id,
        services.readCountries(setify(country)),
      );

      const { id } = asUrn(album.id);
      const url = sharePhotoUrl(`album/${id}`);

      const bannerPhoto = album.albumBanner
        ? services.readPhoto(album.albumBanner)
        : null;
      const bannerSrc = bannerPhoto
        ? (bannerPhoto as Record<string, string>)[
          KnownRelations.MID_IMAGE_LOSSY_URL
        ] ??
          (bannerPhoto as Record<string, string>)[KnownRelations.THUMBNAIL_URL]
        : null;
      const bannerMosaic = (bannerPhoto as Record<string, string> | null)
        ?.[KnownRelations.MOSAIC_BANNER] ?? null;
      const thumbnailDataUrl = bannerMosaic
        ? encodeBitmapDataURL(bannerMosaic, 10, 10)
        : null;

      const $banner = bannerSrc
        ? m(AlbumBanner, { src: bannerSrc, alt: name, thumbnailDataUrl })
        : null;

      const $albumMetadata = m("section.photos-metadata", [
        m("h1", { "data-testid": "album-heading" }, name),
        m("p.photo-album-date", { "data-testid": "album-date" }, m("time", dateRangeText)),
        m("p.photo-album-count", { "data-testid": "album-count" }, photoCountMessage),
        m("p.photo-album-countries", { "data-testid": "album-countries" }, $countryLinks),
        m(TripPreviousAlbums, { albums: tripPreviousAlbums }),
        m(
          "p.photo-album-description",
          { "data-testid": "album-description" },
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
        return m(Video, { video, preload: "auto", interactive: true } satisfies VideoAttrs);
      });

      return m(
        "div",
        {
          class: visible ? "page sidebar-visible" : "page",
        },
        $banner,
        $albumMetadata,
        m("section.photo-container", { "data-testid": "album-photo-grid" }, $photosList),
        m("section.video-container", $videosList),
      );
    },
  };
}
