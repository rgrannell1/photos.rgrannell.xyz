/* Album button route tests. */

import m from "mithril";
import { AlbumButton } from "../ts/components/album/album-button.ts";

Deno.test("AlbumButton uses a Mithril route link with the bare album ID", () => {
  const component = AlbumButton();
  const vnode = {
    attrs: {
      id: "urn:ró:album:summer-2026",
      hidden: false,
    },
  } as m.Vnode<{ id: string; hidden: boolean }>;
  const link = component.view(vnode) as m.Vnode<{ href: string }>;

  if (link.tag !== m.route.Link) {
    throw new Error("album button does not use m.route.Link");
  }
  if (link.attrs.href !== "/album/summer-2026") {
    throw new Error(`unexpected album href: ${link.attrs.href}`);
  }
});
