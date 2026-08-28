import m from "mithril";
import { isSmallerThan, setTitle, sharePhotoUrl } from "../../services/browser/window.ts";
import { AlbumBanner } from "../album/album-banner.ts";
import { ShareButton } from "../share-button.ts";
import { countryFlagLinks } from "../thing/country-link.ts";
import { thumbHashDataUrl } from "../../services/rendering/photos.ts";

import type {
  Album,
  Country,
  Photo as PhotoType,
  Video as VideoType,
} from "../../types/domain.ts";
import { drawGridPhoto } from "../media/photo-grid.ts";
import { drawVideoItem } from "../media/video.ts";
import { AlbumsButton } from "../album/albums-button.ts";
import { countLabel, preprocessDescription } from "../../commons/strings.ts";
import { SMALL_DEVICE_WIDTH } from "../../constants/layout.ts";
import { asUrn } from "@rgrannell1/tribbledb";
import { TripPreviousAlbums } from "../album/trip-previous-albums.ts";
import {
  fromNullable,
  isNone,
  type Maybe,
  NONE,
} from "../../commons/maybe.ts";

type AlbumAttrs = {
  album: Album;
  photos: PhotoType[];
  videos: VideoType[];
  countries: Country[];
  bannerPhoto: Maybe<PhotoType>;
  visible: boolean;
  tripPreviousAlbums: Album[];
};

function initAlbumPage(): void {
  setTitle("Album - photos");
}

function drawAlbumBanner(
  album: Album,
  bannerPhoto: Maybe<PhotoType>,
): m.Children {
  const bannerSrc = !isNone(bannerPhoto)
    ? bannerPhoto.midImageLossyUrl ?? bannerPhoto.thumbnailUrl
    : null;
  const mosaic = isNone(bannerPhoto)
    ? NONE
    : fromNullable(bannerPhoto.mosaicBanner);
  const thumbnailDataUrl = thumbHashDataUrl(mosaic);

  if (!bannerSrc) {
    return null;
  }

  return m(AlbumBanner, {
    src: bannerSrc,
    alt: album.name,
    thumbnailDataUrl,
  });
}

function drawAlbumMetadata(
  album: Album,
  countries: Country[],
  tripPreviousAlbums: Album[],
): m.Children {
  const dateRangeText = isSmallerThan(SMALL_DEVICE_WIDTH)
    ? album.shortDateRange
    : album.dateRange;
  const { id } = asUrn(album.id);
  const url = sharePhotoUrl(`album/${id}`);

  return m("section.photos-metadata", [
    m("h1", { "data-testid": "album-heading" }, album.name),
    m("p.photo-album-date", { "data-testid": "album-date" }, m("time", dateRangeText)),
    m("p.photo-album-count", { "data-testid": "album-count" },
      countLabel(album.photosCount, "photo")),
    m("p.photo-album-countries", { "data-testid": "album-countries" },
      countryFlagLinks(album.id, countries)),
    m(TripPreviousAlbums, { albums: tripPreviousAlbums }),
    m("p.photo-album-description", { "data-testid": "album-description" },
      m.trust(preprocessDescription(album.description ?? "") ?? "")),
    m("br"),
    m(ShareButton, { url, name: album.name }),
    " ",
    m(AlbumsButton),
    " ",
  ]);
}

function viewAlbumPage(vnode: m.Vnode<AlbumAttrs>): m.Children {
  const {
    album,
    photos,
    videos,
    countries,
    bannerPhoto,
    visible,
    tripPreviousAlbums,
  } = vnode.attrs;

  const $photosList = photos.map(drawGridPhoto);
  const $videosList = videos.map(drawVideoItem);

  return m(
    "main",
    {
      class: visible ? "page sidebar-visible" : "page",
    },
    drawAlbumBanner(album, bannerPhoto),
    drawAlbumMetadata(album, countries, tripPreviousAlbums),
    m("section.photo-container", { "data-testid": "album-photo-grid" }, $photosList),
    m("section.video-container", $videosList),
  );
}

export function AlbumPage() {
  return {
    oninit: initAlbumPage,
    view: viewAlbumPage,
  };
}
