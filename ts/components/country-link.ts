import m from "mithril";
import { urnToUrl } from "../semantic/urn.ts";
import { asUrn } from "@rgrannell1/tribbledb";
import { navigate } from "../events.ts";

export type CountryLinkAttrs = {
  urn: string | undefined;
  name: string;
  flag: string | undefined;
  mode: "flag" | "name";
};

/* */
export function CountryLink() {
  return {
    view(vnode: m.Vnode<CountryLinkAttrs>) {
      const { flag, urn, name, mode } = vnode.attrs;
      if (!urn) {
        return m("p");
      }

      const parsed = asUrn(urn);
      const onclick = navigate(`/thing/${parsed.type}:${parsed.id}`);

      if (mode === "flag") {
        return m("a.country-link", { href: urnToUrl(urn), onclick }, flag);
      }

      return m(
        "a.country-link",
        { href: urnToUrl(urn), onclick },
        `${flag} ${name}`,
      );
    },
  };
}
