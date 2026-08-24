import m from "mithril";
import { isSmallerThan, setTitle, sharePhotoUrl } from "../../services/window.ts";
import { AlbumBanner } from "../album/album-banner.ts";
import { ShareButton } from "../share-button.ts";
import { countryFlagLinks } from "../thing/place-links.ts";
import { thumbHashDataUrl } from "../../services/photos.ts";

import type {
  Album,
  Country,
  Photo as PhotoType,
  Video as VideoType,
} from "../../types.ts";
import { drawGridPhoto } from "../media/photo-grid.ts";
import { drawVideoItem } from "../media/video.ts";
import { AlbumsButton } from "../album/albums-button.ts";
import { countLabel, preprocessDescription } from "../../commons/strings.ts";
import { SMALL_DEVICE_WIDTH } from "../../constants/layout.ts";
import { asUrn } from "@rgrannell1/tribbledb";
import { TripPreviousAlbums } from "../album/trip-previous-albums.ts";

type AlbumAttrs = {
  album: Album;
  photos: PhotoType[];
  videos: VideoType[];
  countries: Country[];
  bannerPhoto: PhotoType | undefined;
  visible: boolean;
  tripPreviousAlbums: Album[];
};

function initAlbumPage(): void {
  setTitle("Album - photos");
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

  const {
    name,
    photosCount,
    description,
    dateRange,
    shortDateRange,
  } = album;

  const dateRangeText = isSmallerThan(SMALL_DEVICE_WIDTH)
    ? shortDateRange
    : dateRange;

  const photoCountMessage = countLabel(photosCount, "photo");

  const $countryLinks = countryFlagLinks(
    album.id,
    countries,
  );

  const { id } = asUrn(album.id);
  const url = sharePhotoUrl(`album/${id}`);

  const bannerSrc = bannerPhoto
    ? bannerPhoto.midImageLossyUrl ?? bannerPhoto.thumbnailUrl
    : null;
  const thumbnailDataUrl = thumbHashDataUrl(bannerPhoto?.mosaicBanner);

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
    m(ShareButton, { url, name }),
    " ",
    m(AlbumsButton),
    " ",
  ]);

  const $photosList = photos.map(drawGridPhoto);
  const $videosList = videos.map(drawVideoItem);

  return m(
    "main",
    {
      class: visible ? "page sidebar-visible" : "page",
    },
    $banner,
    $albumMetadata,
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
