/*
 * Shared page shell. One RouteResolver wraps every route in the same header/sidebar layout.
 */

import m from "mithril";
import { Header } from "../components/shell/header.ts";
import { Sidebar } from "../components/shell/sidebar.ts";
import { state } from "./context.ts";

const headerComponent = Header();
const sidebarComponent = Sidebar();

type ResolvedPage<PageAttrs> = {
  attrs: PageAttrs;
  appClass?: string;
};

export type PageEntry<PageAttrs> = {
  page: m.Component<PageAttrs>;
  // Called once per navigation for param reads and per-visit loads.
  onmatch?: (params: m.Params) => void;
  // Builds page attrs each redraw. Returns string on error.
  resolve: () => ResolvedPage<NoInfer<PageAttrs>> | string;
};

/*
 * Identity helper. It infers the attrs type from the page component.
 */
export function pageEntry<PageAttrs>(entry: PageEntry<PageAttrs>): PageEntry<PageAttrs> {
  return entry;
}

/*
 * Wrap a page in the shell. A RouteResolver render keeps the header and sidebar
 * mounted across navigation.
 */
export function routeResolver<PageAttrs>(entry: PageEntry<PageAttrs>): m.RouteResolver {
  return {
    onmatch(params: m.Params) {
      entry.onmatch?.(params);
    },
    render() {
      const resolved = entry.resolve();

      if (typeof resolved === "string") {
        return m("p", resolved);
      }

      return m("div.photos-app", { class: resolved.appClass }, [
        m(headerComponent),
        m("div.app-container", {
          class: state.sidebarVisible ? "sidebar-visible" : undefined,
        }, [
          m(sidebarComponent, { visible: state.sidebarVisible }),
          // The generic attrs satisfy the page's attrs by construction, but
          // m()'s overloads cannot see through the type parameter
          m(entry.page, resolved.attrs as PageAttrs & m.Attributes),
        ]),
      ]);
    },
  };
}
