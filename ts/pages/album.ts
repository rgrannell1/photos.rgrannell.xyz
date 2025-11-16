import m from "mithril";
import { Windows } from "../services/window.ts";
import { Dates } from "../services/dates.ts";
import { AlbumShareButton } from "../components/album-share-button.ts";
import { CountryLink } from "../components/place-links.ts";
import { Video } from "../components/video.ts";
import type { VideoAttrs } from "../components/video.ts";

import type {
  Album,
  Country,
  Photo as PhotoType,
  Thing,
  Video as VideoType,
} from "../types.ts";
import { Photo } from "../components/photo.ts";
import type { PhotoAttrs } from "../components/photo.ts";
import { Photos } from "../services/photos.ts";
import { AlbumsButton } from "../components/albums-button.ts";
import { AlbumThings } from "../components/album-things.ts";
import { Strings } from "../commons/strings.ts";

// TODO replace with album type
type AlbumAttrs = {
  album: Album;
  countries: Country[];
  videos: VideoType[];
  photos: PhotoType[];
  subjects: Thing[];
  locations: Thing[];
};

/* */
export function AlbumPage() {
  return {
    oninit() {
      Windows.setTitle("Album - photos");
    },
    view(vnode: m.Vnode<AlbumAttrs>) {
      const {
        album,
        photos,
        videos,
        subjects,
        locations,
      } = vnode.attrs;

      const {
        name,
        minDate,
        maxDate,
        photosCount,
        description,
        countries,
      } = album;

      // TODO patch typing issue
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
          country,
          mode: "flag",
        });
      });

      const $albumMetadata = m("section.photos-metadata", [
        m("h1", name),
        m("p.photo-album-date", m("time", dateRange)),
        m("p.photo-album-count", photoCountMessage),
        m("p.photo-album-countries", $countryLinks),
        m(
          "p.photo-album-description",
          m.trust(Strings.preprocessDescription(description) ?? ""),
        ),
        m(AlbumShareButton, { url: location.href, name }),
        " ",
        m(AlbumsButton),
        " ",
        m(AlbumThings, { subjects, locations }),
      ]);

      const $photosList = photos.map((photo, idx) => {
        return m(
          Photo,
          {
            photo,
            loading: Photos.loadingMode(idx),
            interactive: true,
          } satisfies PhotoAttrs,
        );
      });
      const $videosList = videos.map((video) => {
        return m(Video, { video, preload: "auto" } satisfies VideoAttrs);
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
