import { State } from "./types.ts";
import { DarkModes } from "./services/dark-mode.ts";

/*
 * Load the application state from localStorage or return defaults.
 */
export function loadState(): State {
  return {
    darkMode: DarkModes.load(),
    sidebarVisible: false,
  };
}
