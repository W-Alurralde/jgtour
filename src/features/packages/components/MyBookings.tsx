
import { useEffect, useState } from "react";

import CancellationModal from "./CancellationModal";
import {
  getMyBookings,
  type MyBooking,
} from "../services/bookingService";

export default function MyBookings() {
  const [bookings, setBookings] = useState<MyBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBooking, setSelectedBooking] =
    useState<MyBooking | null>(null);
  const [requestedIds, setRequestedIds] =
    useState<string[]>([]);

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const data = await getMyBookings();
        if (active) setBookings(data);
      } catch (err) {
        if (active) {
          setError(
            err instanceof Error
              ? err.message
              : "No se pudieron cargar las reservas"
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    void load();

    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="trip-items" aria-label="Mis reservas">
      <h2>Mis reservas</h2>

      {loading && <p>Cargando reservas...</p>}

      {error && <p role="alert">{error}</p>}

      {!loading && !error && bookings.length === 0 && (
        <p>Todavía no tenés reservas registradas.</p>
      )}

      {bookings.map((booking) => (
        <article key={booking.id} className="trip-card">
          <div className="trip-card-content">
            <span className="trip-card-type">Paquete turístico</span>

            <h3>{booking.packageName || booking.packageId}</h3>

            <p>
              {booking.origin} → {booking.destination}
            </p>

            <p>
              <strong>Estado:</strong> {booking.status}
            </p>

            <p>
              <strong>Referencia:</strong> {booking.id}
            </p>

            <p>
              <strong>Importe:</strong> {booking.currency}{" "}
              {booking.price.toLocaleString("es-AR")}
            </p>

            {booking.status === "pending" &&
              !requestedIds.includes(booking.id) && (
                <button
                  type="button"
                  className="trip-cancellation-button"
                  onClick={() => setSelectedBooking(booking)}
                >
                  Solicitar cancelación
                </button>
              )}

            {requestedIds.includes(booking.id) && (
              <p>Solicitud de cancelación enviada para revisión.</p>
            )}
          </div>
        </article>
      ))}

      {selectedBooking && (
        <CancellationModal
          bookingId={selectedBooking.id}
          itemId={selectedBooking.packageId}
          itemType="package"
          onClose={() => setSelectedBooking(null)}
          onSuccess={() => {
            setRequestedIds((previous) => [
              ...previous,
              selectedBooking.id,
            ]);
            setSelectedBooking(null);
          }}
        />
      )}
    </section>
  );
}
