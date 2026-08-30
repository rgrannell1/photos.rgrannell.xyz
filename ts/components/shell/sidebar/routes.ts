/* Support sidebar operations. */

/* Map a detail route (/album/:id, /photo/:id) to the sidebar entry it sits under. */
export function resolveAlbumRoute(current: string): string {
  return current.startsWith("/album") ? "/albums" : current;
}

export function resolvePhotoRoute(current: string): string {
  return current.startsWith("/photo") ? "/photos" : current;
}

export function resolveVideoRoute(current: string): string {
  return current.startsWith("/video") ? "/videos" : current;
}

export function resolveMediaSidebarRoute(current: string): string {
  const albumRoute = resolveAlbumRoute(current);
  const photoRoute = resolvePhotoRoute(albumRoute);
  return resolveVideoRoute(photoRoute);
}

export function resolveListingRoute(current: string): string {
  return current.startsWith("/listing") ? "/listings" : current;
}

export function resolveLifeListRoute(current: string): string {
  return current.startsWith("/life-list") ? "/life-list" : current;
}

export function resolveMapRoute(current: string): string {
  return current.startsWith("/map") ? "/map" : current;
}

export function resolveAboutRoute(current: string): string {
  return current.startsWith("/about") ? "/about" : current;
}

export function resolvePageSidebarRoute(current: string): string {
  const listingRoute = resolveListingRoute(current);
  const lifeListRoute = resolveLifeListRoute(listingRoute);
  const mapRoute = resolveMapRoute(lifeListRoute);
  return resolveAboutRoute(mapRoute);
}

export function resolveSidebarRoute(current: string): string {
  const mediaRoute = resolveMediaSidebarRoute(current);
  return resolvePageSidebarRoute(mediaRoute);
}
