/* Shared bounds and seeds for deterministic property tests. */

// Exercise low, recognisable, and maximum unsigned 32-bit seeds.
export const PROPERTY_SEEDS = [0, 1, 0x50484f54, 0xffffffff];

// Cover empty through populated component states without large virtual trees.
export const MAX_COMPONENT_MEDIA_COUNT = 8;

// Create enough state changes to cover repeated and changed keys.
export const THING_TRANSITION_COUNT = 100;
