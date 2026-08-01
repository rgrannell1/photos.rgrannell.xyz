import m from "mithril";
import { asUrn, type TripleObject } from "@rgrannell1/tribbledb";
import { one } from "../../commons/arrays.ts";
import { KnownTypes } from "../../constants/data.ts";
import { placeEmoji, placeFeatureEmoji } from "../../services/emoji.ts";
import { FlagIcon } from "../flag.ts";
import { ThingUrls } from "./thing-urls.ts";

export function ThingCaption() {
  return {
    view(vnode: m.Vnode<{ thing: TripleObject; titleExtra?: string | undefined }>) {
      const { thing, titleExtra } = vnode.attrs;
      const $links = m(ThingUrls, { things: [thing] });
      const id = one(thing.id) as string | undefined;
      const urnType = id ? asUrn(id)?.type : undefined;

      const name = one(thing.name) as string | undefined;
      const title: m.Children = one(thing.flag)
        ? [m(FlagIcon, { name, emoji: placeEmoji(thing) }), ` ${name}`]
        : urnType === KnownTypes.PLACE_FEATURE && id
        ? `${placeFeatureEmoji(id)} ${name}`
        : name;

      const titleContent = titleExtra ? [title, " ", titleExtra] : title;

      return m("div.photo-album-metadata", [
        m("p.photo-album-title", titleContent),
        $links,
      ]);
    },
  };
}
