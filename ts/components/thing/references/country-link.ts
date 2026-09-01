/* Render country links and album country flags. */

import m from "mithril";
import { routeLinkAttrs } from "../../../services/browser/routes.ts";
import { urnToRoute } from "../../../commons/urn.ts";
import type { Country } from "../../../types/domain.ts";
import { FlagIcon } from "../../flag.ts";
import { CountryLinkMode } from "../../../constants/display.ts";

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
    mode: CountryLinkMode.Flag,
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
function buildCountryLinkAttrs(id: string) {
  return routeLinkAttrs(urnToRoute(id));
}

/** Render a compact country link that contains only its flag. */
function drawShortCountryLink(
  attrs: m.RouteLinkAttrs,
  flag: m.Children,
): m.Children {
  return m(m.route.Link, { ...attrs, selector: "a.country-link-short" }, flag);
}

/** Render a country link with its flag and display name. */
function drawNamedCountryLink(
  attrs: m.RouteLinkAttrs,
  flag: m.Children,
  name: string,
): m.Children {
  const label = [flag, ` ${name}`];
  return m(m.route.Link, { ...attrs, selector: "a.country-link" }, label);
}

/** Render a country link in the requested display mode. */
function drawCountryLink(
  id: string,
  name: string,
  mode: CountryLinkMode,
): m.Children {
  const attrs = buildCountryLinkAttrs(id);
  const $flag = m(FlagIcon, { name });
  if (mode === CountryLinkMode.Flag) {
    return drawShortCountryLink(attrs, $flag);
  }
  return drawNamedCountryLink(attrs, $flag, name);
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
