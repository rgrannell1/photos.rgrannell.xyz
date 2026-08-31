/* Support thing operations. */

import m from "mithril";
import { ThingSubtitle } from "../../../thing/thing-subtitle.ts";
import { ThingTitle, type ThingTitleAttrs } from "../../../thing/thing-title.ts";
import { asUrn } from "@rgrannell1/tribbledb";
import type { TripleObject } from "@rgrannell1/tribbledb";
import { one } from "../../../../commons/collections/arrays.ts";
import { KnownTypes } from "../../../../constants/data.ts";
import { ThingUrls } from "../../../thing/references/thing-urls.ts";
import { NONE, withDefault } from "../../../../commons/collections/maybe.ts";
import type { ThingPageAttrs } from "./thing.ts";
import { ThingDetails } from "../data/metadata.ts";
import { AlbumSection, VideoSection } from "./media.ts";
import { PhotoSection } from "../data/species-data.ts";
import { drawShareButton, SpeciesSection } from "./species-view.ts";

/** Reads the first thing name or returns the supplied fallback. */
export function readShareName(
  things: TripleObject[],
  fallback: string,
): string {
  const [thing] = things;
  const name = thing ? one(thing.name) : NONE;
  return withDefault(name, fallback);
}

/** Reports whether a URN identifies the olm amphibian species. */
export function isOlm(urn: string): boolean {
  const parsed = asUrn(urn);
  const isAmphibian = parsed.type === KnownTypes.AMPHIBIAN;
  return isAmphibian && parsed.id === "proteus-anguinus";
}

/** Renders the thing title from page data. */
export function drawThingTitle(attrs: ThingPageAttrs): m.Children {
  const titleAttrs: ThingTitleAttrs = {
    urn: attrs.urn,
    things: attrs.things,
    listingTitle: attrs.listingTitle,
    emoji: attrs.titleEmoji,
  };
  const title = m(ThingTitle, titleAttrs);
  return title;
}

/** Renders the thing subtitle from its URN and naming mode. */
export function drawThingSubtitle(attrs: ThingPageAttrs): m.Children {
  const subtitleAttrs = {
    urn: attrs.urn,
    isBinomial: attrs.isBinomial,
  };
  return m(ThingSubtitle, subtitleAttrs);
}

/** Renders the title, subtitle, and external references. */
export function drawThingHeading(attrs: ThingPageAttrs): m.Children[] {
  const title = drawThingTitle(attrs);
  const subtitle = drawThingSubtitle(attrs);
  const urls = m(ThingUrls, { things: attrs.things });
  return [title, subtitle, m("br"), urls];
}

/** Renders the photo and species sections. */
export function drawPhotoSections(attrs: ThingPageAttrs): m.Children[] {
  const photos = m(PhotoSection, attrs);
  const species = m(SpeciesSection, attrs);
  return [photos, species];
}

/** Renders the video and album sections. */
export function drawVideoSections(attrs: ThingPageAttrs): m.Children[] {
  const videos = m(VideoSection, attrs);
  const albums = m(AlbumSection, attrs);
  return [videos, albums];
}

/** Returns all photo and video media sections in display order. */
export function readMediaSections(attrs: ThingPageAttrs): m.Children[] {
  const photos = drawPhotoSections(attrs);
  const videos = drawVideoSections(attrs);
  return [...photos, ...videos];
}

/** Renders the details, share control, and media sections. */
export function drawThingSections(attrs: ThingPageAttrs): m.Children[] {
  const details = m(ThingDetails, attrs);
  const share = drawShareButton(attrs.urn, attrs.things);
  const media = readMediaSections(attrs);
  const sections = [details, share, ...media];
  return sections;
}

/** Renders the complete thing page body. */
export function drawThingBody(attrs: ThingPageAttrs): m.Children {
  const content = [...drawThingHeading(attrs), ...drawThingSections(attrs)];
  return m("section.thing-page", content);
}
