import { asUrn, parseUrn } from "@rgrannell1/tribbledb";
import type { TripleObject } from "@rgrannell1/tribbledb";
import m from "mithril";
import { binomial, capitalise } from "../../commons/strings.ts";
import { KnownTypes, TAXON_TYPES } from "../../constants/data.ts";
import { one } from "../../commons/arrays.ts";
import { listingLabel, taxonLabel } from "../../commons/things.ts";
import { getTribbleDB } from "../../semantic/data.ts";
import { placeEmoji } from "../../services/emoji.ts";
import { FlagIcon } from "../flag.ts";
import { setTitle } from "../../services/window.ts";

function computeTitle(urn: string, things: TripleObject[]): string {
  const parsed = parseUrn(urn);

  // if type:*, fall back to the type's published listing label
  if (parsed.id === "*") {
    return listingLabel(getTribbleDB(), parsed.type);
  }

  if (things.length === 0) {
    return urn;
  }

  const [thing] = things;
  const name = one(thing.name) ?? parsed.id;

  if (parsed.type === KnownTypes.PLACE) {
    return `${placeEmoji(thing)} ${name}`;
  }

  if (TAXON_TYPES.has(parsed.type)) {
    return taxonLabel(thing);
  }

  return name;
}

type ThingTitleAttrs = {
  urn: string;
  things: TripleObject[];
};

// the document-title write is an effect, so it lives in lifecycle hooks,
// not in the pure view
function reflectThingTitle(vnode: m.Vnode<ThingTitleAttrs>): void {
  setTitle(computeTitle(vnode.attrs.urn, vnode.attrs.things));
}

function viewThingTitle(vnode: m.Vnode<ThingTitleAttrs>): m.Children {
  const { urn, things } = vnode.attrs;
  const title = computeTitle(urn, things);

  const parsed = parseUrn(urn);
  const [thing] = things;
  if (parsed.type === KnownTypes.PLACE && thing && one(thing.flag)) {
    const name = one(thing.name) ?? parsed.id;
    return m("h1", [
      m(FlagIcon, { name, emoji: placeEmoji(thing) }),
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

  // taxon pages show their rank (Genus, Family, Order) as the subtitle
  if (TAXON_TYPES.has(parsed.type)) {
    return m(
      "span",
      { class: `thing-binomial ${parsed.type}-binomial` },
      capitalise(parsed.type),
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
