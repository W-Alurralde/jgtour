export type TripType =
  | "roundtrip"
  | "oneway"
  | "multicity";

export type CabinClass =
  | "economy"
  | "premium-economy"
  | "business"
  | "first"
  | "premium-business"
  | "premium-first";

export interface FlightPassengerState {
  adults: number;
  children: number;
  infants: number;
  pets: number;
}

export interface FlightSearchState {
  tripType: TripType;
  origin: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
  passengers: FlightPassengerState;
  cabinClass: CabinClass;
  voucher?: string;
}