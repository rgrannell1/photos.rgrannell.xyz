import m from "mithril";
import { asUrn, type TripleObject } from "@rgrannell1/tribbledb";
import { one } from "../../commons/arrays.ts";
import { KnownTypes, TAXON_TYPES } from "../../constants/data.ts";
import { taxonLabel } from "../../commons/things.ts";
import { featureEmoji } from "../../services/emoji.ts";
import { FlagIcon } from "../flag.ts";
import { ThingUrls } from "./thing-urls.ts";

type ThingCaptionAttrs = {
  thing: TripleObject;
  titleExtra?: m.Children;
};

function viewThingCaption(vnode: m.Vnode<ThingCaptionAttrs>): m.Children {
  const { thing, titleExtra } = vnode.attrs;
  const $links = m(ThingUrls, { things: [thing] });
  const id = one(thing.id) as string | undefined;
  const urnType = id ? asUrn(id)?.type : undefined;

  const name = urnType && TAXON_TYPES.has(urnType)
    ? taxonLabel(thing)
    : one(thing.name) as string | undefined;
  const title: m.Children = one(thing.flag)
    ? [m(FlagIcon, { name }), ` ${name}`]
    : urnType === KnownTypes.PLACE_FEATURE && id
    ? `${featureEmoji(thing)} ${name}`
    : name;

  const titleContent = titleExtra ? [title, " ", titleExtra] : title;

  return m("div.photo-album-metadata", [
    m("p.photo-album-title", titleContent),
    $links,
  ]);
}

export function ThingCaption() {
  return { view: viewThingCaption };
}
