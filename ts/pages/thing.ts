
import m from "mithril";

function ThingTitle() {
  return {
    view() {
      return m("h1");
    }
  }
}

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
