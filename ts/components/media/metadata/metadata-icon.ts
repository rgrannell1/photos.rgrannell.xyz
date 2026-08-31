import m from "mithril";
import { broadcast } from "../../../services/browser/events.ts";

// The circled "i" glyph.
const INFO_GLYPH_PATH =
  "m10 20c-5.523 0-10-4.477-10-10s4.477-10 10-10 10 4.477 10 10" +
  "-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-10a1 1 0 0 1 1 1v5a1 1 0 0 1 " +
  "-2 0v-5a1 1 0 0 1 1-1zm0-1a1 1 0 1 1 0-2 1 1 0 0 1 0 2z";

/** Render the information glyph with the requested fill colour. */
function viewInfoSVG(vnode: m.Vnode<{ colour: string }>): m.Children {
  const { colour } = vnode.attrs;
  const svgAttrs = {
    height: 40,
    width: 40,
    preserveAspectRatio: "xMinYMin",
    viewBox: "-2 -2 24 24",
    xmlns: "http://www.w3.org/2000/svg",
  };
  const pathAttrs = { d: INFO_GLYPH_PATH, fill: colour };
  const path = m("path", pathAttrs);
  return m("svg.photo-icon", svgAttrs, [path]);
}

/** Create the information-glyph component. */
function InfoSVG() {
  return { view: viewInfoSVG };
}

type MetadataIconAttrs = {
  route: string;
  colour: string;
};

/** Broadcast navigation to the metadata route. */
function clickMetadataIcon(route: string): void {
  broadcast("navigate", { route });
}

/** Render a metadata icon that navigates to its route when selected. */
function viewMetadataIcon(vnode: m.Vnode<MetadataIconAttrs>): m.Children {
  const { route, colour } = vnode.attrs;
  const popoverAttrs = {
    onclick: clickMetadataIcon.bind(null, route),
  };
  const icon = m(InfoSVG, { colour });
  return m("div.photo-metadata-popover", popoverAttrs, icon);
}

/** Create the metadata navigation icon component. */
export function MetadataIcon() {
  return { view: viewMetadataIcon };
}
