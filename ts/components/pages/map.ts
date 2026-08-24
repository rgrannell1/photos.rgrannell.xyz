import m from "mithril";
import type { TripPolyline } from "../../services/albums.ts";
import type { GeocodedPlaceWithCover } from "../../services/places.ts";
import { type MapHandle, mountMap } from "../../services/map.ts";

type MapPageAttrs = {
  visible: boolean;
  places: GeocodedPlaceWithCover[];
  tripPolylines: TripPolyline[];
};

type MapPageState = {
  // the mounted Leaflet map
  handle: MapHandle | null;
};

function mountMapPage(
  pageState: MapPageState,
  vnode: m.VnodeDOM<MapPageAttrs>,
): void {
  const root = vnode.dom as HTMLElement;
  pageState.handle = mountMap(
    root,
    vnode.attrs.places,
    vnode.attrs.tripPolylines,
  );
}

function updateMapPage(
  pageState: MapPageState,
  vnode: m.VnodeDOM<MapPageAttrs>,
): void {
  pageState.handle?.update(
    vnode.attrs.visible,
    vnode.attrs.places,
    vnode.attrs.tripPolylines,
  );
}

function unmountMapPage(pageState: MapPageState): void {
  pageState.handle?.teardown();
  pageState.handle = null;
}

function viewMapPage(vnode: m.Vnode<MapPageAttrs>): m.Children {
  const { visible: sidebarVisible } = vnode.attrs;

  return m("div", {
    class: sidebarVisible ? "page sidebar-visible" : "page",
  }, [
    m("section.photos-metadata", [
      m("h1", "Map"),
      m("p.photo-album-count", "Places I've visited"),
    ]),
    m("section.no-margin", [
      m("div.leaflet-map", {
        role: "application",
        "aria-label": "Map",
      }),
    ]),
  ]);
}

export function MapPage(): m.Component<MapPageAttrs> {
  const pageState: MapPageState = {
    handle: null,
  };

  return {
    oncreate: mountMapPage.bind(null, pageState),
    onupdate: updateMapPage.bind(null, pageState),
    onremove: unmountMapPage.bind(null, pageState),
    view: viewMapPage,
  };
}
