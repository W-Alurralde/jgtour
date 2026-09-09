// =============================================
// TIPO DE VIAJE
// =============================================

export type TripType =
  | "roundtrip"
  | "oneway"
  | "multicity";


// =============================================
// CLASE DE CABINA
// =============================================

export type CabinClass =
  | "economy"
  | "premium-economy"
  | "business"
  | "first"
  | "premium-business"
  | "premium-first";


// =============================================
// ASISTENCIA
// =============================================

export type AssistanceType =
  | "wheelchair"
  | "reduced-mobility"
  | "crutches"
  | "boarding-assistance"
  | "visual-assistance"
  | "hearing-assistance"
  | "other";


// =============================================
// PASAJEROS
// =============================================

export interface FlightPassengerState {
  adults: number;

  children: number;

  infants: number;

  pets: number;
}


// =============================================
// ASISTENCIA ESPECIAL
// =============================================

export interface FlightAssistanceState {
  needed: boolean;

  type?: AssistanceType;
}


// =============================================
// BÚSQUEDA DE VUELO
// =============================================

export interface FlightSearchState {
  tripType: TripType;

  origin: string;

  destination: string;

  departureDate: string;

  returnDate?: string;

  passengers: FlightPassengerState;

  cabinClass: CabinClass;

  assistance: FlightAssistanceState;

  voucher?: string;
}