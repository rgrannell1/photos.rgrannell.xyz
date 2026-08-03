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
 * Render a year's recap, authored as markdown and published by mirror. The
 * content is first-party (Róisín's own prose), so trusting the rendered HTML is
 * safe here.
 */
export function YearRecap() {
  return { view: viewYearRecap };
}
