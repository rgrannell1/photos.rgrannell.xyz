
import { parseUrn } from "@rgrannell1/tribbledb";
import m from "mithril";
import { Strings } from "../strings.ts";

type ThingTitleAttrs = {
  urn: string;
  things: unknown[];
}

export function ThingTitle() {
  let title = '';

  return {
    oninit(vnode: m.Vnode<ThingTitleAttrs>) {
      const { urn, things } = vnode.attrs;
      const parsed = parseUrn(urn);

      // if type:*, fall back to pretty render of type information
      if (parsed.id === '*') {
        title = Strings.capitalise(Strings.pluralise(parsed.type));
      }

      // if country, add a flag
      // if an animal, add a binomial
    },
    view(vnode: m.Vnode<ThingTitleAttrs>) {
      return m("h1", title);
    }
  }
}
