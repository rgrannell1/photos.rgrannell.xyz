import { HaystackSearchEngine } from "../library/haystack.js";

import { SEMANTIC_SYMBOL } from "../constants.js";

function boolean(query) {
  const trues = new Set(["yes", "true", "1"]);
  const falses = new Set(["no", "false", "0"]);

  if (trues.has(query)) {
    return true;
  }

  if (falses.has(query)) {
    return false;
  }

  throw new SyntaxError(`Invalid boolean value: ${query}`);
}

function parseComparator(query) {
  if (query.startsWith(">")) {
    return [">", query.slice(1)];
  } else if (query.startsWith("<")) {
    return ["<", query.slice(1)];
  } else {
    return ["=", query];
  }
}

function inFlight(photo, subquery) {
  return (window[SEMANTIC_SYMBOL] ?? []).some((fact) => {
    const [id, relation, value] = fact;
    const wantFlying = boolean(subquery);

    return id === photo.id && relation === "in_flight" &&
      (wantFlying ? value === "Yes" : value !== "Yes");
  });
}

function captive(photo, subquery) {
  return (window[SEMANTIC_SYMBOL] ?? []).some((fact) => {
    const [id, relation, value] = fact;
    const wantCaptive = boolean(subquery);

    return id === photo.id && relation === "living_conditions" &&
      (wantCaptive ? value !== "Wild" : value === "Wild");
  });
}

function wild(photo, subquery) {
  return (window[SEMANTIC_SYMBOL] ?? []).some((fact) => {
    const [id, relation, value] = fact;
    const wantWild = boolean(subquery);

    return id === photo.id && relation === "living_conditions" &&
      (wantWild ? value === "Wild" : value !== "Wild");
  });
}

function rating(photo, subquery) {
  const [ordering, suffix] = parseComparator(subquery);
  const rating = parseInt(suffix, 10);
  if (isNaN(rating)) {
    throw new SyntaxError(`Invalid rating value: ${suffix}`);
  }

  return (window[SEMANTIC_SYMBOL] ?? []).some((fact) => {
    const [id, relation, value] = fact;

    const hasRelation = id === photo.id && relation === "rating";
    if (ordering === "=") {
      return hasRelation && value.length === rating;
    } else if (ordering === ">") {
      return hasRelation && value.length > rating;
    } else if (ordering === "<") {
      return hasRelation && value.length < rating;
    }

    return false;
  });
}

function style(photo, subquery) {
  return (window[SEMANTIC_SYMBOL] ?? []).some((fact) => {
    const [id, relation, value] = fact;

    return id === photo.id && relation === "style" &&
      value.toLowerCase() === subquery.toLowerCase();
  });
}

function wildlife(photo, subquery) {
  return (window[SEMANTIC_SYMBOL] ?? []).some((fact) => {
    const [id, relation, value] = fact;

    return id === photo.id && relation === "wildlife" &&
      value.toLowerCase() === subquery.toLowerCase();
  });
}

function watery(photo, subquery) {
  return (window[SEMANTIC_SYMBOL] ?? []).some((fact) => {
    const [id, relation, value] = fact;
    const wantWater = boolean(subquery);

    return id === photo.id && relation === "has_body_of_water" &&
      (wantWater ? value === "Yes" : value !== "Yes");
  });
}

const photoComparators = {
  watery,
  has_water: watery,
  wildlife,
  inFlight,
  in_flight: inFlight,
  flying: inFlight,
  rating,
  captive,
  wild,
  style,
};

const albumComparators = {};

export class ContentSearch {
  static photos(content) {
    return new HaystackSearchEngine(content, photoComparators);
  }

  static albums(content) {
    return new HaystackSearchEngine(content, albumComparators);
  }
}
