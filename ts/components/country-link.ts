import m from "mithril";
import { urnToUrl } from "../semantic/urn";

export type CountryLinkAttrs = {
  urn: string | undefined;
  name: string;
  flag: string | undefined;
  mode: "flag" | "name";
};

export function CountryLink() {
  return {
    view(vnode: m.Vnode<CountryLinkAttrs>) {
      const { flag, urn, name, mode } = vnode.attrs;

      if (mode === "flag") {
        return m("a.country-link", { href: urnToUrl(urn) }, flag);
      }

      return m("a.country-link", { href: urnToUrl(urn) }, `${flag} ${name}`);
    },
  };
}
