import m from "mithril";

type ThingLinkAttrs = {
  urn: string;
  name: string;
  classes: string[];
};

export function ThingLink() {
  return {
    view(vnode: m.Vnode<ThingLinkAttrs>) {
      const { urn, name, classes } = vnode.attrs;

      return m("a", {
        href: urn,
        classes: [...classes, "thing-link"].join(" "),
      }, name);
    },
  };
}
