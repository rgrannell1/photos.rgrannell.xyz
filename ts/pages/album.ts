import m from "mithril";
import { Windows } from "../services/window.ts";
import { Dates } from "../services/dates.ts";
import { AlbumShareButton } from "../components/album-share-button.ts";
import { CountryLink } from "../components/country-link.ts";

type AlbumAttrs = {
  name: string;
  minDate: number;
  maxDate: number;
  photosCount: number;
  description: string;
  countries: {
    urn: string | undefined;
    name: string;
    flag: string | undefined;
  }[];
};

export function AlbumPage() {
  return {
    oninit() {
      Windows.setTitle("Album - photos");
    },
    view(vnode: m.Vnode<AlbumAttrs>) {
      const { name, minDate, maxDate, photosCount, description, countries } =
        vnode.attrs;

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
        m("p.photo-album-count", m("time", dateRange)),
        m("p.photo-album-count", photoCountMessage),
        m("photo-album-countries", $countryLinks),
        m("photo-album-description", m.trust(description)),
      ]);

      const $photosList = []
      const $videosList = []

      return m(
        "div",
        $albumMetadata,
        m(AlbumShareButton, { url: location.href, name }),
        m("section.photo-container", $photosList),
        m("section.video-container", $videosList),
      );
    },
  };
}
