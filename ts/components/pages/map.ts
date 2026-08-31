import m from "mithril";
import type { TripPolyline } from "../../domain/map.ts";
import type { GeocodedPlaceWithCover } from "../../domain/places.ts";
import { type MapHandle, mountMap } from "../../services/map/map.ts";
import { isSome, type Maybe, NONE } from "../../commons/collections/maybe.ts";

type MapPageAttrs = {
  visible: boolean;
  places: GeocodedPlaceWithCover[];
  tripPolylines: TripPolyline[];
};

type MapPageState = {
  // the mounted Leaflet map
  handle: Maybe<MapHandle>;
};

/** Mount the Leaflet map and retain its handle for later updates. */
function mountMapPage(
  pageState: MapPageState,
  vnode: m.VnodeDOM<MapPageAttrs>,
): void {
  const root = vnode.dom as HTMLElement;
  const { places, tripPolylines } = vnode.attrs;
  pageState.handle = mountMap(
    root,
    places,
    tripPolylines,
  );
}

/** Sync visible map data when the map has mounted. */
function updateMapPage(
  pageState: MapPageState,
  vnode: m.VnodeDOM<MapPageAttrs>,
): void {
  const { handle } = pageState;
  const { visible, places, tripPolylines } = vnode.attrs;
  if (isSome(handle)) {
    handle.update(visible, places, tripPolylines);
  }
}

/** Tear down the mounted map and clear its handle. */
function unmountMapPage(pageState: MapPageState): void {
  if (isSome(pageState.handle)) {
    pageState.handle.teardown();
  }
  pageState.handle = NONE;
}

/** Set the page class from the sidebar visibility state. */
function readMapPageAttrs(sidebarVisible: boolean): m.Attributes {
  const className = sidebarVisible ? "page sidebar-visible" : "page";
  return { class: className };
}

/** Draw the map page heading and summary. */
function drawMapMetadata(): m.Children {
  const heading = m("h1", "Map");
  const description = m("p.photo-album-count", "Places I've visited");
  return m("section.photos-metadata", [heading, description]);
}

/** Draw the accessible container that Leaflet mounts into. */
function drawMapContainer(): m.Children {
  const attrs = { role: "application", "aria-label": "Map" };
  const map = m("div.leaflet-map", attrs);
  return m("section.no-margin", [map]);
}

/** Render the map page from its current sidebar and map data. */
function viewMapPage(vnode: m.Vnode<MapPageAttrs>): m.Children {
  const { visible: sidebarVisible } = vnode.attrs;
  const metadata = drawMapMetadata();
  const map = drawMapContainer();
  const attrs = readMapPageAttrs(sidebarVisible);

  return m("div", attrs, [
    metadata,
    map,
  ]);
}

/** Create map page state with no mounted map. */
function createMapPageState(): MapPageState {
  return { handle: NONE };
}

/** Bind map mount and update hooks to shared page state. */
function bindMapPageChanges(pageState: MapPageState) {
  const oncreate = mountMapPage.bind(null, pageState);
  const onupdate = updateMapPage.bind(null, pageState);
  return { oncreate, onupdate };
}

/** Bind map removal to shared page state. */
function bindMapPageRemoval(pageState: MapPageState) {
  const onremove = unmountMapPage.bind(null, pageState);
  return { onremove };
}

/** Create a map page with stateful Leaflet lifecycle hooks. */
export function MapPage(): m.Component<MapPageAttrs> {
  const pageState = createMapPageState();
  const changeHooks = bindMapPageChanges(pageState);
  const removalHook = bindMapPageRemoval(pageState);

  return {
    ...changeHooks,
    ...removalHook,
    view: viewMapPage,
  };
}
