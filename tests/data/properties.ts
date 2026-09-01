/* Shared bounds for property tests. */

// Repeat random property checks enough times to vary generated values.
export const PROPERTY_RUN_COUNT = 4;

// Cover empty through populated component states without large virtual trees.
export const MAX_COMPONENT_MEDIA_COUNT = 8;

// Create enough state changes to cover repeated and changed keys.
export const THING_TRANSITION_COUNT = 100;
