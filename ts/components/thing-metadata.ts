import m from "mithril";
import { type TripleObject } from "@rgrannell1/tribbledb";
import { one } from "../commons/arrays.ts";
import { KnownTypes } from "../constants.ts";
import { placeEmoji } from "../services/emoji.ts";
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
      const $links = m(ThingUrls, { things: [thing] });
      const title = one(thing.flag)
        ? `${placeEmoji(thing)} ${one(thing.name)}`
        : one(thing.name);

      const titleContent = titleExtra ? [title, " ", titleExtra] : title;

      return m("div.photo-album-metadata", [
        m("p.photo-album-title", titleContent),
        $links,
      ]);
    },
  };
}
