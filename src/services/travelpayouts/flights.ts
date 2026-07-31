import { env } from "../../config/env";

export interface FlightLinkParams {
  origin: string;
  destination: string;
  departureDate: string;
}

export function buildFlightSearchLink({
  origin,
  destination,
  departureDate,
}: FlightLinkParams) {
  const baseUrl = "https://www.travelpayouts.com/search";

  const url = new URL(baseUrl);

  url.searchParams.set("origin", origin);
  url.searchParams.set("destination", destination);
  url.searchParams.set("depart_date", departureDate);

  // Tu token de afiliado
  url.searchParams.set("marker", env.travelpayouts.apiToken);

  return url.toString();
}