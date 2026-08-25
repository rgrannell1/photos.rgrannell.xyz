/* Read trip transfer lines from the triple store. */

import { TribbleDB } from "@rgrannell1/tribbledb/v2";
import { KnownTypes } from "../../constants/data.ts";
import { isNone } from "../../commons/maybe.ts";
import { hasValidCoordinates } from "./places.ts";
import { readPlace, readTransfers } from "./readers.ts";
import type { TripPolyline } from "../../domain/map.ts";

export function readTransferPolylines(tdb: TribbleDB): TripPolyline[] {
  const transferUrns = new Set(
    tdb.search({ source: { type: KnownTypes.TRANSFER } }).sources(),
  );
  const transfers = readTransfers(tdb, transferUrns);
  const result: TripPolyline[] = [];

  for (const transfer of transfers) {
    const sourcePlace = readPlace(tdb, transfer.source);
    const destinationPlace = readPlace(tdb, transfer.destination);
    const hasBothEndpoints = !isNone(sourcePlace) && !isNone(destinationPlace);
    if (!hasBothEndpoints) {
      continue;
    }
    const hasInvalidEndpoint = !hasValidCoordinates(sourcePlace) ||
      !hasValidCoordinates(destinationPlace);
    if (hasInvalidEndpoint) {
      continue;
    }
    result.push({
      tripUrn: transfer.id,
      latLngs: [
        [sourcePlace.latitude, sourcePlace.longitude],
        [destinationPlace.latitude, destinationPlace.longitude],
      ],
      ...(transfer.mode != null && { mode: transfer.mode }),
    });
  }

  return result;
}
