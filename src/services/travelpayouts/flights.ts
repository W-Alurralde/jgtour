import { env } from "../../config/env";

export interface FlightLinkParams {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
}

export function buildFlightSearchLink({
  origin,
  destination,
  departureDate,
  returnDate,
}: FlightLinkParams) {
  const baseUrl = "https://www.travelpayouts.com/search";

  const url = new URL(baseUrl);

  url.searchParams.set("origin", origin);
  url.searchParams.set("destination", destination);
  url.searchParams.set("depart_date", departureDate);

  if (returnDate) {
    url.searchParams.set("return_date", returnDate);
  }

  url.searchParams.set("marker", env.travelpayouts.marker);

  return url.toString();
}