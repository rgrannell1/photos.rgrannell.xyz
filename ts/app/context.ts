/*
 * Application context: pure construction. Effects start from ts/index.ts.
 */

import { initState } from "../state.ts";

export const state = initState();
export const services = state.services;
