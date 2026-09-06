import type { TravelPackage } from "@/features/packages/types/package.types";

interface PackageCardProps {
  travelPackage: TravelPackage;
}

export default function PackageCard({
  travelPackage,
}: PackageCardProps) {
  const {
    name,
    origin,
    destination,
    departureDate,
    returnDate,
    nights,
    hotel,
    hotelCategory,
    experience,
    price,
    currency,
    image,
    updatedAt,
  } = travelPackage;

  const formatDate = (date: string) =>
    new Intl.DateTimeFormat("es-AR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      timeZone: "UTC",
    }).format(new Date(date));

  return (
    <article className="package-card">
      <div className="package-card-image">
        {image ? (
          <img src={image} alt={name} />
        ) : (
          <div className="package-card-placeholder">
            <span>JGTravel</span>
          </div>
        )}

        <span className="package-card-nights">
          {nights} noches
        </span>
      </div>

      <div className="package-card-content">
        <div>
          <span className="package-card-route">
            {origin} → {destination}
          </span>

          <h3>{name}</h3>
        </div>

        <div className="package-card-details">
          <p>
            <strong>Fechas:</strong>{" "}
            {formatDate(departureDate)} – {formatDate(returnDate)}
          </p>

          <p>
            <strong>Hotel:</strong> {hotel} · {hotelCategory}★
          </p>

          <p>
            <strong>Experiencia:</strong> {experience}
          </p>
        </div>

        <div className="package-card-footer">
          <div>
            <span className="package-card-from">Desde</span>

            <strong className="package-card-price">
              {currency} {price.toLocaleString("es-AR")}
            </strong>
          </div>

          <button type="button" className="package-card-button">
            Ver paquete
          </button>
        </div>

        <small className="package-card-updated">
          Actualizado {formatDate(updatedAt)}
        </small>
      </div>
    </article>
  );
}