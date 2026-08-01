import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";

import DestinationMap from "@/features/maps/components/DestinationMap";
import FlightSearchForm from "@/features/flights/components/FlightSearchForm";
import HotelSearchForm from "@/features/hotels/components/HotelSearchForm";

export default function Home() {
  return (
    <Container>
      <section style={{ display: "grid", gap: 32, padding: "32px 0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <h1 style={{ margin: 0 }}>Bienvenido a JGTravel</h1>
          <Badge variant="success">MVP Online</Badge>
        </div>

        <FlightSearchForm />

        <HotelSearchForm />

        <section>
          <h2>Destinos destacados de Salta</h2>
          <DestinationMap />
        </section>
      </section>
    </Container>
  );
}