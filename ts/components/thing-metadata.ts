
import m from "mithril";
import { asUrn, type TripleObject } from "@rgrannell1/tribbledb";
import { one } from "../commons/arrays.ts";
import { KnownTypes } from "../constants.ts";
import { countryEmoji } from "../services/emoji";

export function CountryMetadata() {
  return {
    view(vnode: m.Vnode<{ thing: TripleObject }>) {
      const { thing } = vnode.attrs;

      return m("div.photo-album-metadata", [
        m("p.photo-album-title", `${countryEmoji(thing)} ${one(thing.name)}`)
      ]);
    }
  }
}

export function BirdMetadata() {
  return {
    view(vnode: m.Vnode<{ thing: TripleObject }>) {
      const { thing } = vnode.attrs;

      return m("div.photo-album-metadata", [
        m("p.photo-album-title", one(thing.name))
      ]);
    }
  }
}

export function AnimalMetadata() {
  return {
    view(vnode: m.Vnode<{ thing: TripleObject }>) {
      const { thing } = vnode.attrs;

      return m("div.photo-album-metadata", [
        m("p.photo-album-title", one(thing.name))
      ]);
    }
  }
}

export function ThingMetadata() {
  // excluding birds
  const animals = new Set([
    KnownTypes.AMPHIBIAN,
    KnownTypes.REPTILE,
    KnownTypes.INSECT,
    KnownTypes.FISH,
    KnownTypes.MAMMAL
  ]);

  return {
    view(vnode: m.Vnode<{ thing: TripleObject }>) {
      const { thing } = vnode.attrs;
      const { type } = asUrn(one(thing.id) as string);

      if (type === KnownTypes.BIRD) {
        return m(BirdMetadata, { thing });
      } else if (type === KnownTypes.COUNTRY) {
        return m(CountryMetadata, { thing })
      } else if (animals.has(type)) {
        return m(AnimalMetadata, { thing })
      }

      return m("div.photo-album-metadata", [
        m("p.photo-album-title", one(thing.name))
      ]);
    }
  }
}