import m from "mithril";
import type { TripPolyline } from "../../domain/map.ts";
import type { GeocodedPlaceWithCover } from "../../domain/places.ts";
import { type MapHandle, mountMap } from "../../services/map/map.ts";
import { isSome, type Maybe, NONE } from "../../commons/maybe.ts";

type MapPageAttrs = {
  visible: boolean;
  places: GeocodedPlaceWithCover[];
  tripPolylines: TripPolyline[];
};

type MapPageState = {
  // the mounted Leaflet map
  handle: Maybe<MapHandle>;
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
  if (isSome(pageState.handle)) {
    pageState.handle.update(
      vnode.attrs.visible,
      vnode.attrs.places,
      vnode.attrs.tripPolylines,
    );
  }
}

function unmountMapPage(pageState: MapPageState): void {
  if (isSome(pageState.handle)) {
    pageState.handle.teardown();
  }
  pageState.handle = NONE;
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
    handle: NONE,
  };

  return {
    oncreate: mountMapPage.bind(null, pageState),
    onupdate: updateMapPage.bind(null, pageState),
    onremove: unmountMapPage.bind(null, pageState),
    view: viewMapPage,
  };
}
