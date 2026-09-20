import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  BriefcaseBusiness,
  CalendarDays,
  MapPin,
  Trash2,
} from "lucide-react";

import BookingForm from "@/features/packages/components/BookingForm";

import { useTrip } from "@/features/trip/hooks/useTrip";

import type { TravelPackage } from "@/features/packages/types/package.types";
import type { TripItem } from "@/features/trip/types/trip.types";

import "./Trip.css";

export default function Trip() {
  const [bookingPackage, setBookingPackage] =
    useState<TravelPackage | null>(null);

  const {
    items,
    itemCount,
    total,
    currency,
    removeItem,
    clearTrip,
  } = useTrip();

  /*
   * Por ahora BookingForm trabaja con un paquete
   * JGTravel individual.
   */
  const packageItems = items.filter(
    (item) => item.type === "package"
  );

  const reservablePackage =
    packageItems.length === 1
      ? getTravelPackage(packageItems[0])
      : null;

  /*
   * Estado vacío de Mi Viaje.
   */
  if (itemCount === 0) {
    return (
      <main className="trip-page">
        <div className="trip-container">
          <section className="trip-empty">
            <BriefcaseBusiness size={48} />

            <h1>Tu viaje está vacío</h1>

            <p>
              Explorá las propuestas de JGTravel y agregá
              los servicios que quieras incluir en tu viaje.
            </p>

            <Link
              to="/"
              className="trip-primary-button"
            >
              Seguir explorando
            </Link>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="trip-page">
      <div className="trip-container">
        <header className="trip-header">
          <div>
            <span className="trip-eyebrow">
              JGTravel
            </span>

            <h1>Mi Viaje</h1>

            <p>
              Revisá los servicios seleccionados antes
              de continuar con la reserva.
            </p>
          </div>

          <span className="trip-item-count">
            {itemCount}{" "}
            {itemCount === 1
              ? "servicio"
              : "servicios"}
          </span>
        </header>

        <div className="trip-layout">
          {/* ========================= */}
          {/* SERVICIOS SELECCIONADOS */}
          {/* ========================= */}

          <section className="trip-items">
            {items.map((item) => (
              <article
                key={`${item.type}-${item.id}`}
                className="trip-card"
              >
                {item.image && (
                  <div className="trip-card-image">
                    <img
                      src={item.image}
                      alt={item.title}
                    />
                  </div>
                )}

                <div className="trip-card-content">
                  <div className="trip-card-heading">
                    <div>
                      <span className="trip-card-type">
                        {getTypeLabel(item.type)}
                      </span>

                      <h2>{item.title}</h2>

                      {item.subtitle && (
                        <p className="trip-card-subtitle">
                          <MapPin size={16} />

                          {item.subtitle}
                        </p>
                      )}
                    </div>

                    <button
                      type="button"
                      className="trip-remove-button"
                      onClick={() =>
                        removeItem(
                          item.id,
                          item.type
                        )
                      }
                      aria-label={`Eliminar ${item.title}`}
                      title="Eliminar de Mi Viaje"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  {item.type === "package" && (
                    <PackageDetails
                      details={item.details}
                    />
                  )}

                  {typeof item.price === "number" &&
                    item.currency && (
                      <div className="trip-card-price">
                        <span>Desde</span>

                        <strong>
                          {item.currency}{" "}
                          {item.price.toLocaleString(
                            "es-AR"
                          )}
                        </strong>
                      </div>
                    )}
                </div>
              </article>
            ))}
          </section>

          {/* ========================= */}
          {/* RESUMEN DE MI VIAJE */}
          {/* ========================= */}

          <aside className="trip-summary">
            <h2>Resumen</h2>

            <div className="trip-summary-row">
              <span>
                Servicios seleccionados
              </span>

              <strong>{itemCount}</strong>
            </div>

            {currency ? (
              <div className="trip-summary-total">
                <span>Total estimado</span>

                <strong>
                  {currency}{" "}
                  {total.toLocaleString(
                    "es-AR"
                  )}
                </strong>

                <small>
                  El importe final puede variar al
                  confirmar disponibilidad y reserva.
                </small>
              </div>
            ) : (
              <p className="trip-summary-currencies">
                Tu viaje contiene servicios en
                distintas monedas. Los importes se
                muestran por separado.
              </p>
            )}

            {/* ========================= */}
            {/* CONTINUAR RESERVA */}
            {/* ========================= */}

            <button
              type="button"
              className="trip-checkout-button"
              disabled={!reservablePackage}
              onClick={() => {
                if (reservablePackage) {
                  setBookingPackage(
                    reservablePackage
                  );
                }
              }}
            >
              Continuar con la reserva
            </button>

            {!reservablePackage && (
              <small className="trip-booking-notice">
                La reserva directa está disponible
                actualmente para un paquete JGTravel
                por vez.
              </small>
            )}

            <Link
              to="/"
              className="trip-explore-link"
            >
              <ArrowLeft size={16} />

              Seguir explorando
            </Link>

            <button
              type="button"
              className="trip-clear-button"
              onClick={clearTrip}
            >
              Vaciar Mi Viaje
            </button>
          </aside>
        </div>
      </div>

      {/* ========================= */}
      {/* FORMULARIO DE RESERVA */}
      {/* ========================= */}

      {bookingPackage && (
        <BookingForm
          travelPackage={bookingPackage}
          onClose={() =>
            setBookingPackage(null)
          }
        />
      )}
    </main>
  );
}

/*
 * Recupera el TravelPackage original guardado
 * dentro del TripItem.
 */
function getTravelPackage(
  item: TripItem
): TravelPackage | null {
  if (
    item.type !== "package" ||
    !item.details
  ) {
    return null;
  }

  const travelPackage =
    item.details.travelPackage;

  if (
    !travelPackage ||
    typeof travelPackage !== "object"
  ) {
    return null;
  }

  return travelPackage as TravelPackage;
}

interface PackageDetailsProps {
  details?: Record<string, unknown>;
}

/*
 * Muestra los datos del paquete utilizando
 * el snapshot TravelPackage guardado en Mi Viaje.
 */
function PackageDetails({
  details,
}: PackageDetailsProps) {
  if (!details) {
    return null;
  }

  const travelPackage =
    details.travelPackage;

  if (
    !travelPackage ||
    typeof travelPackage !== "object"
  ) {
    return null;
  }

  const packageData =
    travelPackage as TravelPackage;

  return (
    <div className="trip-package-details">
      <p>
        <CalendarDays size={16} />

        {formatDate(
          packageData.departureDate
        )}{" "}
        –{" "}
        {formatDate(
          packageData.returnDate
        )}
      </p>

      <p>
        {packageData.nights} noches
      </p>

      <p>
        {packageData.hotel} ·{" "}
        {packageData.hotelCategory}★
      </p>

      <p>
        {packageData.experience}
      </p>
    </div>
  );
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat(
    "es-AR",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
      timeZone: "UTC",
    }
  ).format(new Date(date));
}

function getTypeLabel(type: string) {
  const labels: Record<string, string> = {
    package: "Paquete",
    flight: "Vuelo",
    hotel: "Hotel",
    car: "Auto",
    bus: "Bus",
    cruise: "Crucero",
    disney: "Disney",
    restaurant: "Gastronomía",
    experience: "Experiencia",
  };

  return labels[type] ?? "Servicio";
}