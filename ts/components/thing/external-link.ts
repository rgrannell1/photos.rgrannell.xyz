import m from "mithril";
import { Component } from "../component.ts";

type ExternalLinkAttrs = {
  href: string;
  text: string;
};

function viewExternalLink(
  vnode: m.Vnode<ExternalLinkAttrs>,
): m.Children {
  const { href, text } = vnode.attrs;
  return m("a", {
    href,
    target: "_blank",
    rel: "noopener",
  }, text);
}

export const ExternalLink = Component<ExternalLinkAttrs>({
  view: viewExternalLink,
});
