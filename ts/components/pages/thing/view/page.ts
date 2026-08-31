/* Support thing operations. */

import m from "mithril";
import { HeartRain } from "../../../shell/love.ts";
import type { ThingPageAttrs } from "./thing.ts";
import { drawThingBody, isOlm } from "./share.ts";

/** Adds the sidebar class when the sidebar is visible. */
export function readPageClass(visible: boolean): string {
  return visible ? "page sidebar-visible" : "page";
}

/** Renders the hidden olm easter egg for its matching URN. */
export function drawOlmLove(urn: string): m.Children {
  return isOlm(urn) ? m(HeartRain) : null;
}

/** Renders the thing page body within its resolved page class. */
export function drawThingMain(
  pageClass: string,
  children: m.Children[],
): m.Children {
  const attrs = { class: pageClass };
  return m("main", attrs, children);
}

/** Assembles the thing page body and optional olm effect. */
export function viewThingPage(vnode: m.Vnode<ThingPageAttrs>): m.Children {
  const attrs = vnode.attrs;
  const pageClass = readPageClass(attrs.visible);
  const love = drawOlmLove(attrs.urn);
  return drawThingMain(pageClass, [love, drawThingBody(attrs)]);
}
