/* Support about operations. */

import m from "mithril";
import { setTitle } from "../../../services/browser/window.ts";
import { navigate } from "../../../services/browser/events.ts";
import { drawAboutQuestions } from "./questions.ts";

export function initAboutPage(): void {
  setTitle("About - photos");
}

export function introText(): string {
  const currentYear = new Date().getFullYear();
  const years = currentYear - 2012;
  return `I started taking photos ${years} years ago. It's a fun hobby; it ` +
    "motivates me to get outside and see interesting things and interact with " +
    "nature. I've become, in my opinion, a reasonable wildlife photographer " +
    "(though hit-or-miss at other styles of photography). I built this website to " +
    "share the things";
}

export function drawFoundThingsLink(): m.Children {
  return m("a", {
    href: "/#/thing/rating:4",
    onclick: navigate(`/thing/rating:4`),
  }, " I found beautiful in this world.");
}

export function drawIntro(): m.Children {
  return m("p", [
    introText(),
    drawFoundThingsLink(),
    " It's also, from one angle, a journal of the my life.",
  ]);
}

export function drawAboutContent(): m.Children {
  const intro = drawIntro();
  const questions = drawAboutQuestions();
  return m("section.about-page", [
    m("h1", "About"),
    m("br"),
    intro,
    ...questions,
  ]);
}
