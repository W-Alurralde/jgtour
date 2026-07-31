import type { HotelResult } from "../types/hotel";

interface Props {
  hotel: HotelResult;
}

export default function HotelCard({ hotel }: Props) {
  return (
    <article
      style={{
        border: "1px solid #e2e8f0",
        borderRadius: 16,
        overflow: "hidden",
        background: "white",
      }}
    >
      <img
        src={hotel.imageUrl}
        alt={hotel.name}
        style={{ width: "100%", height: 180, objectFit: "cover" }}
      />

      <div style={{ padding: 16 }}>
        <h3>{hotel.name}</h3>
        <p>📍 {hotel.city}</p>
        <p>⭐ {hotel.rating}/5</p>

        <p style={{ fontSize: 20, fontWeight: 700, color: "#0057B8" }}>
          {hotel.currency} {hotel.pricePerNight.toLocaleString("es-AR")} / noche
        </p>

        <a
          href={hotel.deepLink}
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
          Ver hotel 🏨
        </a>
      </div>
    </article>
  );
}