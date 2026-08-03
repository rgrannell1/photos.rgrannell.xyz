import m from "mithril";
import { asUrn } from "@rgrannell1/tribbledb";
import type { Country, Services } from "../../types.ts";
import { countryEmoji } from "../../services/emoji.ts";
import { FlagIcon } from "../flag.ts";

type CountryFilterAttrs = {
  services: Services;
  selectedCountry: string | undefined;
  onSelect: (slug: string | undefined) => void;
};

function drawCountryFlag(
  selectedCountry: string | undefined,
  onSelect: (slug: string | undefined) => void,
  country: Country,
): m.Children {
  const isSelected = selectedCountry === country.id;
  const slug = asUrn(country.id).id;

  return m("span.country-filter-flag", {
    key: country.id,
    title: country.name,
    class: isSelected ? "country-filter-flag--selected" : undefined,
    onclick: onSelect.bind(null, isSelected ? undefined : slug),
  }, m(FlagIcon, { name: country.name, emoji: countryEmoji(country) }));
}

function viewCountryFilter(vnode: m.Vnode<CountryFilterAttrs>): m.Children {
  const { services, selectedCountry, onSelect } = vnode.attrs;
  const countries = services.readAllCountries();

  return m(
    "p.country-filter",
    countries.map(drawCountryFlag.bind(null, selectedCountry, onSelect)),
  );
}

/*
 * Render all distinct country flags from the triples.
 * Clicking a flag calls onSelect with the country slug; clicking the active flag deselects.
 */
export function CountryFilter() {
  return { view: viewCountryFilter };
}
