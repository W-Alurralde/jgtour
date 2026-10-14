export interface FlightRequestData {
  flight_id: string;

  client_request_id: string;

  passengers: number;

  adults: number;

  children: number;

  infants: number;

  pets: number;

  cabin_class: string;

  needs_assistance: boolean;

  assistance_type?: string;

  customer_name: string;

  customer_email: string;

  customer_phone?: string;

  notes?: string;
}

export interface FlightRequest {
  request_id: string;

  client_request_id: string;

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

  adults: number;

  children: number;

  infants: number;

  pets: number;

  cabin_class: string;

  needs_assistance: boolean;

  assistance_type?: string;

  reference_price: number;

  currency: string;

  status: string;
}

export interface FlightRequestResponse {
  success: boolean;

  request?: FlightRequest;

  error?: string;
}

/**
 * Vuelo obtenido desde la API de Google Apps Script.
 *
 * Los campos específicos deben ajustarse al contrato
 * real de la respuesta action=flights.
 */


export interface Flight {
  id: string;

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
  stops?: number;
  fare_family?: string;

  price?: number;
  reference_price: number;

  currency: string;
}


/**
 * Respuesta de la API para action=flights.
 */
export interface FlightsResponse {
  success: boolean;
  flights: Flight[];
  error?: string;
}
