import m from "mithril";
import { asUrn } from "@rgrannell1/tribbledb";
import type { Country, Services } from "../../types.ts";
import { customFlagAsset, FlagIcon } from "../flag.ts";

type CountryFilterAttrs = {
  services: Services;
  selectedCountry: string | undefined;
  onSelect: (slug: string | undefined) => void;
};

// A nation and the sub-territories photographed within it
type FlagGroup = Country[];

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
  }, m(FlagIcon, { name: country.name }));
}

/*
 * Sub-territory ids carry their nation as a prefix, so es-galicia and es both
 * group under es.
 */
function flagNation(country: Country): string | undefined {
  const asset = customFlagAsset(country.name);
  return asset ? asset.split("-")[0] : undefined;
}

function isNationFlag(country: Country): boolean {
  const asset = customFlagAsset(country.name);
  return asset !== undefined && !asset.includes("-");
}

/*
 * Places vexilla does not cover show no flag, so they are dropped here.
 */
function groupByNation(countries: Country[]): FlagGroup[] {
  const groups = new Map<string, FlagGroup>();

  for (const country of countries) {
    const nation = flagNation(country);
    if (!nation) {
      continue;
    }
    const group = groups.get(nation) ?? [];
    group.push(country);
    groups.set(nation, group);
  }

  return Array.from(groups.values());
}

/*
 * Nation flag first, then its sub-territories in the order they arrived
 */
function compareWithinGroup(left: Country, right: Country): number {
  if (isNationFlag(left) === isNationFlag(right)) {
    return 0;
  }
  return isNationFlag(left) ? -1 : 1;
}

// Longest group first, so the richest nation leads
function compareGroupLength(left: FlagGroup, right: FlagGroup): number {
  return right.length - left.length;
}

function hasSubterritories(group: FlagGroup): boolean {
  return group.length > 1;
}

function lacksSubterritories(group: FlagGroup): boolean {
  return group.length === 1;
}

function drawSeparator(): m.Children {
  return m("span.country-filter-separator", { key: "separator" }, "·");
}

/*
 * One run of lone nations, then one run per nation with sub-territories.
 * A dot separates the runs.
 */
function drawFlagRuns(
  selectedCountry: string | undefined,
  onSelect: (slug: string | undefined) => void,
  groups: FlagGroup[],
): m.Children[] {
  const drawFlag = drawCountryFlag.bind(null, selectedCountry, onSelect);
  const lone = groups.filter(lacksSubterritories).flat();
  const nations = groups.filter(hasSubterritories).sort(compareGroupLength);

  const runs: FlagGroup[] = lone.length > 0 ? [lone] : [];

  for (const group of nations) {
    runs.push(group.slice().sort(compareWithinGroup));
  }

  // the separator lives inside the run it precedes, so it never dangles at
  // the end of a wrapped line. Mithril needs a key on every sibling when any
  // sibling has one.
  return runs.map((run, index) => {
    const children = run.map(drawFlag);
    if (index > 0) {
      children.unshift(drawSeparator());
    }
    return m("span.country-filter-run", { key: `run-${index}` }, children);
  });
}

function viewCountryFilter(vnode: m.Vnode<CountryFilterAttrs>): m.Children {
  const { services, selectedCountry, onSelect } = vnode.attrs;
  const groups = groupByNation(services.readAllCountries());

  return m(
    "p.country-filter",
    drawFlagRuns(selectedCountry, onSelect, groups),
  );
}

/*
 * Country flags grouped by nation. Clicking the active flag deselects it.
 */
export function CountryFilter() {
  return { view: viewCountryFilter };
}
