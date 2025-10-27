import { parseUrn, TripleObject } from "@rgrannell1/tribbledb";
import m from "mithril";
import { Strings } from "../strings.ts";
import { KnownTypes } from "../constants.ts";
import { one } from "../arrays.ts";
import { countryEmoji, placeEmoji } from "./thing-link.ts";

type ThingTitleAttrs = {
  urn: string;
  things: TripleObject[];
};

export function ThingTitle() {
  let title = "";

  return {
    oninit(vnode: m.Vnode<ThingTitleAttrs>) {
      const { urn, things } = vnode.attrs;
      const parsed = parseUrn(urn);

      // if type:*, fall back to pretty render of type information
      if (parsed.id === "*") {
        title = Strings.capitalise(Strings.pluralise(parsed.type));
        return;
      }

      if (things.length === 0) {
        title = urn;
        return;
      }

      const [thing] = things;
      const name = one(thing.name) ?? parsed.id;

      if (parsed.type === KnownTypes.COUNTRY) {
        title = `${countryEmoji(thing)} ${name}`;
        return;
      } else if (parsed.type === KnownTypes.PLACE) {
        title = `${placeEmoji(thing)} ${name}`;
        return;
      }

      title = name;
    },
    view(vnode: m.Vnode<ThingTitleAttrs>) {
      return m("h1", title);
    },
  };
}
