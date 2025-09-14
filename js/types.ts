export type Triple = [string, string, string];

export type URN = {
  id: string;
  type: string;
  qs: Record<string, string>;
};

export type Album = {
  name: string;
  minDate: number;
  maxDate: number;
  thumbnailUrl: string;
  mosaicColours: string;
  id: string;
  count: number;
  flags: string; // TODO
};

export type Photo = {};

export type Video = {};

export type Geoocordinates = {
  longitude: number;
  latitude: number;
}