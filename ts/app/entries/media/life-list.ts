/* Resolve the life-list route and cache its completed catalogue model. */

import m from "mithril";
import { ChecklistPage } from "../../../components/pages/checklist.ts";
import { services, state } from "../../context.ts";
import { pageEntry } from "../../shell.ts";
import {
  fromNullable,
  isNone,
  type Maybe,
  NONE,
  withDefault,
} from "../../../commons/collections/maybe.ts";
import { LIFE_LIST_FILTERS } from "../../../constants/display.ts";

const checklistPageComponent = ChecklistPage();

/** Read the complete bird and mammal catalogue model for the life list. */
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
  /** Resolve cached life-list data and the active route filter after loading. */
  resolve() {
    if (!state.loaded) {
      return "";
    }

    if (isNone(cachedModel)) {
      cachedModel = readLifeListModel();
    }
    const routeFilter = fromNullable<string>(m.route.param("filter"));
    const filter = withDefault(routeFilter, LIFE_LIST_FILTERS.IRELAND);

    return {
      attrs: {
        ...cachedModel,
        visible: state.sidebarVisible,
        filter,
      },
    };
  },
});
