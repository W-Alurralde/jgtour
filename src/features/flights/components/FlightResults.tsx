import FlightCard from "./FlightCard";
import type { FlightResult } from "../types/flight";

interface Props {
  flights: FlightResult[];
}

export default function FlightResults({ flights }: Props) {
  if (flights.length === 0) {
    return <p>No se encontraron vuelos.</p>;
  }

  return (
    <div style={{ display: "grid", gap: 16 }}>
      {flights.map((flight) => (
        <FlightCard key={flight.id} flight={flight} />
      ))}
    </div>
  );
}