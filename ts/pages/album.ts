import m from "mithril";
import { Windows } from "../services/window.ts";
import { Dates } from "../services/dates.ts";
import { AlbumShareButton } from "../components/album-share-button.ts";

type AlbumAttrs = {
  title: string;
  minDate: number;
  maxDate: number;
  photosCount: number;
  description: string;
}

export function AlbumPage() {
  return {
    oninit() {
      Windows.setTitle("Album - photos");
    },
    view(vnode: m.Vnode<AlbumAttrs>) {
      const { title, minDate, maxDate, photosCount, description } = vnode.attrs;

      const dateRange = Dates.dateRange(
        minDate,
        maxDate,
        Windows.isSmallerThan(500),
      );

      const photoCountMessage = photosCount === 1
        ? "1 photo"
        : `${photosCount} photos`;

      const $countryLinks = [];

      const $albumMetadata = m("section.photos-metadata", [
        m("h1", title),
        m("p.photo-album-count",
          m("time", dateRange)
        ),
        m("p.photo-album-count", photoCountMessage),
        m("photo-album-countries", $countryLinks),
        m("photo-album-description", m.trust(description)),
      ]);

      return m("div",
        $albumMetadata,
        m(AlbumShareButton, { url: location.href, title }),
        m("section.photo-container", $photosList),
        m("section.video-container", $videosList),
      )
    },
  };
}
