import m from "mithril";
import { urnToUrl } from "../../models/urn.ts";
import { asUrn } from "@rgrannell1/tribbledb";
import { navigate } from "../../commons/events.ts";
import { isACountry } from "../../types.ts";
import type { Country, Place } from "../../types.ts";
import { one } from "../../commons/arrays.ts";
import { countryEmoji, placeEmoji } from "../../services/emoji.ts";
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

/*
 * Flag links for an album's countries, keyed by album and country so Mithril
 * can diff them. Used wherever an album card shows its countries.
 */
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

  const flag = m(FlagIcon, { name, emoji: countryEmoji(country) });

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

/*
 * Construct a link to a country. Reuse existing emoji lookup logic
 */
export function CountryLink() {
  return { view: viewCountryLink };
}

function viewPlaceLink(
  vnode: m.Vnode<{ location: Place; mode: "flag" | "name" }>,
): m.Children {
  const { location } = vnode.attrs;
  const name = one(location.name);
  const flag = m(FlagIcon, { name, emoji: placeEmoji(location) });

  return m("a.place-link", {
    href: urnToUrl(location.id),
    onclick: navigate(`/thing/place:${location.id}`),
  }, [flag, ` ${name || "Unknown Place"}`]);
}

/*
 * Create a link to a place. Reuse existing emoji lookup logic
 */
export function PlaceLink() {
  return { view: viewPlaceLink };
}

function viewLocationLink(
  vnode: m.Vnode<{ location: Country | Place; mode: "flag" | "name" }>,
): m.Children {
  const { location, mode } = vnode.attrs;

  if (isACountry(location)) {
    return m(CountryLink, { country: location, mode });
  }

  return m(PlaceLink, { location, mode });
}

/*
 * Create a link to a country / place
 */
export function LocationLink() {
  return { view: viewLocationLink };
}
