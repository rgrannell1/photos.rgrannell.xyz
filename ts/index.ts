
import m from 'mithril';
import { App } from './app.ts';
import { AlbumsPage } from './pages/albums.ts';


m.route(document.body, '/albums', {
  '/albums': App(AlbumsPage())
});
