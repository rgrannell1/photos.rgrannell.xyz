/* Support checklist operations. */

import m from "mithril";
import type { ChecklistEntry } from "../../../domain/media/stats.ts";
import { FlagIcon } from "../../flag.ts";
import type {
  FilterControl,
  FilterDefinition,
  FilterDrawOptions,
} from "../checklist.ts";

/*
 * Parse a Unix timestamp, in either seconds or milliseconds.
 */
export function parseFirstSeen(timestamp: string): Date {
  const numeric = parseInt(timestamp);
  // timestamps under 10^10 are in seconds, larger are in milliseconds
  const milliseconds = numeric > 9_999_999_999 ? numeric : numeric * 1000;
  return new Date(milliseconds);
}

export function formatFirstSeen(timestamp: string): string {
  const date = parseFirstSeen(timestamp);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return date.toLocaleDateString("en-GB", options);
}

export function firstSeenYear(timestamp: string): number {
  return parseFirstSeen(timestamp).getFullYear();
}

export function isWild(entry: ChecklistEntry): boolean {
  return entry.isWild;
}

export function isIrishWild(entry: ChecklistEntry): boolean {
  return entry.isIrish && entry.isWild;
}

export function drawFilterControl(control: FilterControl): m.Children {
  const selectedClass = control.current === control.value
    ? "listing-filter-flag--selected"
    : undefined;
  const attrs = readFilterControlAttrs(control, selectedClass);
  return m("span.listing-filter-flag", attrs, control.label);
}

export function readFilterControlAttrs(
  control: FilterControl,
  selectedClass: string | undefined,
) {
  const onclick = control.onSelect.bind(null, control.value);
  const { title } = control;
  return {
    title,
    class: selectedClass,
    onclick,
  };
}

export function drawFilterLabel(definition: FilterDefinition): m.Children {
  return definition.flag
    ? m(FlagIcon, { name: definition.flag })
    : definition.label;
}

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

export function placeFilterControl(
  control: m.Children,
  idx: number,
): m.Children[] {
  return idx === 0 ? [control] : [" ", control];
}
