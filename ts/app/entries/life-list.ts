/* Resolve the life-list route and cache its completed catalogue model. */

import m from "mithril";
import { ChecklistPage } from "../../components/pages/checklist.ts";
import { services, state } from "../context.ts";
import { pageEntry } from "../shell.ts";
import {
  fromNullable,
  isNone,
  type Maybe,
  NONE,
  withDefault,
} from "../../commons/maybe.ts";

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

let cachedModel: Maybe<ReturnType<typeof readLifeListModel>> = NONE;

export const checklistEntry = pageEntry({
  page: checklistPageComponent,
  resolve() {
    if (!state.loaded) {
      return "";
    }

    if (isNone(cachedModel)) {
      cachedModel = readLifeListModel();
    }
    const routeFilter = fromNullable<string>(m.route.param("filter"));
    const filter = withDefault(routeFilter, "ireland");

    return {
      attrs: {
        ...cachedModel,
        visible: state.sidebarVisible,
        filter,
      },
    };
  },
});
