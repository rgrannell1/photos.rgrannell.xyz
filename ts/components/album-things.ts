
import m from "mithril";
import { Thing } from "../types";

type AlbumThingsAttrs = {
  locations: Thing[]
  subjects: Thing[]
}

export function AlbumThings() {
  return {
    view(vnode: m.Vnode<AlbumThingsAttrs>) {
      const { locations, subjects } = vnode.attrs;

      //console.log(locations)
      console.log(subjects)

      // TODO
    }
  }
}