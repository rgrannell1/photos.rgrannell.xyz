import type { Photo as PhotoType } from "../../../types/domain.ts";

import type { ReadThing } from "../../thing/navigation/thing-links.ts";
import type { ReadThingEmoji } from "../../thing/navigation/thing-link.ts";
import { viewPhotoPage } from "./page.ts";

export type PhotoPageAttrs = {
  photo: PhotoType;
  albumHidden: boolean;
  readThing: ReadThing;
  readEmoji: ReadThingEmoji;
  visible: boolean;
};

export function PhotoPage() {
  return { view: viewPhotoPage };
}
