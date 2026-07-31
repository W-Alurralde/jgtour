import type { FlightResult } from "../types/flight";

export const mockFlights: FlightResult[] = [
  {
    id: "1",
    airline: "Aerolíneas Argentinas",
    origin: "SLA",
    destination: "AEP",
    departureTime: "08:30",
    arrivalTime: "10:40",
    price: 98500,
    currency: "ARS",
    deepLink: "https://www.travelpayouts.com/search?origin=SLA&destination=AEP",
  },
  {
    id: "2",
    airline: "JetSMART",
    origin: "SLA",
    destination: "AEP",
    departureTime: "14:20",
    arrivalTime: "16:15",
    price: 75200,
    currency: "ARS",
    deepLink: "https://www.travelpayouts.com/search?origin=SLA&destination=AEP",
  },
];