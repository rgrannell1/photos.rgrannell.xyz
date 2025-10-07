import { Windows } from "../services/window.ts";

export function AlbumPage() {
  return {
    oninit() {
      Windows.setTitle("Album - photos");
    },
    view() {
    },
  };
}
