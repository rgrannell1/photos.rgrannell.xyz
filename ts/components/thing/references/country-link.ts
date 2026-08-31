/* Render country links and album country flags. */

import m from "mithril";
import { asUrn } from "@rgrannell1/tribbledb";
import { navigate } from "../../../services/browser/events.ts";
import { urnToUrl } from "../../../commons/urn.ts";
import type { Country } from "../../../types/domain.ts";
import { FlagIcon } from "../../flag.ts";
import { COUNTRY_LINK_MODES } from "../../../constants/display.ts";

type CountryLinkMode =
  typeof COUNTRY_LINK_MODES[keyof typeof COUNTRY_LINK_MODES];

export type CountryLinkAttrs = {
  country: Country;
  mode: CountryLinkMode;
};

/** Render one album country as a keyed flag-only link. */
function drawCountryFlagLink(
  albumId: string,
  country: Country,
): m.Vnode<CountryLinkAttrs> {
  const key = `album-country-${albumId}-${country.id}`;
  const attrs = {
    country,
    key,
    mode: COUNTRY_LINK_MODES.FLAG,
  };
  return m(CountryLink, attrs);
}

/** Keyed by album and country so Mithril can diff them. */
export function countryFlagLinks(
  albumId: string,
  countries: Country[],
): m.Vnode<CountryLinkAttrs>[] {
  return countries.map(drawCountryFlagLink.bind(null, albumId));
}

/** Build the URL and navigation handler for a country URN. */
function readCountryLinkAttrs(id: string) {
  const parsed = asUrn(id);
  const route = `/thing/${parsed.type}:${parsed.id}`;
  return { href: urnToUrl(id), onclick: navigate(route) };
}

/** Render a compact country link that contains only its flag. */
function drawShortCountryLink(
  attrs: Record<string, unknown>,
  flag: m.Children,
): m.Children {
  return m("a.country-link-short", attrs, flag);
}

/** Render a country link with its flag and display name. */
function drawNamedCountryLink(
  attrs: Record<string, unknown>,
  flag: m.Children,
  name: string,
): m.Children {
  const label = [flag, ` ${name}`];
  return m("a.country-link", attrs, label);
}

/** Render a country link in the requested display mode. */
function drawCountryLink(
  id: string,
  name: string,
  mode: CountryLinkMode,
): m.Children {
  const attrs = readCountryLinkAttrs(id);
  const flag = m(FlagIcon, { name });
  if (mode === COUNTRY_LINK_MODES.FLAG) {
    return drawShortCountryLink(attrs, flag);
  }
  return drawNamedCountryLink(attrs, flag, name);
}

/** Render a country link, or an empty paragraph when its identifier is absent. */
function viewCountryLink(vnode: m.Vnode<CountryLinkAttrs>): m.Children {
  const { country, mode } = vnode.attrs;
  const { id, name } = country;

  if (!id) {
    return m("p");
  }

  return drawCountryLink(id, name, mode);
}

/** Create the country link component. */
export function CountryLink() {
  return { view: viewCountryLink };
}
