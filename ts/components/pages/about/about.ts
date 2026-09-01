import type m from "mithril";
import { initAboutPage } from "./content.ts";
import { viewAboutPage } from "./page.ts";

export type AboutPageAttrs = {
  visible: boolean;
};

export const USAGE_TERMS =
  "You may use this website and its content for personal, non-commerical purposes " +
  "only. For example, using photos as a desktop wallpaper is fine, selling these " +
  "photos is not.";

/** Creates the about page component with title setup and page rendering hooks. */
export function AboutPage(): m.Component<AboutPageAttrs> {
  return {
    oninit: initAboutPage,
    view: viewAboutPage,
  };
}
