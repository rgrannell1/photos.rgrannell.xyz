/* Render and reflect a thing page title. */

/* Render and reflect a thing page title. */
import { parseUrn } from "@rgrannell1/tribbledb";
import type { TripleObject } from "@rgrannell1/tribbledb";
import m from "mithril";
import { KnownTypes, TAXON_TYPES } from "../../constants/data.ts";
import { one } from "../../commons/collections/arrays.ts";
import { taxonLabel } from "../../domain/things.ts";
import { FlagIcon } from "../flag.ts";
import { setTitle } from "../../services/browser/window.ts";
import { isSome, type Maybe, withDefault } from "../../commons/collections/maybe.ts";

function readTitleName(thing: TripleObject, fallback: string): string {
  const name = one(thing.name);
  return withDefault(name, fallback);
}

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
    return taxonLabel(thing);
  }
  return name;
}

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

// the document-title write is an effect, so it lives in lifecycle hooks,
// not in the pure view
function reflectThingTitle(vnode: m.Vnode<ThingTitleAttrs>): void {
  const { listingTitle, urn, things, emoji } = vnode.attrs;
  const title = computeTitle(listingTitle, urn, things, emoji);
  setTitle(title);
}

function hasFlag(thing: TripleObject | undefined): boolean {
  return thing !== undefined && isSome(one(thing.flag));
}

function drawPlaceTitle(thing: TripleObject, id: string): m.Children {
  const name = readTitleName(thing, id);
  const flag = m(FlagIcon, { name, big: true });
  return m("h1", [flag, ` ${name}`]);
}

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
  const heading = m("h1", title);
  return heading;
}

function viewThingTitle(vnode: m.Vnode<ThingTitleAttrs>): m.Children {
  const { urn, things, listingTitle, emoji } = vnode.attrs;
  const title = computeTitle(listingTitle, urn, things, emoji);
  const parsed = parseUrn(urn);
  const [thing] = things;
  return drawThingTitle(title, parsed.type, parsed.id, thing);
}

export function ThingTitle() {
  return {
    oncreate: reflectThingTitle,
    onupdate: reflectThingTitle,
    view: viewThingTitle,
  };
}
