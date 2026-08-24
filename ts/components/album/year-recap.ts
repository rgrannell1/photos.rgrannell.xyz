import m from "mithril";
import snarkdown from "snarkdown";

export type YearRecapAttrs = {
  markdown: string;
};

function viewYearRecap(vnode: m.Vnode<YearRecapAttrs>): m.Children {
  const { markdown } = vnode.attrs;
  return m("div.year-recap", m.trust(snarkdown(markdown)));
}

/*
 * The recap markdown is first-party prose published by mirror, so trusting
 * the rendered HTML is safe.
 */
export function YearRecap() {
  return { view: viewYearRecap };
}
