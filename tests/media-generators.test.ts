/* Validity checks for generated component media. */

import { PhotoSchema } from "../ts/schemas/photo.ts";
import { VideoSchema } from "../ts/schemas/video.ts";
import { MAX_COMPONENT_MEDIA_COUNT } from "./data/properties.ts";
import { expectValuesMatchSchema } from "./expectations/schema.ts";
import { generatePhotos, generateVideos } from "./generators/thing-state.ts";

Deno.test("component media generators produce schema-valid values", () => {
  for (let count = 0; count <= MAX_COMPONENT_MEDIA_COUNT; count++) {
    expectValuesMatchSchema(PhotoSchema, generatePhotos(count), `${count} photos`);
    expectValuesMatchSchema(VideoSchema, generateVideos(count), `${count} videos`);
  }
});
