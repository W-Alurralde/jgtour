import { useState } from "react";
import { Check, Plus, Trash2 } from "lucide-react";

import type { TravelPackage } from "@/features/packages/types/package.types";
import { useTrip } from "@/features/trip/hooks/useTrip";

interface PackageCardProps {
  travelPackage: TravelPackage;
}

export default function PackageCard({ travelPackage }: PackageCardProps) {
  const {
    id,
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

  const [showDetails, setShowDetails] = useState(false);

  const { addItem, removeItem, hasItem } = useTrip();

  const isInTrip = hasItem(id, "package");

  const formatDate = (date: string) =>
    new Intl.DateTimeFormat("es-AR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      timeZone: "UTC",
    }).format(new Date(date));

  function handleTripToggle() {
    if (isInTrip) {
      removeItem(id, "package");
      return;
    }

    addItem({
      id,
      type: "package",
      title: name,
      subtitle: `${origin} → ${destination}`,
      price,
      currency,
      image,
      provider: "JGTravel",

      details: {
        travelPackage,
      },
    });
  }

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

        {/* NUEVO: Mi Viaje */}
        <button
          type="button"
          className={`package-trip-button ${isInTrip ? "is-added" : ""}`}
          onClick={handleTripToggle}
        >
          {isInTrip ? (
            <>
              <Check size={18} />
              Agregado a Mi Viaje
              <Trash2 size={16} />
            </>
          ) : (
            <>
              <Plus size={18} />
              Agregar a Mi Viaje
            </>
          )}
        </button>

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
