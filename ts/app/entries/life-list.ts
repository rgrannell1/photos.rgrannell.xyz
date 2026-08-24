/* Resolve the life-list route and cache its completed catalogue model. */

import m from "mithril";
import { ChecklistPage } from "../../components/pages/checklist.ts";
import { services, state } from "../context.ts";
import { pageEntry } from "../shell.ts";

const checklistPageComponent = ChecklistPage();

function readLifeListModel() {
  return {
    entries: services.readWildBirdChecklist(),
    covers: services.readThingCovers("bird"),
    regularCount: state.catalogue.regularBirdSpecies,
    nemesisBirds: state.catalogue.nemesisBirds,
    mammalEntries: services.readWildMammalChecklist(),
    mammalCovers: services.readThingCovers("mammal"),
    irishMammalCount: state.catalogue.irishMammalSpecies,
    nemesisMammals: state.catalogue.nemesisMammals,
  };
}

let cachedModel: ReturnType<typeof readLifeListModel> | null = null;

export const checklistEntry = pageEntry({
  page: checklistPageComponent,
  resolve() {
    if (!state.loaded) {
      return "";
    }

    cachedModel ??= readLifeListModel();
    const filter = (m.route.param("filter") as string | undefined) ?? "ireland";

    return {
      attrs: {
        ...cachedModel,
        visible: state.sidebarVisible,
        filter,
      },
    };
  },
});
