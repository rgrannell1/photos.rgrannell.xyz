/*
 * Application context: the state and its services, shared by the shell,
 * listeners, and route entries. Pure construction only — the tribble load
 * and other effects are started from the entry point (ts/index.ts).
 */

import { initState } from "../state.ts";

export const state = initState();
export const services = state.services;
