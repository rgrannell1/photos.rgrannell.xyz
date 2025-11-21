import { asUrn, parseUrn } from "@rgrannell1/tribbledb";
import type { TripleObject } from "@rgrannell1/tribbledb";
import m from "mithril";
import { binomial, capitalise, pluralise } from "../commons/strings.ts";
import { BinomialTypes, KnownTypes } from "../constants.ts";
import { one } from "../commons/arrays.ts";
import { countryEmoji, placeEmoji } from "../services/emoji.ts";
import { setTitle } from "../services/window.ts";

function computeTitle(urn: string, things: TripleObject[]): string {
  const parsed = parseUrn(urn);

  // if type:*, fall back to pretty render of type information
  if (parsed.id === "*") {
    return capitalise(pluralise(parsed.type));
  }

  if (things.length === 0) {
    return urn;
  }

  const [thing] = things;
  const name = one(thing.name) ?? parsed.id;

  if (parsed.type === KnownTypes.COUNTRY) {
    return `${countryEmoji(thing)} ${name}`;
  } else if (parsed.type === KnownTypes.PLACE) {
    return `${placeEmoji(thing)} ${name}`;
  }

  return name;
}

type ThingTitleAttrs = {
  urn: string;
  things: TripleObject[];
};

export function ThingTitle() {
  return {
    view(vnode: m.Vnode<ThingTitleAttrs>) {
      const { urn, things } = vnode.attrs;
      const title = computeTitle(urn, things);

      setTitle(title);

      return m("h1", title);
    },
  };
}

export function ThingSubtitle() {
  return {
    view(vnode: m.Vnode<{ urn: string }>) {
      const parsed = asUrn(vnode.attrs.urn);

      return BinomialTypes.has(parsed.type) && parsed.id !== "*"
        ? m(
          "span",
          { class: `thing-binomial ${parsed.type}-binomial` },
          binomial(parsed.id),
        )
        : m("span");
    },
  };
}
