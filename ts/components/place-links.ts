import m from "mithril";
import { urnToUrl } from "../models/urn.ts";
import { asUrn } from "@rgrannell1/tribbledb";
import { navigate } from "../events.ts";
import { isACountry } from "../types.ts";
import type { Country, Place } from "../types.ts";
import { one } from "../arrays.ts";
import { countryEmoji, placeEmoji } from "../services/emoji.ts";

export type CountryLinkAttrs = {
  country: Country;
  mode: "flag" | "name";
};

/*
 * Construct a link to a country. Reuse existing emoji lookup logic
 *
 */
export function CountryLink() {
  return {
    view(vnode: m.Vnode<CountryLinkAttrs>) {
      const { country, mode } = vnode.attrs;
      const { id, name } = country;

      if (!id) {
        return m("p");
      }

      const flag = countryEmoji(country);

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

/*
 * Create a link to a place. Reuse existing emoji lookup logic
 *
 */
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

/*
 * Create a link to a country / place
 *
 */
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