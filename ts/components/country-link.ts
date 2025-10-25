import m from "mithril";
import { urnToUrl } from "../semantic/urn.ts";
import { asUrn } from "@rgrannell1/tribbledb";
import { navigate } from "../events.ts";
import { Country } from "../types.ts";

export type CountryLinkAttrs = {
  country: Country;
  mode: "flag" | "name";
};

/* */
export function CountryLink() {
  return {
    view(vnode: m.Vnode<CountryLinkAttrs>) {
      const { country, mode } = vnode.attrs;
      const { id, name, flag } = country;

      if (!id) {
        return m("p");
      }

      const parsed = asUrn(id);
      const onclick = navigate(`/thing/${parsed.type}:${parsed.id}`);

      if (mode === "flag") {
        return m("a.country-link", { href: urnToUrl(id), onclick }, flag);
      }

      return m(
        "a.country-link",
        { href: urnToUrl(id), onclick },
        `${flag} ${name}`,
      );
    },
  };
}
