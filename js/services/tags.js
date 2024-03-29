

function isChild(metadata, parent, child) {
  if (!metadata.hasOwnProperty(parent)) {
    return false;
  }

  const children = metadata[parent];

  if (children.includes(child)) {
    return true;
  }

  for (const candidate of children) {
    if (isChild(metadata, candidate, child)) {
      return true;
    }
  }

  return false;
}

export class Metadata {
  constructor() {
    this.loaded = false;
  }

  async init() {
    this.metadata = await (await fetch("/metadata.json")).json();
    this.loaded = true;
  }

  /*
   * Check whether a tag is a child of another tag
   */
  isChild(parent, child) {
    if (!this.loaded) {
      throw new Error("Metadata not loaded");
    }

    return isChild(this.metadata, parent, child);
  }

  /*
   * Return the subset of tags that are children of some particular parent
   *
   */
  childrenOf(parent, candidates) {
    const tags = new Set([]);

    for (const candidate of candidates) {
      if (this.isChild(parent, candidate)) {
        tags.add(candidate);
      }
    }

    return tags;
  }
}
