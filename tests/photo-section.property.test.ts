/* Properties of the thing-page photo component over generated media. */

import type m from "mithril";
import { PhotoSection } from "../ts/components/pages/thing/data/species-data.ts";
import {
  MAX_COMPONENT_MEDIA_COUNT,
  PROPERTY_RUN_COUNT,
  THING_TRANSITION_COUNT,
} from "./data/properties.ts";
import {
  buildThingPageAttrs,
  createCountingReader,
  createFixedReader,
  createMappedReader,
  generatePhotos,
  generateThingUrns,
} from "./generators/thing-state.ts";
import {
  buildComponentVnode,
  expectOptionalSection,
  expectVnodeAttribute,
} from "./expectations/mithril.ts";
import { expectOneReadPerRun } from "./expectations/transitions.ts";

Deno.test("PhotoSection is present exactly when generated photos exist", () => {
  for (let count = 0; count <= MAX_COMPONENT_MEDIA_COUNT; count++) {
    const videos = createCountingReader([]);
    const photos = generatePhotos(count);
    const attrs = buildThingPageAttrs({
      urn: "urn:ró:bird:generated",
      readVideos: videos.readValues,
      readPhotos: createFixedReader(photos),
    });
    const component = PhotoSection();
    const section = component.view(buildComponentVnode(attrs));
    const vnode = expectOptionalSection(section, "Photos", count > 0);

    if (vnode) {
      const grid = (vnode.children as m.Vnode[])[1];
      expectVnodeAttribute(grid, "total", count);
    }
  }
});

Deno.test("PhotoSection reads once per consecutive thing state", () => {
  for (let runIdx = 0; runIdx < PROPERTY_RUN_COUNT; runIdx++) {
    const urns = generateThingUrns(THING_TRANSITION_COUNT);
    const uniqueUrns = [...new Set(urns)];
    const photosByUrn = new Map<string, ReturnType<typeof generatePhotos>>();
    for (let idx = 0; idx < uniqueUrns.length; idx++) {
      photosByUrn.set(uniqueUrns[idx], generatePhotos(idx + 1, `state-${idx}`));
    }
    const reader = createMappedReader(photosByUrn);
    const readVideos = createFixedReader([]);
    const component = PhotoSection();

    for (const urn of urns) {
      const attrs = buildThingPageAttrs({
        urn,
        readVideos,
        readPhotos: reader.readValues,
      });
      const section = component.view(buildComponentVnode(attrs));
      const expectedCount = photosByUrn.get(urn)?.length ?? 0;
      const vnode = expectOptionalSection(section, "Photos", expectedCount > 0);
      if (vnode) {
        const grid = (vnode.children as m.Vnode[])[1];
        expectVnodeAttribute(grid, "total", expectedCount);
      }
    }

    expectOneReadPerRun(reader.calls.value, urns, `run ${runIdx + 1}`);
  }
});
