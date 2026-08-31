/* Read trip transfer lines from the triple store. */

/* Read trip transfer lines from the triple store. */
import { TribbleDB } from "@rgrannell1/tribbledb/v2";
import { KnownTypes } from "../../../constants/data.ts";
import { isNone } from "../../../commons/collections/maybe.ts";
import { hasValidCoordinates } from "../entities/places.ts";
import { readPlace, readTransfers } from "../readers.ts";
import type { GeocodedPlace } from "../../../domain/places.ts";
import type { TripPolyline } from "../../../domain/map.ts";
import type { Transfer } from "../../../types/domain.ts";

/** Reads a place only when it exists and has valid coordinates. */
function readGeocodedPlace(tdb: TribbleDB, urn: string): GeocodedPlace | null {
  const place = readPlace(tdb, urn);
  if (isNone(place)) {
    return null;
  }
  const isGeocoded = hasValidCoordinates(place);
  return isGeocoded ? place : null;
}

/** Converts two geocoded places into a source-to-destination coordinate pair. */
function readTransferLatLngs(
  sourcePlace: GeocodedPlace,
  destinationPlace: GeocodedPlace,
): [number, number][] {
  const source: [number, number] = [
    sourcePlace.latitude,
    sourcePlace.longitude,
  ];
  const destination: [number, number] = [
    destinationPlace.latitude,
    destinationPlace.longitude,
  ];
  return [source, destination];
}

/** Builds a trip polyline and includes its transport mode when known. */
function makeTransferPolyline(
  transfer: Transfer,
  sourcePlace: GeocodedPlace,
  destinationPlace: GeocodedPlace,
): TripPolyline {
  const latLngs = readTransferLatLngs(sourcePlace, destinationPlace);
  const polyline = {
    tripUrn: transfer.id,
    latLngs,
    ...(transfer.mode != null && { mode: transfer.mode }),
  };
  return polyline;
}

/** Reads the geocoded endpoints for a transfer. */
function readTransferPlaces(
  tdb: TribbleDB,
  transfer: Transfer,
): [GeocodedPlace | null, GeocodedPlace | null] {
  const source = readGeocodedPlace(tdb, transfer.source);
  const destination = readGeocodedPlace(tdb, transfer.destination);
  return [source, destination];
}

/** Builds a transfer polyline, or returns null when either endpoint is invalid. */
function readTransferPolyline(
  tdb: TribbleDB,
  transfer: Transfer,
): TripPolyline | null {
  const [sourcePlace, destinationPlace] = readTransferPlaces(tdb, transfer);
  if (sourcePlace === null || destinationPlace === null) {
    return null;
  }
  const polyline = makeTransferPolyline(
    transfer,
    sourcePlace,
    destinationPlace,
  );
  return polyline;
}

/** Narrows a nullable polyline to a valid trip polyline. */
function isTripPolyline(value: TripPolyline | null): value is TripPolyline {
  return value !== null;
}

/** Reads every transfer source URN from the triple store. */
function readTransferUrns(tdb: TribbleDB): Set<string> {
  const query = { source: { type: KnownTypes.TRANSFER } };
  const urns = tdb.search(query).sources();
  return new Set(urns);
}

/** Reads all transfer records from the triple store. */
function readAllTransfers(tdb: TribbleDB): Transfer[] {
  const transferUrns = readTransferUrns(tdb);
  return readTransfers(tdb, transferUrns);
}

/** Builds polylines for transfers with two valid geocoded endpoints. */
export function readTransferPolylines(tdb: TribbleDB): TripPolyline[] {
  const transfers = readAllTransfers(tdb);
  const makePolyline = readTransferPolyline.bind(null, tdb);
  const polylines = transfers.map(makePolyline);

  return polylines.filter(isTripPolyline);
}
