import HotelCard from "./HotelCard";
import type { HotelResult } from "../types/hotel";

interface Props {
  hotels: HotelResult[];
}

export default function HotelResults({ hotels }: Props) {
  if (hotels.length === 0) {
    return <p>No se encontraron hoteles.</p>;
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: 16,
      }}
    >
      {hotels.map((hotel) => (
        <HotelCard key={hotel.id} hotel={hotel} />
      ))}
    </div>
  );
}