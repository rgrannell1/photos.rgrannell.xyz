import { State } from "../types.ts";

export class DarkModes {
  static load() {
    return localStorage.getItem("darkMode") === "true";
  }

  static save(value: boolean) {
    return localStorage.setItem("darkMode", `${value}`);
  }
}

export function loadState(): State {
  return {
    darkMode: DarkModes.load(),
  };
}
