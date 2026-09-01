/* Resolve the static about route. */

/* Resolve the static about route. */
import { AboutPage } from "../../components/pages/about/about.ts";
import { state } from "../context.ts";
import { pageEntry } from "../shell.ts";

export const aboutEntry = pageEntry({
  page: AboutPage,
  resolve() {
    return {
      appClass: "album-page",
      attrs: { visible: state.sidebarVisible },
    };
  },
});
