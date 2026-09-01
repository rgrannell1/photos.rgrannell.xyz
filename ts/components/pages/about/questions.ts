/* Render the questions on the about page. */

import m from "mithril";
import { USAGE_TERMS } from "./about.ts";

/** Draws the photo usage question and its fixed terms. */
export function drawUsageTerms(): m.Children[] {
  return [
    m("h2", "Can I use the photos on this site?"),
    m("p", USAGE_TERMS),
  ];
}

/** Draws a question heading followed by its supplied answer. */
export function drawQuestion(
  question: string,
  answer: m.Children,
): m.Children[] {
  const $heading = m("h2", question);
  const content = [$heading, answer];
  return content;
}

/** Draws the AI training question with a robots policy link. */
export function drawAiTerms(): m.Children[] {
  const $robotsLink = m("a", { href: "/robots.txt" }, "robots.txt");
  const $terms = m("p", [
    "No, absolutely not. The ",
    $robotsLink,
    " file for this site explicitly prohibits this.",
  ]);
  return drawQuestion("Can I use data from this site to train AI?", $terms);
}

/** Draws the contact question with a link to the personal site. */
export function drawContactDetails(): m.Children[] {
  const $personalSite = m("a", { href: "https://rho.ie/" }, "my personal site");
  const $details = m("p", ["See ", $personalSite, " for contact details."]);
  return drawQuestion("What is your contact information?", $details);
}

/** Draws all questions shown on the about page. */
export function drawAboutQuestions(): m.Children[] {
  return [
    ...drawUsageTerms(),
    ...drawAiTerms(),
    ...drawContactDetails(),
  ];
}
