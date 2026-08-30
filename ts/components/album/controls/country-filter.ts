import type { Country } from "../../../types/domain.ts";

import { type Maybe } from "../../../commons/collections/maybe.ts";
import { viewCountryFilter } from "./render.ts";

export type CountryFilterAttrs = {
  countries: Country[];
  selectedCountry: Maybe<string>;
  onSelect: (slug: Maybe<string>) => void;
};

// A nation and the sub-territories photographed within it
export type FlagGroup = Country[];

/*
 * Country flags grouped by nation. Clicking the active flag deselects it.
 */
export function CountryFilter() {
  return { view: viewCountryFilter };
}
