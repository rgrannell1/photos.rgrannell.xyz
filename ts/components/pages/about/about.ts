import { initAboutPage } from "./content.ts";
import { viewAboutPage } from "./page.ts";

export type AboutPageAttrs = {
  visible: boolean;
};

export const USAGE_TERMS =
  "You may use this website and its content for personal, non-commerical purposes " +
  "only. For example, using photos as a desktop wallpaper is fine, selling these " +
  "photos is not.";

export function AboutPage() {
  return {
    oninit: initAboutPage,
    view: viewAboutPage,
  };
}
