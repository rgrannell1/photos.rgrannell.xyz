import type m from "mithril";
import { viewSidebar } from "./layout.ts";

export type SidebarItemAttrs = {
  name: string;
  route: string;
};

export type SidebarAttrs = {
  visible: boolean;
};

/** Creates the sidebar component with the shared layout view. */
export function Sidebar(): m.Component<SidebarAttrs> {
  return { view: viewSidebar };
}
