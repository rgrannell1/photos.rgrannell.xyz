import m from "mithril";
import { asUrn, type TripleObject } from "@rgrannell1/tribbledb";
import { one } from "../../commons/collections/arrays.ts";
import { KnownTypes, TAXON_TYPES } from "../../constants/data.ts";
import { featureEmoji } from "../../domain/emoji.ts";
import { taxonLabel } from "../../domain/things.ts";
import { FlagIcon } from "../flag.ts";
import { ThingUrls } from "./references/thing-urls.ts";
import {
  isSome,
  type Maybe,
  NONE,
  some,
  withDefault,
} from "../../commons/collections/maybe.ts";

type ThingCaptionAttrs = {
  thing: TripleObject;
  titleExtra?: m.Children;
};

function readUrnType(id: Maybe<string>): Maybe<string> {
  if (isSome(id)) {
    return some(asUrn(id).type);
  }
  return NONE;
}

function readCaptionName(
  thing: TripleObject,
  urnType: Maybe<string>,
): Maybe<string> {
  const isTaxon = isSome(urnType) && TAXON_TYPES.has(urnType);
  if (isTaxon) {
    return some(taxonLabel(thing));
  }
  const name = one(thing.name);
  return name;
}

function drawFlagTitle(thing: TripleObject, label: string): m.Children {
  const name = readCaptionName(thing, NONE);
  const flag = m(FlagIcon, { name });
  return [flag, ` ${label}`];
}

function drawCaptionTitle(
  thing: TripleObject,
  id: Maybe<string>,
  urnType: Maybe<string>,
  label: string,
): m.Children {
  const hasFlag = isSome(one(thing.flag));
  if (hasFlag) {
    return drawFlagTitle(thing, label);
  }
  if (urnType === KnownTypes.PLACE_FEATURE && isSome(id)) {
    return drawFeatureTitle(thing, label);
  }
  return label;
}

function drawFeatureTitle(thing: TripleObject, label: string): string {
  const emoji = featureEmoji(thing);
  return `${emoji} ${label}`;
}

function readCaptionTitle(thing: TripleObject): m.Children {
  const id = one(thing.id);
  const urnType = readUrnType(id);
  const label = readCaptionLabel(thing, urnType);
  return drawCaptionTitle(thing, id, urnType, label);
}

function readCaptionLabel(
  thing: TripleObject,
  urnType: Maybe<string>,
): string {
  const name = readCaptionName(thing, urnType);
  return withDefault(name, "");
}

function drawCaptionLayout(
  titleContent: m.Children,
  links: m.Children,
): m.Children {
  const titleNode = m("p.photo-album-title", titleContent);
  return m("div.photo-album-metadata", [titleNode, links]);
}

function drawCaption(thing: TripleObject, titleExtra?: m.Children): m.Children {
  const links = m(ThingUrls, { things: [thing] });
  const title = readCaptionTitle(thing);
  const titleContent = titleExtra ? [title, " ", titleExtra] : title;
  return drawCaptionLayout(titleContent, links);
}

function viewThingCaption(vnode: m.Vnode<ThingCaptionAttrs>): m.Children {
  const { thing, titleExtra } = vnode.attrs;
  return drawCaption(thing, titleExtra);
}

export function ThingCaption() {
  return { view: viewThingCaption };
}
