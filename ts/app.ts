import m from "mithril";
import { Header } from "./components/header.ts";
import { loadState } from "./state.ts";
import { Sidebar } from "./components/sidebar.ts";

const state = loadState();

type AppState = {
  page: m.Component;
};

export function App(page: m.Component): m.Component<AppState> {
  return {
    view() {
      return m("body", [
        m("div", [
          m(Header, state),
          m("div", [
            m(Sidebar, { visible: state.sidebarVisible }),
            page,
          ]),
        ]),
      ]);
    },
  };
}
