import type { TravelPackage } from "@/features/packages/types/package.types";
import { useState } from "react";

interface PackageCardProps {
  travelPackage: TravelPackage;
}

export default function PackageCard({ travelPackage }: PackageCardProps) {
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

  const [showDetails, setShowDetails] = useState(false);

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

        <span className="package-card-nights">{nights} noches</span>
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
            <strong>Fechas:</strong> {formatDate(departureDate)} –{" "}
            {formatDate(returnDate)}
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

          <button
            type="button"
            className="package-card-button"
            onClick={() => setShowDetails((prev) => !prev)}
          >
            {showDetails ? "Ocultar detalle" : "Ver paquete"}
          </button>
        </div>

        {showDetails && (
          <div className="package-card-expanded">
            <h4>Incluido en este paquete</h4>

            <ul>
              <li>
                Alojamiento en {hotel} · {hotelCategory}★
              </li>

              <li>
                {nights} noches en {destination}
              </li>

              <li>{experience}</li>

              <li>
                Viaje desde {origin} hacia {destination}
              </li>
            </ul>

            <div className="package-card-actions">
              {travelPackage.flightSearch && (
                <a
                  href={travelPackage.flightSearch}
                  target="_blank"
                  rel="noreferrer"
                  className="package-secondary-button"
                >
                  Ver vuelos
                </a>
              )}

              {travelPackage.hotelSearch && (
                <a
                  href={travelPackage.hotelSearch}
                  target="_blank"
                  rel="noreferrer"
                  className="package-secondary-button"
                >
                  Ver hotel
                </a>
              )}

              <button type="button" className="package-reserve-button">
                Solicitar reserva
              </button>
            </div>
          </div>
        )}

        <small className="package-card-updated">
          Actualizado {formatDate(updatedAt)}
        </small>
      </div>
    </article>
  );
}
