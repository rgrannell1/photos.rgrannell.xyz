import { viewSidebar } from "./layout.ts";

export type SidebarItemAttrs = {
  name: string;
  route: string;
};

export type SidebarAttrs = {
  visible: boolean;
};

export function Sidebar() {
  return { view: viewSidebar };
}
