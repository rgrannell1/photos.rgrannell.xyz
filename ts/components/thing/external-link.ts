import m from "mithril";

export function ExternalLink() {
  return {
    view(vnode: m.Vnode<{ href: string; text: string }>) {
      const { href, text } = vnode.attrs;
      return m("a", {
        href,
        target: "_blank",
        rel: "noopener",
      }, text);
    },
  };
}
