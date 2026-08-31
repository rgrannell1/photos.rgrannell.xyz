/* Support sidebar operations. */

/** Map a detail route (/album/:id, /photo/:id) to the sidebar entry it sits under. */
export function resolveAlbumRoute(current: string): string {
  return current.startsWith("/album") ? "/albums" : current;
}

/** Maps a photo detail route to its sidebar entry. */
export function resolvePhotoRoute(current: string): string {
  return current.startsWith("/photo") ? "/photos" : current;
}

/** Maps a video detail route to its sidebar entry. */
export function resolveVideoRoute(current: string): string {
  return current.startsWith("/video") ? "/videos" : current;
}

/** Resolves all media detail routes to their sidebar entries. */
export function resolveMediaSidebarRoute(current: string): string {
  const albumRoute = resolveAlbumRoute(current);
  const photoRoute = resolvePhotoRoute(albumRoute);
  return resolveVideoRoute(photoRoute);
}

/** Maps a listing detail route to its sidebar entry. */
export function resolveListingRoute(current: string): string {
  return current.startsWith("/listing") ? "/listings" : current;
}

/** Keeps each life-list subroute under the life-list sidebar entry. */
export function resolveLifeListRoute(current: string): string {
  return current.startsWith("/life-list") ? "/life-list" : current;
}

/** Keeps each map subroute under the map sidebar entry. */
export function resolveMapRoute(current: string): string {
  return current.startsWith("/map") ? "/map" : current;
}

/** Keeps each about subroute under the about sidebar entry. */
export function resolveAboutRoute(current: string): string {
  return current.startsWith("/about") ? "/about" : current;
}

/** Resolves non-media page routes to their sidebar entries. */
export function resolvePageSidebarRoute(current: string): string {
  const listingRoute = resolveListingRoute(current);
  const lifeListRoute = resolveLifeListRoute(listingRoute);
  const mapRoute = resolveMapRoute(lifeListRoute);
  return resolveAboutRoute(mapRoute);
}

/** Resolves any supported route to its active sidebar entry. */
export function resolveSidebarRoute(current: string): string {
  const mediaRoute = resolveMediaSidebarRoute(current);
  return resolvePageSidebarRoute(mediaRoute);
}
