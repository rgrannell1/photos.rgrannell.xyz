/* Render and reflect a thing page title. */

/* Render and reflect a thing page title. */
import { parseUrn } from "@rgrannell1/tribbledb";
import type { TripleObject } from "@rgrannell1/tribbledb";
import m from "mithril";
import { KnownTypes, TAXON_TYPES } from "../../constants/data.ts";
import { selectFirst } from "../../commons/collections/arrays.ts";
import { formatTaxonLabel } from "../../domain/things.ts";
import { FlagIcon } from "../flag.ts";
import { setTitle } from "../../services/browser/window.ts";
import {
  isSome,
  type Maybe,
  withDefault,
} from "../../commons/collections/maybe.ts";

/** Read a thing name, with its identifier as the fallback. */
function readTitleName(thing: TripleObject, fallback: string): string {
  const name = selectFirst(thing.name);
  return withDefault(name, fallback);
}

/** Format a known thing name for place and taxon title rules. */
function readNamedTitle(
  type: string,
  id: string,
  thing: TripleObject,
  emoji: string,
): string {
  const name = readTitleName(thing, id);
  if (type === KnownTypes.PLACE) {
    return `${emoji} ${name}`;
  }
  if (TAXON_TYPES.has(type)) {
    return formatTaxonLabel(thing);
  }
  return name;
}

/** Read a page title, with the URN as the fallback for a missing thing. */
function readThingTitle(
  urn: string,
  type: string,
  id: string,
  thing: TripleObject | undefined,
  emoji: string,
): string {
  if (thing === undefined) {
    return urn;
  }
  return readNamedTitle(type, id, thing, emoji);
}

/** Compute the title for a listing wildcard or one concrete thing. */
function computeTitle(
  listingTitle: Maybe<string>,
  urn: string,
  things: TripleObject[],
  emoji: string,
): string {
  const parsed = parseUrn(urn);

  // if type:*, fall back to the type's published listing label
  if (parsed.id === "*") {
    return withDefault(listingTitle, parsed.type);
  }

  const [thing] = things;
  return readThingTitle(urn, parsed.type, parsed.id, thing, emoji);
}

export type ThingTitleAttrs = {
  urn: string;
  things: TripleObject[];
  listingTitle: Maybe<string>;
  emoji: string;
};

/**
 * The document-title write is an effect, so it lives in lifecycle hooks,
 * not in the pure view.
 */
function reflectThingTitle(vnode: m.Vnode<ThingTitleAttrs>): void {
  const { listingTitle, urn, things, emoji } = vnode.attrs;
  const title = computeTitle(listingTitle, urn, things, emoji);
  setTitle(title);
}

/** Report whether a thing defines a flag value. */
function hasFlag(thing: TripleObject | undefined): boolean {
  return thing !== undefined && isSome(selectFirst(thing.flag));
}

/** Render a place heading with its flag. */
function drawPlaceTitle(thing: TripleObject, id: string): m.Children {
  const name = readTitleName(thing, id);
  const $flag = m(FlagIcon, { name, big: true });
  return m("h1", [$flag, ` ${name}`]);
}

/** Render a place flag heading when available, or a plain thing heading. */
function drawThingTitle(
  title: string,
  type: string,
  id: string,
  thing: TripleObject | undefined,
): m.Children {
  const showsPlaceFlag = type === KnownTypes.PLACE && hasFlag(thing);
  if (showsPlaceFlag && thing !== undefined) {
    return drawPlaceTitle(thing, id);
  }
  const $heading = m("h1", title);
  return $heading;
}

/** Render the heading for the current thing or listing wildcard. */
function viewThingTitle(vnode: m.Vnode<ThingTitleAttrs>): m.Children {
  const { urn, things, listingTitle, emoji } = vnode.attrs;
  const title = computeTitle(listingTitle, urn, things, emoji);
  const parsed = parseUrn(urn);
  const [thing] = things;
  return drawThingTitle(title, parsed.type, parsed.id, thing);
}

/** Create the thing title component and reflect title changes to the document. */
export function ThingTitle(): m.Component<ThingTitleAttrs> {
  return {
    oncreate: reflectThingTitle,
    onupdate: reflectThingTitle,
    view: viewThingTitle,
  };
}
