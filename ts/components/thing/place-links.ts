import m from "mithril";
import { urnToUrl } from "../../commons/urn.ts";
import { asUrn } from "@rgrannell1/tribbledb";
import { navigate } from "../../commons/events.ts";
import { isACountry } from "../../types.ts";
import type { Country, Place } from "../../types.ts";
import { one } from "../../commons/arrays.ts";
import { placeEmoji } from "../../services/emoji.ts";
import { customFlagAsset, FlagIcon } from "../flag.ts";

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

function viewPlaceLink(
  vnode: m.Vnode<{ location: Place; mode: "flag" | "name" }>,
): m.Children {
  const { location } = vnode.attrs;
  const name = one(location.name);

  // flags render from vexilla assets only; unflagged places keep their
  // feature emoji. A flagged place with no asset gets no icon
  const hasFlag = Boolean(one(location.flag));
  const flag: m.Children = customFlagAsset(name)
    ? m(FlagIcon, { name })
    : hasFlag
    ? null
    : placeEmoji(location);

  return m("a.place-link", {
    href: urnToUrl(location.id),
    onclick: navigate(`/thing/place:${location.id}`),
  }, [flag, ` ${name || "Unknown Place"}`]);
}

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

export function LocationLink() {
  return { view: viewLocationLink };
}
