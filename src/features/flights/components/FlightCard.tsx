import type { FlightResult } from "../types/flight";

interface Props {
  flight: FlightResult;
}

export default function FlightCard({ flight }: Props) {
  return (
    <article
      style={{
        border: "1px solid #e2e8f0",
        padding: 20,
        borderRadius: 16,
        background: "white",
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
      }}
    >
      <h3 style={{ marginTop: 0 }}>{flight.airline}</h3>

      <p>
        ✈️ {flight.origin} → {flight.destination}
      </p>
      <p>
        🕒 {flight.departureTime} - {flight.arrivalTime}
      </p>

      <p style={{ fontSize: 20, fontWeight: 700, color: "#0057B8" }}>
        {flight.currency} {flight.price.toLocaleString("es-AR")}
      </p>

      <a
        href={flight.deepLink}
        target="_blank"
        rel="noreferrer"
        style={{
          display: "inline-block",
          marginTop: 8,
          padding: "10px 16px",
          borderRadius: 8,
          background: "#11C5E8",
          color: "white",
          textDecoration: "none",
          fontWeight: 600,
        }}
      >
        Ver oferta ✈️
      </a>
    </article>
  );
}
