import m from "mithril";
import { asUrn, type TripleObject } from "@rgrannell1/tribbledb";
import { one } from "../../commons/arrays.ts";
import { KnownTypes, TAXON_TYPES } from "../../constants/data.ts";
import { taxonLabel } from "../../commons/things.ts";
import { featureEmoji } from "../../services/emoji.ts";
import { FlagIcon } from "../flag.ts";
import { ThingUrls } from "./thing-urls.ts";
import {
  isSome,
  type Maybe,
  NONE,
  some,
  withDefault,
} from "../../commons/maybe.ts";

type ThingCaptionAttrs = {
  thing: TripleObject;
  titleExtra?: m.Children;
};

function viewThingCaption(vnode: m.Vnode<ThingCaptionAttrs>): m.Children {
  const { thing, titleExtra } = vnode.attrs;
  const $links = m(ThingUrls, { things: [thing] });
  const id = one(thing.id);
  const urnType: Maybe<string> = isSome(id) ? some(asUrn(id).type) : NONE;

  const name: Maybe<string> = isSome(urnType) && TAXON_TYPES.has(urnType)
    ? some(taxonLabel(thing))
    : one(thing.name);
  const label = withDefault(name, "");
  const title: m.Children = isSome(one(thing.flag))
    ? [m(FlagIcon, { name }), ` ${label}`]
    : urnType === KnownTypes.PLACE_FEATURE && isSome(id)
    ? `${featureEmoji(thing)} ${label}`
    : label;

  const titleContent = titleExtra ? [title, " ", titleExtra] : title;

  return m("div.photo-album-metadata", [
    m("p.photo-album-title", titleContent),
    $links,
  ]);
}

export function ThingCaption() {
  return { view: viewThingCaption };
}
