/*
 * Application context: the state and its services, shared by the shell,
 * listeners, and route entries. The app mounts immediately; the tribble
 * stream fills the database in the background with throttled redraws.
 */

import m from "mithril";
import { completeLoad, initState } from "../state.ts";

export const state = initState();
export const services = state.services;

completeLoad(state, () => m.redraw()).catch((err) => {
  console.error("tribble load failed", err);
});
