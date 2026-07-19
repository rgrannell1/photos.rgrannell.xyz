/*
 * Application context: the loaded state and its services, shared by the
 * shell, listeners, and route entries.
 */

import { loadState } from "../state.ts";

export const state = await loadState();
export const services = state.services;
