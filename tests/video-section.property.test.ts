/* Properties of the thing-page video component and its cache. */

import * as Peach from "@rgrannell1/peach";
import type m from "mithril";
import { VideoSection } from "../ts/components/pages/thing/view/media.ts";
import {
  MAX_COMPONENT_MEDIA_COUNT,
  PROPERTY_SEEDS,
  THING_TRANSITION_COUNT,
} from "./data/properties.ts";
import {
  buildThingPageAttrs,
  createCountingReader,
  createMappedReader,
  generateThingUrns,
  generateVideos,
} from "./generators/thing-state.ts";
import {
  buildComponentVnode,
  expectOptionalSection,
  expectVnodeChildCount,
} from "./expectations/mithril.ts";
import { expectOneReadPerRun } from "./expectations/transitions.ts";

Deno.test("VideoSection is present exactly when generated videos exist", () => {
  for (let count = 0; count <= MAX_COMPONENT_MEDIA_COUNT; count++) {
    const reader = createCountingReader(generateVideos(count));
    const attrs = buildThingPageAttrs({
      urn: "urn:ró:bird:generated",
      readVideos: reader.readValues,
    });
    const component = VideoSection();
    const section = component.view(buildComponentVnode(attrs));
    const vnode = expectOptionalSection(section, "Videos", count > 0);

    if (vnode) {
      const content = (vnode.children as m.Vnode[])[1];
      expectVnodeChildCount(content, count);
    }
  }
});

Deno.test("VideoSection reads once per consecutive thing state", () => {
  for (const seed of PROPERTY_SEEDS) {
    Peach.setSeed(seed);
    const urns = generateThingUrns(THING_TRANSITION_COUNT);
    const uniqueUrns = [...new Set(urns)];
    const videosByUrn = new Map<string, ReturnType<typeof generateVideos>>();
    for (let idx = 0; idx < uniqueUrns.length; idx++) {
      videosByUrn.set(uniqueUrns[idx], generateVideos(idx + 1, `state-${idx}`));
    }
    const reader = createMappedReader(videosByUrn);
    const component = VideoSection();

    for (const urn of urns) {
      const attrs = buildThingPageAttrs({ urn, readVideos: reader.readValues });
      const section = component.view(buildComponentVnode(attrs));
      const expectedCount = videosByUrn.get(urn)?.length ?? 0;
      const vnode = expectOptionalSection(section, "Videos", expectedCount > 0);
      if (vnode) {
        const content = (vnode.children as m.Vnode[])[1];
        expectVnodeChildCount(content, expectedCount);
      }
    }

    expectOneReadPerRun(reader.calls.value, urns, `seed ${seed}`);
  }
});
