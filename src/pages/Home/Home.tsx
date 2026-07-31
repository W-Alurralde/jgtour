import DestinationMap from "../../features/maps/components/DestinationMap";
import { buildFlightSearchLink } from "../../services/travelpayouts/flights";

export default function Home() {
  const flightLink = buildFlightSearchLink({
    origin: "SLA",
    destination: "AEP",
    departureDate: "2026-08-05",
  });

  return (
    <section>
      <h1>Bienvenido a JGTravel</h1>

      <p>
        <a
          href={flightLink}
          target="_blank"
          rel="noreferrer"
        >
          ✈️ Buscar vuelos Salta → Buenos Aires
        </a>
      </p>

      <h2>Destinos destacados de Salta</h2>

      <DestinationMap />
    </section>
  );
}