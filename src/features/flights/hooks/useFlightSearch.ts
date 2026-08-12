import { buildTravelPayoutsFlightLink } from "../services/travelPayoutsFlightService";
import type { FlightSearchState } from "../types/flightSearch.types";

export function useFlightSearch() {
  const searchFlights = (search: FlightSearchState) => {
    const url = buildTravelPayoutsFlightLink(search);
    window.open(url, "_blank");
  };

  return { searchFlights };
}