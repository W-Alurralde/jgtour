
export interface TravelPayoutsOffer {
  flight_number: string;
  origin: string;
  destination: string;
  origin_airport: string;
  destination_airport: string;
  departure_at: string;
  airline: string;
  price: number;
  transfers: number;
  duration: number;
  gate: string;
  link: string;
}

interface TravelPayoutsResponse {
  success: boolean;
  source: string;
  priceType: string;
  currency: string;
  flights: TravelPayoutsOffer[];
  error?: string;
}

export async function getTravelPayoutsOffers(
  origin: string,
  destination: string,
  departureDate?: string
): Promise<TravelPayoutsResponse> {
  const params = new URLSearchParams({
    origin,
    destination,
  });

  if (departureDate) {
    params.set("departureDate", departureDate);
  }

  const response = await fetch(
    `/api/travelpayouts/flights?${params.toString()}`
  );

  const data: TravelPayoutsResponse = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(
      data.error || "No se pudieron consultar las ofertas"
    );
  }

  return data;
}
