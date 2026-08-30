/* Support thing operations. */

import m from "mithril";
import { HeartRain } from "../../../shell/love.ts";
import type { ThingPageAttrs } from "./thing.ts";
import { drawThingBody, isOlm } from "./share.ts";

export function readPageClass(visible: boolean): string {
  return visible ? "page sidebar-visible" : "page";
}

export function drawOlmLove(urn: string): m.Children {
  return isOlm(urn) ? m(HeartRain) : null;
}

export function drawThingMain(
  pageClass: string,
  children: m.Children[],
): m.Children {
  const attrs = { class: pageClass };
  return m("main", attrs, children);
}

export function viewThingPage(vnode: m.Vnode<ThingPageAttrs>): m.Children {
  const attrs = vnode.attrs;
  const pageClass = readPageClass(attrs.visible);
  const love = drawOlmLove(attrs.urn);
  return drawThingMain(pageClass, [love, drawThingBody(attrs)]);
}
