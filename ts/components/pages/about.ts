import m from "mithril";

import { setTitle } from "../../services/window.ts";
import { navigate } from "../../commons/events.ts";
import { AlbumBanner } from "../album/album-banner.ts";
import { encodeBitmapDataURL } from "../../services/photos.ts";
import { ABOUT_BANNER_MOSAIC, BANNER_MOSAIC_DIMENSION } from "../../constants/banners.ts";

type AboutPageAttrs = {
  visible: boolean;
};

const USAGE_TERMS =
  "You may use this website and its content for personal, non-commerical purposes " +
  "only. For example, using photos as a desktop wallpaper is fine, selling these " +
  "photos is not.";

/* */
export function AboutPage() {
  return {
    oninit() {
      setTitle("About - photos");
    },
    view(vnode: m.Vnode<AboutPageAttrs>) {
      const { visible } = vnode.attrs;
      const years = new Date().getFullYear() - 2012;

      const intro = `I started taking photos ${years} years ago. It's a fun hobby; it ` +
        "motivates me to get outside and see interesting things and interact with " +
        "nature. I've become, in my opinion, a reasonable wildlife photographer " +
        "(though hit-or-miss at other styles of photography). I built this website to " +
        "share the things";

      const bannerSrc = "https://photos-cdn.rgrannell.xyz/6744c802d1.webp";
      const bannerDataUrl = encodeBitmapDataURL(
        ABOUT_BANNER_MOSAIC,
        BANNER_MOSAIC_DIMENSION,
        BANNER_MOSAIC_DIMENSION,
      );

      return m("div", {
        class: visible ? "page sidebar-visible" : "page",
      }, [
        m(AlbumBanner, {
          src: bannerSrc,
          alt: "About",
          thumbnailDataUrl: bannerDataUrl,
        }),
        m("section.about-page", [
          m("h1", "About"),
          m("br"),
          m(
            "p",
            intro,
            m("a", {
              href: "/#/thing/rating:4",
              onclick: navigate(`/thing/rating:4`),
            }, " I found beautiful in this world. It's also, from one angle, a journal of the my life."),
          ),
          m("h2", "Can I use the photos on this site?"),
          m(
            "p",
            USAGE_TERMS,
          ),
          m("h2", "Can I use data from this site to train AI?"),
          m(
            "p",
            "No, absolutely not. The ",
            m(
              "a",
              { href: "/robots.txt" },
              "robots.txt",
            ),
            " file for this site explicitly prohibits this.",
          ),
          m("h2", "What is your contact information?"),
          m(
            "p",
            "See ",
            m("a", { href: "https://rho.ie/" }, "my personal site"),
            " for contact details.",
          ),
        ]),
      ]);
    },
  };
}
