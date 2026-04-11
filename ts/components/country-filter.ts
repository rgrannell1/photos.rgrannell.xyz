import m from "mithril";
import type { Services } from "../types.ts";
import { countryEmoji } from "../services/emoji.ts";
import { block, broadcast } from "../commons/events.ts";

type CountryFilterAttrs = {
  services: Services;
  selectedCountry: string | undefined;
};

/*
 * Render all distinct country flags from the triples.
 * Clicking a flag filters to albums containing that country; clicking again clears the filter.
 */
export function CountryFilter() {
  return {
    view(vnode: m.Vnode<CountryFilterAttrs>) {
      const { services, selectedCountry } = vnode.attrs;
      const countries = services.readAllCountries();

      return m(
        "p.country-filter",
        countries.map((country) => {
          const isSelected = selectedCountry === country.id;

          const onclick = (event: Event) => {
            broadcast("filter_country", { id: country.id });
            block(event);
          };

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
