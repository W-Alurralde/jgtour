import { useQuery } from "@tanstack/react-query";

import { mockHotels } from "../data/mockHotels";
import type { HotelSearchFormData } from "../schemas/hotelSearch.schema";

export function useHotelSearch(params?: HotelSearchFormData) {
  return useQuery({
    queryKey: ["hotels", params],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 800));

      return mockHotels.filter(
        (hotel) =>
          !params ||
          hotel.city.toLowerCase() === params.city.toLowerCase()
      );
    },
    enabled: !!params,
    staleTime: 1000 * 60 * 30,
  });
}