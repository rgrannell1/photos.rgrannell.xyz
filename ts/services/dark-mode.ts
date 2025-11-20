/*
 * Manages dark mode preference in local storage
 */
export function load() {
  return localStorage.getItem("darkMode") === "true";
}

export function save(value: boolean) {
  return localStorage.setItem("darkMode", `${value}`);
}
