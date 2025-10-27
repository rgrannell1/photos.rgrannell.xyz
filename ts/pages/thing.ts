
import m from "mithril";
import { ThingTitle } from "../components/thing-title.ts";

/*
 * Construct a description of the thing
 */
function ThingDescription() {
  return {
    view() {

    }
  }
}

function ThingPlaces() {
  return {
    view() {

    }
  }
}

function ThingTypeLink() {
  return {
    view() {

    }
  }
}

function Urls() {

}

function Metadata() {

}

function AlbumSection() {

}

function PhotoSection() {

}

export function ThingPage() {
  return m("div", [
    m("section.thing-page", [
      m(
        /*
         * Construct a description of the thing
         */ThingTitle),
      m(ThingDescription),
    ])
  ]);
}
