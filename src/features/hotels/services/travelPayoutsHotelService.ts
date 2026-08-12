import type { HotelSearchState } from "../types/hotelSearch.types";

export function buildTravelPayoutsHotelLink(
  search: HotelSearchState
) {
  const marker = import.meta.env.VITE_TRAVELPAYOUTS_MARKER;

  const adults = search.rooms.reduce((sum, room) => sum + room.adults, 0);
  const children = search.rooms.reduce((sum, room) => sum + room.children, 0);

  const params = new URLSearchParams({
    destination: search.destination,
    checkIn: search.checkIn,
    checkOut: search.checkOut,
    adults: String(adults),
    children: String(children),
    rooms: String(search.rooms.length),
    marker,
  });

  return `https://search.hotellook.com/?${params.toString()}`;
}