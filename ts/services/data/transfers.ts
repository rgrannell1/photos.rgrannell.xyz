/* Read trip transfer lines from the triple store. */

import { TribbleDB } from "@rgrannell1/tribbledb/v2";
import { KnownTypes } from "../../constants/data.ts";
import { isNone } from "../../commons/maybe.ts";
import { hasValidCoordinates } from "./places.ts";
import { readPlace, readTransfers } from "./readers.ts";
import type { TripPolyline } from "../../domain/map.ts";
import type { Transfer } from "../../types/domain.ts";

function readTransferPolyline(
  tdb: TribbleDB,
  transfer: Transfer,
): TripPolyline | null {
  const sourcePlace = readPlace(tdb, transfer.source);
  const destinationPlace = readPlace(tdb, transfer.destination);
  if (isNone(sourcePlace) || isNone(destinationPlace)) {
    return null;
  }
  if (!hasValidCoordinates(sourcePlace) || !hasValidCoordinates(destinationPlace)) {
    return null;
  }
  return {
    tripUrn: transfer.id,
    latLngs: [
      [sourcePlace.latitude, sourcePlace.longitude],
      [destinationPlace.latitude, destinationPlace.longitude],
    ],
    ...(transfer.mode != null && { mode: transfer.mode }),
  };
}

export function readTransferPolylines(tdb: TribbleDB): TripPolyline[] {
  const transferUrns = new Set(
    tdb.search({ source: { type: KnownTypes.TRANSFER } }).sources(),
  );
  const transfers = readTransfers(tdb, transferUrns);
  const result: TripPolyline[] = [];

  for (const transfer of transfers) {
    const polyline = readTransferPolyline(tdb, transfer);
    if (polyline !== null) {
      result.push(polyline);
    }
  }

  return result;
}
