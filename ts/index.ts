import m from "mithril";
import { App } from "./app.ts";
import { AlbumsPage } from "./pages/albums.ts";
import { AboutPage } from "./pages/about.ts";


m.route(document.body, '/albums', {
  '/albums': App(AlbumsPage),
  '/about': App(AboutPage),
});
