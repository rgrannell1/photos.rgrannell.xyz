/* Build album routes and handle album link clicks. */
import { asUrn } from "@rgrannell1/tribbledb";

/** Build the application route for an album URN. */
export function albumRoute(id: string): string {
  return `/album/${asUrn(id).id}`;
}
