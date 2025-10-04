export type ApplicationEvents =
  | "click_burger_menu"
  | "switch_theme"
  | "click_photo_metadata"
  | "photo_loaded";

export type State = {
  darkMode: boolean;
  sidebarVisible: boolean;
};
