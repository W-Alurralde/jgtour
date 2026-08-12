import type { FlightSearchState } from "../types/flightSearch.types";

export function buildTravelPayoutsFlightLink(
  search: FlightSearchState
) {
  const marker = import.meta.env.VITE_TRAVELPAYOUTS_MARKER;

  const params = new URLSearchParams({
    origin: search.origin,
    destination: search.destination,
    depart_date: search.departureDate,
    return_date: search.returnDate || "",
    marker,
  });

  return `https://www.travelpayouts.com/search?${params.toString()}`;
}