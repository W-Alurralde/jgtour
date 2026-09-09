export interface FlightRequestData {
  flight_id: string;
  passengers: number;

  customer_name: string;
  customer_email: string;
  customer_phone?: string;

  notes?: string;
}

export interface FlightRequest {
  request_id: string;
  created_at: string;

  flight_id: string;

  airline: string;
  airline_name?: string;

  flight_number: number;

  origin: string;
  destination: string;

  departure_date: string;
  departure_time: string;

  arrival_date?: string;
  arrival_time?: string;

  duration?: string;
  fare_family?: string;

  passengers: number;

  reference_price: number;
  currency: string;

  status: string;
}

export interface FlightRequestResponse {
  success: boolean;
  request?: FlightRequest;
  error?: string;
}