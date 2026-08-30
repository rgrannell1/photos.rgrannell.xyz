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

function readGeocodedPlace(tdb: TribbleDB, urn: string): GeocodedPlace | null {
  const place = readPlace(tdb, urn);
  if (isNone(place)) {
    return null;
  }
  const isGeocoded = hasValidCoordinates(place);
  return isGeocoded ? place : null;
}

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

function readTransferPlaces(
  tdb: TribbleDB,
  transfer: Transfer,
): [GeocodedPlace | null, GeocodedPlace | null] {
  const source = readGeocodedPlace(tdb, transfer.source);
  const destination = readGeocodedPlace(tdb, transfer.destination);
  return [source, destination];
}

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

function isTripPolyline(value: TripPolyline | null): value is TripPolyline {
  return value !== null;
}

function readTransferUrns(tdb: TribbleDB): Set<string> {
  const query = { source: { type: KnownTypes.TRANSFER } };
  const urns = tdb.search(query).sources();
  return new Set(urns);
}

function readAllTransfers(tdb: TribbleDB): Transfer[] {
  const transferUrns = readTransferUrns(tdb);
  return readTransfers(tdb, transferUrns);
}

export function readTransferPolylines(tdb: TribbleDB): TripPolyline[] {
  const transfers = readAllTransfers(tdb);
  const makePolyline = readTransferPolyline.bind(null, tdb);
  const polylines = transfers.map(makePolyline);

  return polylines.filter(isTripPolyline);
}
