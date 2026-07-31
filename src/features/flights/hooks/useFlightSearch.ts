import { useQuery } from "@tanstack/react-query";

import { mockFlights } from "../data/mockFlights";
import type { FlightSearchFormData } from "../schemas/flightSearch.schema";

export function useFlightSearch(params?: FlightSearchFormData) {
  return useQuery({
    queryKey: ["flights", params],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 800));

      return mockFlights.filter(
        (flight) =>
          !params ||
          (flight.origin === params.origin.toUpperCase() &&
            flight.destination === params.destination.toUpperCase())
      );
    },
    enabled: !!params,
    staleTime: 1000 * 60 * 30,
  });
}