/* Render the questions on the about page. */

import m from "mithril";
import { USAGE_TERMS } from "./about.ts";

export function drawUsageTerms(): m.Children[] {
  return [
    m("h2", "Can I use the photos on this site?"),
    m("p", USAGE_TERMS),
  ];
}

export function drawQuestion(
  question: string,
  answer: m.Children,
): m.Children[] {
  const heading = m("h2", question);
  const content = [heading, answer];
  return content;
}

export function drawAiTerms(): m.Children[] {
  const robotsLink = m("a", { href: "/robots.txt" }, "robots.txt");
  const terms = m("p", [
    "No, absolutely not. The ",
    robotsLink,
    " file for this site explicitly prohibits this.",
  ]);
  return drawQuestion("Can I use data from this site to train AI?", terms);
}

export function drawContactDetails(): m.Children[] {
  const personalSite = m("a", { href: "https://rho.ie/" }, "my personal site");
  const details = m("p", ["See ", personalSite, " for contact details."]);
  return drawQuestion("What is your contact information?", details);
}

export function drawAboutQuestions(): m.Children[] {
  return [
    ...drawUsageTerms(),
    ...drawAiTerms(),
    ...drawContactDetails(),
  ];
}
