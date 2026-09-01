/* Support checklist operations. */

import m from "mithril";
import type { ChecklistEntry } from "../../../domain/media/stats.ts";
import {
  MILLISECONDS_PER_SECOND,
  UNIX_TIMESTAMP_SECONDS_MAX,
} from "../../../constants/display.ts";
import { FlagIcon } from "../../flag.ts";
import type {
  FilterControl,
  FilterDefinition,
  FilterDrawOptions,
} from "../checklist.ts";

/*
 * Parse a Unix timestamp, in either seconds or milliseconds.
 */
/** Parses a Unix timestamp expressed in seconds or milliseconds. */
export function parseFirstSeen(timestamp: string): Date {
  const numeric = parseInt(timestamp);
  const milliseconds = numeric > UNIX_TIMESTAMP_SECONDS_MAX
    ? numeric
    : numeric * MILLISECONDS_PER_SECOND;
  return new Date(milliseconds);
}

/** Formats a first-seen timestamp as a British calendar date. */
export function formatFirstSeen(timestamp: string): string {
  const date = parseFirstSeen(timestamp);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return date.toLocaleDateString("en-GB", options);
}

/** Reads the local calendar year from a first-seen timestamp. */
export function firstSeenYear(timestamp: string): number {
  return parseFirstSeen(timestamp).getFullYear();
}

/** Reports whether a checklist entry records a wild sighting. */
export function isWild(entry: ChecklistEntry): boolean {
  return entry.isWild;
}

/** Reports whether a checklist entry records an Irish wild sighting. */
export function isIrishWild(entry: ChecklistEntry): boolean {
  return entry.isIrish && entry.isWild;
}

/** Builds event and selection attributes for a filter control. */
export function buildFilterControlAttrs(
  control: FilterControl,
  selectedClass: string | undefined,
): { title: string; class: string | undefined; onclick: () => void } {
  const onclick = control.onSelect.bind(null, control.value);
  const { title } = control;
  return {
    title,
    class: selectedClass,
    onclick,
  };
}

/** Draws one filter control with its selected state. */
export function drawFilterControl(control: FilterControl): m.Children {
  const selectedClass = control.current === control.value
    ? "listing-filter-flag--selected"
    : undefined;
  const attrs = buildFilterControlAttrs(control, selectedClass);
  return m("span.listing-filter-flag", attrs, control.label);
}

/** Draws a filter label as a flag or text. */
export function drawFilterLabel(definition: FilterDefinition): m.Children {
  return definition.flag
    ? m(FlagIcon, { name: definition.flag })
    : definition.label;
}

/** Adds spacing before each filter control after the first. */
export function placeFilterControl(
  control: m.Children,
  idx: number,
): m.Children[] {
  return idx === 0 ? [control] : [" ", control];
}

/** Draws one filter definition with the current selection. */
export function drawFilterDefinition(
  options: FilterDrawOptions,
  definition: FilterDefinition,
  idx: number,
): m.Children[] {
  const label = drawFilterLabel(definition);
  const controlAttrs = {
    ...definition,
    current: options.filter,
    label,
    onSelect: options.onSelect,
  };
  const control = drawFilterControl(controlAttrs);
  return placeFilterControl(control, idx);
}
