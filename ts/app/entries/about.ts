/* Resolve the static about route. */

import { AboutPage } from "../../components/pages/about.ts";
import { state } from "../context.ts";
import { pageEntry } from "../shell.ts";

const aboutPageComponent = AboutPage();

export const aboutEntry = pageEntry({
  page: aboutPageComponent,
  resolve() {
    return {
      appClass: "album-page",
      attrs: { visible: state.sidebarVisible },
    };
  },
});
