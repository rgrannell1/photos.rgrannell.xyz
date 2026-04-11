import m from "mithril";
import { asUrn } from "@rgrannell1/tribbledb";
import type { Services } from "../types.ts";
import { countryEmoji } from "../services/emoji.ts";

type CountryFilterAttrs = {
  services: Services;
  selectedCountry: string | undefined;
  onSelect: (slug: string | undefined) => void;
};

/*
 * Render all distinct country flags from the triples.
 * Clicking a flag calls onSelect with the country slug; clicking the active flag deselects.
 */
export function CountryFilter() {
  return {
    view(vnode: m.Vnode<CountryFilterAttrs>) {
      const { services, selectedCountry, onSelect } = vnode.attrs;
      const countries = services.readAllCountries();

      return m(
        "p.country-filter",
        countries.map((country) => {
          const isSelected = selectedCountry === country.id;
          const slug = asUrn(country.id).id;

          const onclick = () => onSelect(isSelected ? undefined : slug);

          return m("span.country-filter-flag", {
            key: country.id,
            title: country.name,
            class: isSelected ? "country-filter-flag--selected" : undefined,
            onclick,
          }, countryEmoji(country));
        }),
      );
    },
  };
}
