import m from "mithril";
import { asUrn, type TripleObject } from "@rgrannell1/tribbledb";
import { one } from "../commons/arrays.ts";
import { KnownTypes } from "../constants.ts";
import { countryEmoji } from "../services/emoji.ts";
import { ThingUrls } from "./thing-urls.ts";

export function ThingMetadata() {
  // excluding birds
  const animals = new Set([
    KnownTypes.AMPHIBIAN,
    KnownTypes.REPTILE,
    KnownTypes.INSECT,
    KnownTypes.FISH,
    KnownTypes.MAMMAL,
  ]);

  return {
    view(vnode: m.Vnode<{ thing: TripleObject; titleExtra?: string }>) {
      const { thing, titleExtra } = vnode.attrs;
      const { type } = asUrn(one(thing.id) as string);

      const $links = m(ThingUrls, { things: [thing] });
      const title = type === KnownTypes.COUNTRY
        ? `${countryEmoji(thing)} ${one(thing.name)}`
        : one(thing.name);

      const titleContent = titleExtra ? [title, " ", titleExtra] : title;

      return m("div.photo-album-metadata", [
        m("p.photo-album-title", titleContent),
        $links,
      ]);
    },
  };
}
