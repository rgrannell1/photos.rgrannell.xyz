import m from "mithril";
import { asUrn, type TripleObject } from "@rgrannell1/tribbledb";
import { selectFirst } from "../../commons/collections/arrays.ts";
import { KnownTypes, TAXON_TYPES } from "../../constants/data.ts";
import { selectFeatureEmoji } from "../../domain/emoji.ts";
import { formatTaxonLabel } from "../../domain/things.ts";
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

/** Reads the type from an available thing URN. */
function readUrnType(id: Maybe<string>): Maybe<string> {
  if (isSome(id)) {
    return some(asUrn(id).type);
  }
  return NONE;
}

/** Selects the taxon label or stored name for a caption. */
function readCaptionName(
  thing: TripleObject,
  urnType: Maybe<string>,
): Maybe<string> {
  const isTaxon = isSome(urnType) && TAXON_TYPES.has(urnType);
  if (isTaxon) {
    return some(formatTaxonLabel(thing));
  }
  const name = selectFirst(thing.name);
  return name;
}

/** Adds a country flag before a caption label. */
function drawFlagTitle(thing: TripleObject, label: string): m.Children {
  const name = readCaptionName(thing, NONE);
  const $flag = m(FlagIcon, { name });
  return [$flag, ` ${label}`];
}

/** Adds the feature emoji before a caption label. */
function drawFeatureTitle(thing: TripleObject, label: string): string {
  const emoji = selectFeatureEmoji(thing);
  return `${emoji} ${label}`;
}

/** Selects the flag, feature, or plain caption title. */
function drawCaptionTitle(
  thing: TripleObject,
  id: Maybe<string>,
  urnType: Maybe<string>,
  label: string,
): m.Children {
  const hasFlag = isSome(selectFirst(thing.flag));
  if (hasFlag) {
    return drawFlagTitle(thing, label);
  }
  if (urnType === KnownTypes.PLACE_FEATURE && isSome(id)) {
    return drawFeatureTitle(thing, label);
  }
  return label;
}

/** Reads the caption label with an empty fallback. */
function readCaptionLabel(
  thing: TripleObject,
  urnType: Maybe<string>,
): string {
  const name = readCaptionName(thing, urnType);
  return withDefault(name, "");
}

/** Builds the display title for a thing caption. */
function readCaptionTitle(thing: TripleObject): m.Children {
  const id = selectFirst(thing.id);
  const urnType = readUrnType(id);
  const label = readCaptionLabel(thing, urnType);
  return drawCaptionTitle(thing, id, urnType, label);
}

/** Places a title and its links in the caption layout. */
function drawCaptionLayout(
  titleContent: m.Children,
  links: m.Children,
): m.Children {
  const $titleNode = m("p.photo-album-title", titleContent);
  return m("div.photo-album-metadata", [$titleNode, links]);
}

/** Draws a thing caption with optional title content. */
function drawCaption(thing: TripleObject, titleExtra?: m.Children): m.Children {
  const $links = m(ThingUrls, { things: [thing] });
  const title = readCaptionTitle(thing);
  const titleContent = titleExtra ? [title, " ", titleExtra] : title;
  return drawCaptionLayout(titleContent, $links);
}

/** Draws the caption from component attributes. */
function viewThingCaption(vnode: m.Vnode<ThingCaptionAttrs>): m.Children {
  const { thing, titleExtra } = vnode.attrs;
  return drawCaption(thing, titleExtra);
}

/** Creates the thing caption component. */
export function ThingCaption() {
  return { view: viewThingCaption };
}
