import m from "mithril";
import { Windows } from "../services/window.ts";
import { Dates } from "../services/dates.ts";
import { AlbumShareButton } from "../components/album-share-button.ts";
import { CountryLink } from "../components/country-link.ts";
import { Video, VideoAttrs } from "../components/video.ts";

import type { Photo as PhotoType, Video as VideoType } from "../types.ts";
import { Photo, PhotoAttrs } from "../components/photo.ts";
import { Photos } from "../services/photos.ts";
import { AlbumsButton } from "../components/albums-button.ts";

type AlbumAttrs = {
  name: string;
  minDate: number;
  maxDate: number;
  photosCount: number;
  videosCount: number;
  description?: string;
  summary: string;
  countries: {
    urn: string | undefined;
    name: string;
    flag: string | undefined;
  }[];
  videos: VideoType[];
  photos: PhotoType[];
};

export function AlbumPage() {
  return {
    oninit() {
      Windows.setTitle("Album - photos");
    },
    view(vnode: m.Vnode<AlbumAttrs>) {
      const {
        name,
        minDate,
        maxDate,
        photosCount,
        description,
        countries,
        photos,
        videos,
      } = vnode.attrs;

      const dateRange = Dates.dateRange(
        minDate,
        maxDate,
        Windows.isSmallerThan(500),
      );

      const photoCountMessage = photosCount === 1
        ? "1 photo"
        : `${photosCount} photos`;

      const $countryLinks = countries.map((country) => {
        return m(CountryLink, {
          ...country,
          mode: "flag",
        });
      });

      const $albumMetadata = m("section.photos-metadata", [
        m("h1", name),
        m("p.photo-album-date", m("time", dateRange)),
        m("p.photo-album-count", photoCountMessage),
        m("p.photo-album-countries", $countryLinks),
        m("p.photo-album-description", m.trust(description ?? "")),
        m(AlbumShareButton, { url: location.href, name }),
        m(AlbumsButton),
      ]);

      const $photosList = photos.map((photo, idx) => {
        return m(
          Photo,
          {
            photo,
            loading: Photos.loadingMode(idx),
          } satisfies PhotoAttrs,
        );
      });
      const $videosList = videos.map((video) => {
        return m(Video, { ...video, preload: "auto" } satisfies VideoAttrs);
      });

      return m(
        "div",
        $albumMetadata,
        m("section.photo-container", $photosList),
        m("section.video-container", $videosList),
      );
    },
  };
}
