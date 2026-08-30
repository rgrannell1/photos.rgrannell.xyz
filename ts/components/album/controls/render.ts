/* Support country filter operations. */

import m from "mithril";
import type { Country } from "../../../types/domain.ts";
import { type Maybe } from "../../../commons/collections/maybe.ts";
import type { CountryFilterAttrs, FlagGroup } from "./country-filter.ts";
import {
  appendFlagGroup,
  compareGroupLength,
  compareWithinGroup,
  drawCountryFlag,
  groupByNation,
} from "./groups.ts";

export function partitionFlagGroups(
  groups: FlagGroup[],
): [FlagGroup, FlagGroup[]] {
  const lone: FlagGroup = [];
  const nations: FlagGroup[] = [];
  for (const group of groups) {
    appendFlagGroup(lone, nations, group);
  }
  return [lone, nations];
}

export function buildFlagRuns(groups: FlagGroup[]): FlagGroup[] {
  const [lone, nations] = partitionFlagGroups(groups);
  const runs: FlagGroup[] = lone.length > 0 ? [lone] : [];
  nations.sort(compareGroupLength);
  for (const group of nations) {
    const nationFirst = group.slice().sort(compareWithinGroup);
    runs.push(nationFirst);
  }
  return runs;
}

export function drawSeparator(): m.Children {
  const attrs = { key: "separator" };
  return m("span.country-filter-separator", attrs, "·");
}

export function prependSeparator(children: m.Children[], runIdx: number): void {
  const isFirstRun = runIdx === 0;
  if (isFirstRun) {
    return;
  }
  const separator = drawSeparator();
  children.unshift(separator);
}

export function drawFlagRun(
  drawFlag: (country: Country) => m.Children,
  run: FlagGroup,
  runIdx: number,
): m.Children {
  const children = run.map(drawFlag);
  prependSeparator(children, runIdx);
  const attrs = { key: `run-${runIdx}` };
  return m("span.country-filter-run", attrs, children);
}

/*
 * One run of lone nations, then one run per nation with sub-territories.
 * A dot separates the runs.
 */
export function drawFlagRuns(
  selectedCountry: Maybe<string>,
  onSelect: (slug: Maybe<string>) => void,
  groups: FlagGroup[],
): m.Children[] {
  const drawFlag = drawCountryFlag.bind(null, selectedCountry, onSelect);
  const drawRun = drawFlagRun.bind(null, drawFlag);
  const runs = buildFlagRuns(groups);

  // the separator lives inside the run it precedes, so it never dangles at
  // the end of a wrapped line. Mithril needs a key on every sibling when any
  // sibling has one.
  return runs.map(drawRun);
}

export function viewCountryFilter(
  vnode: m.Vnode<CountryFilterAttrs>,
): m.Children {
  const { countries, selectedCountry, onSelect } = vnode.attrs;
  const groups = groupByNation(countries);

  return m(
    "p.country-filter",
    drawFlagRuns(selectedCountry, onSelect, groups),
  );
}
