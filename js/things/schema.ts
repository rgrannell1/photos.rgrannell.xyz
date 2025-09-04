
export type TargetValidator = (sourceType: string, relation: string, value: string) => string | undefined;

function countValidator(_: any, relation: string, value: any) {
  const valid = typeof value === 'string' && parseInt(value) >= 0

  return valid
    ? undefined
    : `invalid relation ${relation} for value ${value}`
}

function urlValidator(_: any, relation: string, value: any) {
  const valid = typeof value === 'string' && value.startsWith('/')

  return valid
    ? undefined
    : `invalid relation ${relation} for value ${JSON.stringify(value)}`
}

function deprecatedValidator(_: any, relation: string, value: any) {
  return `${relation} deprecated`
}

function defaultValidator(_: any, relation: string, value: any) {
  return undefined
}

function dimensionValidator(_: any, relation: string, value: any) {
  const valid = typeof value === 'string' && /\d+/.test(value)

  return valid
    ? undefined
    : `invalid relation ${relation} for value ${JSON.stringify(value)}`
}

function dateValidator(_: any, relation: string, value: any) {
  const valid = typeof value === 'string' && /^\d+$/.test(value) && Number(value) > 0;

  return valid
    ? undefined
    : `invalid relation ${relation} for value ${JSON.stringify(value)}`;
}

function longitudeValidator(_: any, relation: string, value: any) {
  const valid = typeof value === 'string' && /^-?\d+(\.\d+)?$/.test(value) && Number(value) >= -180 && Number(value) <= 180;

  return valid
    ? undefined
    : `invalid relation ${relation} for value ${JSON.stringify(value)}`;
}

function latitudeValidator(_: any, relation: string, value: any) {
  const valid = typeof value === 'string' && /^-?\d+(\.\d+)?$/.test(value) && Number(value) >= -90 && Number(value) <= 90;

  return valid
    ? undefined
    : `invalid relation ${relation} for value ${JSON.stringify(value)}`;
}

export const schema: Record<string, TargetValidator> = {
  living_conditions: deprecatedValidator,
  mammal_binomial: deprecatedValidator,
  plane_model: deprecatedValidator,
  vehicle: deprecatedValidator,

  // active relations
  videos_count: countValidator,
  photos_count: countValidator,
  height: dimensionValidator,
  width: dimensionValidator,
  max_date: dateValidator,
  min_date: dateValidator,
//  png_url: urlValidator,
//  poster_url: urlValidator,
//  thumbnail_url: urlValidator,
//  video_url_1080p: urlValidator,
//  video_url_480p: urlValidator,
//  video_url_720p: urlValidator,
//  video_url_unscaled: urlValidator,
  latitude: latitudeValidator,
  longitude: longitudeValidator,
//  full_image: urlValidator,

  album_id: defaultValidator,
  bird_binomial: deprecatedValidator,
  birdwatch_url: defaultValidator,
  country: defaultValidator,
  created_at: defaultValidator,
  curie: defaultValidator,
  description: defaultValidator,
  exposure_time: defaultValidator,
  fcode: defaultValidator,
  fcode_name: defaultValidator,
  flag: defaultValidator,
  flags: defaultValidator,
  focal_length: defaultValidator,
  f_stop: defaultValidator,
  iso: defaultValidator,
  location: defaultValidator,
  model: defaultValidator,
  mosaic: defaultValidator,
  mosaic_colours: defaultValidator,
  name: defaultValidator,
  rating: defaultValidator,
  style: defaultValidator,
  subject: defaultValidator,
  summary: defaultValidator,
  wikidata: defaultValidator,
  wikipedia: defaultValidator,
  wildlife: defaultValidator
}
