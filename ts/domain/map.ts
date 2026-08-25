/* Data model for one trip line on the map. */

export type TripPolyline = {
  tripUrn: string;
  latLngs: [number, number][];
  mode?: string;
};
