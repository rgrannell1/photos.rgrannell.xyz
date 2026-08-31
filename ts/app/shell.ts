/*
 * Shared page shell. One RouteResolver wraps every route in the same header/sidebar layout.
 */

import m from "mithril";
import { Header } from "../components/shell/header.ts";
import { Sidebar } from "../components/shell/sidebar/sidebar.ts";
import { state } from "./context.ts";
import { isNone, type Maybe, NONE } from "../commons/collections/maybe.ts";
import type { Result } from "../commons/collections/result.ts";

const headerComponent = Header();
const sidebarComponent = Sidebar();

type ResolvedPage<PageAttrs> = {
  attrs: PageAttrs;
  appClass?: string;
};

type PageDefinition<PageAttrs> = {
  page: m.Component<PageAttrs>;
  // Called once per navigation for param reads and per-visit loads.
  onmatch?: (params: m.Params) => void;
  // Builds page attrs each redraw. Returns string on error.
  resolve: () => ResolvedPage<NoInfer<PageAttrs>> | string;
};

type PageResolution<PageAttrs> = Maybe<
  Result<ResolvedPage<NoInfer<PageAttrs>>, string>
>;

type PageResolver<PageAttrs> = () => PageResolution<PageAttrs>;

export type PageEntry<PageAttrs> =
  & Omit<PageDefinition<PageAttrs>, "resolve">
  & {
    resolve: PageResolver<PageAttrs>;
  };

/** Convert a page definition's raw result into its loading, error, or ready state. */
function resolvePageDefinition<PageAttrs>(
  definition: PageDefinition<PageAttrs>,
): PageResolution<PageAttrs> {
  const resolved = definition.resolve();
  if (resolved === "") return NONE;
  if (typeof resolved === "string") return { ok: false, error: resolved };
  return { ok: true, value: resolved };
}

/**
 * Normalise loading, error, and ready page states.
 */
export function pageEntry<PageAttrs>(
  definition: PageDefinition<PageAttrs>,
): PageEntry<PageAttrs> {
  const resolve = (resolvePageDefinition<PageAttrs>).bind(null, definition);
  return {
    ...definition,
    resolve,
  };
}

/**
 * Wrap a page in the shell. A RouteResolver render keeps the header and sidebar
 * mounted across navigation.
 */
export function routeResolver<PageAttrs>(
  entry: PageEntry<PageAttrs>,
): m.RouteResolver {
  return {
    /** Run a page's optional navigation hook with the route parameters. */
    onmatch(params: m.Params) {
      entry.onmatch?.(params);
    },
    /** Render the page's loading, error, or ready state inside the shared shell. */
    render() {
      const result = entry.resolve();

      if (isNone(result)) {
        return m("p");
      }
      if (!result.ok) {
        return m("p", result.error);
      }
      const resolved = result.value;

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
