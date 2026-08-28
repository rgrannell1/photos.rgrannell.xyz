import m from "mithril";

import { setTitle } from "../../services/browser/window.ts";
import { navigate } from "../../services/browser/events.ts";
import { AlbumBanner } from "../album/album-banner.ts";
import { thumbHashDataUrl } from "../../services/rendering/photos.ts";
import {
  ABOUT_BANNER_MOSAIC,
  ABOUT_BANNER_URL,
} from "../../constants/banners.ts";

type AboutPageAttrs = {
  visible: boolean;
};

const USAGE_TERMS =
  "You may use this website and its content for personal, non-commerical purposes " +
  "only. For example, using photos as a desktop wallpaper is fine, selling these " +
  "photos is not.";

function initAboutPage(): void {
  setTitle("About - photos");
}

function drawIntro(): m.Children {
  const years = new Date().getFullYear() - 2012;
  const intro = `I started taking photos ${years} years ago. It's a fun hobby; it ` +
    "motivates me to get outside and see interesting things and interact with " +
    "nature. I've become, in my opinion, a reasonable wildlife photographer " +
    "(though hit-or-miss at other styles of photography). I built this website to " +
    "share the things";

  return m("p", [
    intro,
    m("a", {
      href: "/#/thing/rating:4",
      onclick: navigate(`/thing/rating:4`),
    }, " I found beautiful in this world."),
    " It's also, from one angle, a journal of the my life.",
  ]);
}

function drawAboutContent(): m.Children {
  return m("section.about-page", [
    m("h1", "About"),
    m("br"),
    drawIntro(),
    m("h2", "Can I use the photos on this site?"),
    m("p", USAGE_TERMS),
    m("h2", "Can I use data from this site to train AI?"),
    m("p", [
      "No, absolutely not. The ",
      m("a", { href: "/robots.txt" }, "robots.txt"),
      " file for this site explicitly prohibits this.",
    ]),
    m("h2", "What is your contact information?"),
    m("p", [
      "See ",
      m("a", { href: "https://rho.ie/" }, "my personal site"),
      " for contact details.",
    ]),
  ]);
}

function viewAboutPage(vnode: m.Vnode<AboutPageAttrs>): m.Children {
  const className = vnode.attrs.visible ? "page sidebar-visible" : "page";
  const banner = m(AlbumBanner, {
    src: ABOUT_BANNER_URL,
    alt: "About",
    thumbnailDataUrl: thumbHashDataUrl(ABOUT_BANNER_MOSAIC),
  });
  return m("main", { class: className }, [banner, drawAboutContent()]);
}

export function AboutPage() {
  return {
    oninit: initAboutPage,
    view: viewAboutPage,
  };
}
