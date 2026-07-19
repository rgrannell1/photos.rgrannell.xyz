/*
 * The shared page shell. Each route is a PageEntry: an optional `onmatch`
 * hook for per-navigation work (param reads, per-visit loads) and a `resolve`
 * function building the page's attrs on each redraw. One RouteResolver
 * renders every page inside the same header/sidebar shell — Mithril's
 * documented pattern for wrapping a layout.
 */

import m from "mithril";
import { Header } from "../components/shell/header.ts";
import { Sidebar } from "../components/shell/sidebar.ts";
import { state } from "./context.ts";

const headerComponent = Header();
const sidebarComponent = Sidebar();

/*
 * A resolved page render: the page's attrs, plus an optional extra class on
 * the shell root (e.g the album-banner layout).
 */
type ResolvedPage<PageAttrs> = {
  attrs: PageAttrs;
  appClass?: string | undefined;
};

export type PageEntry<PageAttrs> = {
  page: m.Component<PageAttrs>;
  // runs once per navigation: read params, do per-visit loads
  onmatch?: (params: m.Params) => void;
  // builds the page attrs each redraw; a string is an error rendered bare
  resolve: () => ResolvedPage<NoInfer<PageAttrs>> | string;
};

/*
 * Identity helper: infers the attrs type from the page component, so each
 * entry's resolve() is checked against what its page actually accepts.
 */
export function pageEntry<PageAttrs>(entry: PageEntry<PageAttrs>): PageEntry<PageAttrs> {
  return entry;
}

/*
 * Wrap a PageEntry in the shared shell. Using a RouteResolver `render` (not a
 * per-route component) is what lets one layout serve every route without
 * remounting the header and sidebar on navigation.
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
