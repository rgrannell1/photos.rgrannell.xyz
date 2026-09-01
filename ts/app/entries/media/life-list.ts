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
import { LifeListFilter } from "../../../constants/display.ts";
import { KnownTypes } from "../../../constants/data.ts";

/** Read the complete bird and mammal catalogue model for the life list. */
function readLifeListModel() {
  return {
    entries: services.readWildBirdChecklist(),
    covers: services.readThingCovers(KnownTypes.BIRD),
    regularCount: state.catalogue.regularBirdSpecies,
    nemesisBirds: state.catalogue.nemesisBirds,
    mammalEntries: services.readWildMammalChecklist(),
    mammalCovers: services.readThingCovers(KnownTypes.MAMMAL),
    irishMammalCount: state.catalogue.irishMammalSpecies,
    nemesisMammals: state.catalogue.nemesisMammals,
  };
}

let cachedModel: Maybe<ReturnType<typeof readLifeListModel>> = NONE;

export const checklistEntry = pageEntry({
  page: ChecklistPage,
  /** Resolve cached life-list data and the active route filter after loading. */
  resolve() {
    if (!state.loaded) {
      return "";
    }

    if (isNone(cachedModel)) {
      cachedModel = readLifeListModel();
    }
    const routeFilter = fromNullable<string>(m.route.param("filter"));
    const filter = withDefault(routeFilter, LifeListFilter.Ireland);

    return {
      attrs: {
        ...cachedModel,
        visible: state.sidebarVisible,
        filter,
      },
    };
  },
});
