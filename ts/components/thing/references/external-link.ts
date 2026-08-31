import m from "mithril";
import { Component } from "../../component.ts";

type ExternalLinkAttrs = {
  href: string;
  text: string;
};

/** Renders text as a safe new-tab external link. */
function viewExternalLink(
  vnode: m.Vnode<ExternalLinkAttrs>,
): m.Children {
  const { href, text } = vnode.attrs;
  const attrs = {
    href,
    target: "_blank",
    rel: "noopener",
  };
  return m("a", attrs, text);
}

export const ExternalLink = Component<ExternalLinkAttrs>({
  view: viewExternalLink,
});
