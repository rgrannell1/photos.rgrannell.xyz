/* Support country filter operations. */

import m from "mithril";
import { asUrn } from "@rgrannell1/tribbledb";
import type { Country } from "../../../types/domain.ts";
import { customFlagAsset, FlagIcon } from "../../flag.ts";
import { isNone, isSome, type Maybe, NONE } from "../../../commons/collections/maybe.ts";
import type { FlagGroup } from "./country-filter.ts";

export function countryFlagAttrs(
  selectedCountry: Maybe<string>,
  onSelect: (slug: Maybe<string>) => void,
  country: Country,
): m.Attributes {
  const isSelected = selectedCountry === country.id;
  const slug = asUrn(country.id).id;
  const selectedClass = "country-filter-flag--selected";
  return {
    key: country.id,
    title: country.name,
    class: isSelected ? selectedClass : undefined,
    onclick: onSelect.bind(null, isSelected ? NONE : slug),
  };
}

export function drawCountryFlag(
  selectedCountry: Maybe<string>,
  onSelect: (slug: Maybe<string>) => void,
  country: Country,
): m.Children {
  const flagAttrs = countryFlagAttrs(selectedCountry, onSelect, country);
  const icon = m(FlagIcon, { name: country.name });
  return m("span.country-filter-flag", flagAttrs, icon);
}

/*
 * Sub-territory ids carry their nation as a prefix, so es-galicia and es both
 * group under es.
 */
export function flagNation(country: Country): Maybe<string> {
  const asset = customFlagAsset(country.name);
  const nation = isNone(asset) ? asset : asset.split("-")[0];
  return nation;
}

export function isNationFlag(country: Country): boolean {
  const asset = customFlagAsset(country.name);
  return isSome(asset) && !asset.includes("-");
}

export function appendCountry(
  groups: Map<string, FlagGroup>,
  nation: string,
  country: Country,
): void {
  const previousGroup = groups.get(nation) ?? [];
  const group = [...previousGroup, country];
  groups.set(nation, group);
}

export function addCountryToGroups(
  groups: Map<string, FlagGroup>,
  country: Country,
): void {
  const nation = flagNation(country);
  if (isNone(nation)) {
    return;
  }
  const groupKey = nation;
  appendCountry(groups, groupKey, country);
}

/*
 * Places vexilla does not cover show no flag, so they are dropped here.
 */
export function groupByNation(countries: Country[]): FlagGroup[] {
  const groups = new Map<string, FlagGroup>();

  for (const country of countries) {
    addCountryToGroups(groups, country);
  }

  const groupedCountries = Array.from(groups.values());
  return groupedCountries;
}

/*
 * Nation flag first, then its sub-territories in the order they arrived
 */
export function compareWithinGroup(left: Country, right: Country): number {
  const leftRank = Number(isNationFlag(left));
  const rightRank = Number(isNationFlag(right));
  return rightRank - leftRank;
}

// Longest group first, so the richest nation leads
export function compareGroupLength(left: FlagGroup, right: FlagGroup): number {
  return right.length - left.length;
}

export function appendFlagGroup(
  lone: FlagGroup,
  nations: FlagGroup[],
  group: FlagGroup,
): void {
  const groupLength = group.length;
  const isLone = groupLength === 1;
  if (isLone) {
    lone.push(...group);
    return;
  }
  nations.push(group);
}
