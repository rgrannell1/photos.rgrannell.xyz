
/*
 * Manages dark mode preference in local storage
 *
 */
export class DarkModes {
  static load() {
    return localStorage.getItem("darkMode") === "true";
  }

  static save(value: boolean) {
    return localStorage.setItem("darkMode", `${value}`);
  }
}
