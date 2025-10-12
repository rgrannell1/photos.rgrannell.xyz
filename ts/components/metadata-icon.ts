import m from "mithril";
import { broadcast } from "../events.ts";

function InfoSVG() {
  return m("svg.photo-icon", {
    height: 40,
    width: 40,
    preserveAspectRatio: "xMinYMin",
    viewBox: "-2 -2 24 24",
    xmlns: "http://www.w3.org/2000/svg",
  }, [
    m("path", {
      d: "m10 20c-5.523 0-10-4.477-10-10s4.477-10 10-10 10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-10a1 1 0 0 1 1 1v5a1 1 0 0 1 -2 0v-5a1 1 0 0 1 1-1zm0-1a1 1 0 1 1 0-2 1 1 0 0 1 0 2z",
    }),
  ]);
}

type MetadataIconAttrs = {
  id: string;
};

export function MetadataIcon() {
  return {
    view(vnode: m.Vnode<MetadataIconAttrs>) {
      const { id } = vnode.attrs;

      return m("div.photo-metadata-popover", {
        onclick: () => broadcast("navigate", { route: `/metadata/${id}` }),
      }, InfoSVG());
    },
  };
}
