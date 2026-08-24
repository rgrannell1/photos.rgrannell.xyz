import { asUrn, parseUrn } from "@rgrannell1/tribbledb";
import type { TripleObject } from "@rgrannell1/tribbledb";
import m from "mithril";
import { binomial } from "../../commons/strings.ts";
import { KnownTypes, TAXON_TYPES } from "../../constants/data.ts";
import { one } from "../../commons/arrays.ts";
import { taxonLabel } from "../../commons/things.ts";
import { FlagIcon } from "../flag.ts";
import { setTitle } from "../../services/window.ts";

function computeTitle(
  listingTitle: string | undefined,
  urn: string,
  things: TripleObject[],
  emoji: string,
): string {
  const parsed = parseUrn(urn);

  // if type:*, fall back to the type's published listing label
  if (parsed.id === "*") {
    return listingTitle ?? parsed.type;
  }

  if (things.length === 0) {
    return urn;
  }

  const [thing] = things;
  const name = one(thing.name) ?? parsed.id;

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
  listingTitle: string | undefined;
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
  if (parsed.type === KnownTypes.PLACE && thing && one(thing.flag)) {
    const name = one(thing.name) ?? parsed.id;
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

function viewThingSubtitle(
  vnode: m.Vnode<{ urn: string; isBinomial: boolean }>,
): m.Children {
  const parsed = asUrn(vnode.attrs.urn);

  // taxon ids are the lowercase latin name, shown as the subtitle
  if (TAXON_TYPES.has(parsed.type)) {
    return m(
      "span",
      { class: `thing-binomial ${parsed.type}-binomial` },
      binomial(parsed.id),
    );
  }

  return vnode.attrs.isBinomial && parsed.id !== "*"
    ? m(
      "span",
      { class: `thing-binomial ${parsed.type}-binomial` },
      binomial(parsed.id),
    )
    : m("span");
}

export function ThingSubtitle() {
  return { view: viewThingSubtitle };
}
