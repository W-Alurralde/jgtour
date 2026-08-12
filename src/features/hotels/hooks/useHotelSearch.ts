import { buildTravelPayoutsHotelLink } from "../services/travelPayoutsHotelService";
import type { HotelSearchState } from "../types/hotelSearch.types";

export function useHotelSearch() {
  const searchHotels = (search: HotelSearchState) => {
    const url = buildTravelPayoutsHotelLink(search);
    window.open(url, "_blank");
  };

  return { searchHotels };
}