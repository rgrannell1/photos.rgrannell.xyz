/* Render country links and album country flags. */

import m from "mithril";
import { asUrn } from "@rgrannell1/tribbledb";
import { navigate } from "../../services/browser/events.ts";
import { urnToUrl } from "../../commons/urn.ts";
import type { Country } from "../../types/domain.ts";
import { FlagIcon } from "../flag.ts";

export type CountryLinkAttrs = {
  country: Country;
  mode: "flag" | "name";
};

function drawCountryFlagLink(
  albumId: string,
  country: Country,
): m.Vnode<CountryLinkAttrs> {
  return m(CountryLink, {
    country,
    key: `album-country-${albumId}-${country.id}`,
    mode: "flag",
  });
}

/* Keyed by album and country so Mithril can diff them. */
export function countryFlagLinks(
  albumId: string,
  countries: Country[],
): m.Vnode<CountryLinkAttrs>[] {
  return countries.map(drawCountryFlagLink.bind(null, albumId));
}

function viewCountryLink(vnode: m.Vnode<CountryLinkAttrs>): m.Children {
  const { country, mode } = vnode.attrs;
  const { id, name } = country;

  if (!id) {
    return m("p");
  }

  const flag = m(FlagIcon, { name });
  const parsed = asUrn(id);
  const onclick = navigate(`/thing/${parsed.type}:${parsed.id}`);

  if (mode === "flag") {
    return m("a.country-link-short", { href: urnToUrl(id), onclick }, flag);
  }

  return m(
    "a.country-link",
    { href: urnToUrl(id), onclick },
    [flag, ` ${name}`],
  );
}

export function CountryLink() {
  return { view: viewCountryLink };
}
