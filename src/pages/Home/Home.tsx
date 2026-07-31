import DestinationMap from "@/features/maps/components/DestinationMap";
import FlightSearchForm from "@/features/flights/components/FlightSearchForm";
import HotelSearchForm from "@/features/hotels/components/HotelSearchForm";

export default function Home() {
  return (
    <section style={{ display: "grid", gap: 32 }}>
      <h1>Bienvenido a JGTravel</h1>

      <FlightSearchForm />

      <HotelSearchForm />

      <section>
        <h2>Destinos destacados de Salta</h2>
        <DestinationMap />
      </section>
    </section>
  );
}
