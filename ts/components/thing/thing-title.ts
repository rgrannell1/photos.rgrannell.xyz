/* Render and reflect a thing page title. */

import { parseUrn } from "@rgrannell1/tribbledb";
import type { TripleObject } from "@rgrannell1/tribbledb";
import m from "mithril";
import { KnownTypes, TAXON_TYPES } from "../../constants/data.ts";
import { one } from "../../commons/arrays.ts";
import { taxonLabel } from "../../domain/things.ts";
import { FlagIcon } from "../flag.ts";
import { setTitle } from "../../services/browser/window.ts";
import { isSome, type Maybe, withDefault } from "../../commons/maybe.ts";

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

  if (things.length === 0) {
    return urn;
  }

  const [thing] = things;
  const name = withDefault(one(thing.name), parsed.id);

  if (parsed.type === KnownTypes.PLACE) {
    return `${emoji} ${name}`;
  }

  if (TAXON_TYPES.has(parsed.type)) {
    return taxonLabel(thing);
  }

  return name;
}

type ThingTitleAttrs = {
  urn: string;
  things: TripleObject[];
  listingTitle: Maybe<string>;
  emoji: string;
};

// the document-title write is an effect, so it lives in lifecycle hooks,
// not in the pure view
function reflectThingTitle(vnode: m.Vnode<ThingTitleAttrs>): void {
  const { listingTitle, urn, things, emoji } = vnode.attrs;
  setTitle(computeTitle(listingTitle, urn, things, emoji));
}

function viewThingTitle(vnode: m.Vnode<ThingTitleAttrs>): m.Children {
  const { urn, things, listingTitle, emoji } = vnode.attrs;
  const title = computeTitle(listingTitle, urn, things, emoji);

  const parsed = parseUrn(urn);
  const [thing] = things;
  const hasThingFlag = thing !== undefined && isSome(one(thing.flag));
  const showsPlaceFlag = parsed.type === KnownTypes.PLACE && hasThingFlag;
  if (showsPlaceFlag) {
    const name = withDefault(one(thing.name), parsed.id);
    return m("h1", [
      m(FlagIcon, { name, big: true }),
      ` ${name}`,
    ]);
  }

  return m("h1", title);
}

export function ThingTitle() {
  return {
    oncreate: reflectThingTitle,
    onupdate: reflectThingTitle,
    view: viewThingTitle,
  };
}
