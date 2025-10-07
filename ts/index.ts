import m from "mithril";
import { App } from "./app.ts";
import { AlbumsPage } from "./pages/albums.ts";




m.mount(document.body, App(AlbumsPage))
