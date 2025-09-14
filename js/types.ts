export type Triple = [string, string, string];

export type URN = {
  id: string;
  type: string;
  qs: Record<string, string>;
};

// Note; these types are ideal case, we should actually
// validate this
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

export type Video = {
  id: string;
  posterUrl: string;
  videoUrlUnscaled: string;
  videoUrl1080p: string;
  videoUrl720p: string;
  videoUrl480p: string;
};

export type Geoocordinates = {
  longitude: number;
  latitude: number;
}