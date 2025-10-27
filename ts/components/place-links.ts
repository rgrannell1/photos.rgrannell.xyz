import m from "mithril";
import { urnToUrl } from "../semantic/urn.ts";
import { asUrn } from "@rgrannell1/tribbledb";
import { navigate } from "../events.ts";
import { Country, isACountry, Place } from "../types.ts";
import { one } from "../arrays.ts";
import { placeEmoji } from "./thing-link.ts";

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

export function PlaceLink() {
  return {
    view(vnode: m.Vnode<{ location: Place, mode: "flag" | "name" }>) {
      const { location, mode } = vnode.attrs;

      let text = '';
      if (mode === 'flag') {
        text = placeEmoji(location)
      }

      text = `${placeEmoji(location)} ${one(location.name) || "Unknown Place"}`;

      return m("a.place-link", {
        href: urnToUrl(location.id),
        onclick: navigate(`/thing/place:${location.id}`),
      }, text);
    }
  }
}

export function LocationLink() {
  return {
    view(vnode: m.Vnode<{ location: Country | Place, mode: "flag" | "name" }>) {
      const { location, mode } = vnode.attrs;

      if (isACountry(location)) {
        return m(CountryLink, { country: location, mode });
      }

      return m(PlaceLink, { location, mode })
    },
  };
}