import m from "mithril";
import snarkdown from "snarkdown";

export type YearRecapAttrs = {
  markdown: string;
};

/** Converts first-party recap markdown into trusted Mithril content. */
function viewYearRecap(vnode: m.Vnode<YearRecapAttrs>): m.Children {
  const { markdown } = vnode.attrs;
  const html = snarkdown(markdown);
  const trustedHtml = m.trust(html);
  return m("div.year-recap", trustedHtml);
}

/**
 * The recap markdown is first-party prose published by mirror, so trusting
 * the rendered HTML is safe.
 */
export function YearRecap(): m.Component<YearRecapAttrs> {
  return { view: viewYearRecap };
}
