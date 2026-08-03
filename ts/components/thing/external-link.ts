import m from "mithril";

function viewExternalLink(
  vnode: m.Vnode<{ href: string; text: string }>,
): m.Children {
  const { href, text } = vnode.attrs;
  return m("a", {
    href,
    target: "_blank",
    rel: "noopener",
  }, text);
}

export function ExternalLink() {
  return { view: viewExternalLink };
}
