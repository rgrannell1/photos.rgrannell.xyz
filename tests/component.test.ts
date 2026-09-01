/* Mithril component factory tests. */

import type m from "mithril";
import { Component } from "../ts/components/component.ts";

Deno.test("Component keeps hooks and creates fresh instances", () => {
  const oninit = () => undefined;
  const Subject = Component<{ text: string }>({
    oninit,
    view: (vnode) => vnode.attrs.text,
  });
  const vnode = { attrs: { text: "bird" } } as m.Vnode<{ text: string }>;
  const first = Subject(vnode);
  const second = Subject(vnode);

  if (first === second) throw new Error("reused component instance");
  if (first.oninit !== oninit) throw new Error("lost lifecycle hook");
  if (first.view(vnode) !== "bird") throw new Error("lost view");
});
