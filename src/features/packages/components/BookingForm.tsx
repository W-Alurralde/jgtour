import { useState, type FormEvent } from "react";

import {
  createBooking,
  type CreateBookingInput,
} from "@/features/packages/services/bookingService";

import type { TravelPackage } from "@/features/packages/types/package.types";

interface BookingFormProps {
  travelPackage: TravelPackage;
  onClose: () => void;
}

export default function BookingForm({
  travelPackage,
  onClose,
}: BookingFormProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [travelers, setTravelers] = useState(1);
  const [notes, setNotes] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [bookingId, setBookingId] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setSubmitting(true);
      setError(null);

      const booking: CreateBookingInput = {
        packageId: travelPackage.id,
        packageName: travelPackage.name,

        price: travelPackage.price,
        currency: travelPackage.currency,

        origin: travelPackage.origin,
        destination: travelPackage.destination,

        departureDate: travelPackage.departureDate,
        returnDate: travelPackage.returnDate,

        fullName,
        email,
        phone,
        travelers,
        notes,
      };

      const response = await createBooking(booking);

      setBookingId(response.booking?.id ?? "");
      setSuccess(true);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "No se pudo enviar la solicitud",
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <div className="booking-success">
        <h4>Solicitud recibida</h4>

        <p>
          Recibimos tu solicitud para <strong>{travelPackage.name}</strong>.
        </p>

        {bookingId && (
          <p className="booking-reference">
            Referencia: <strong>{bookingId}</strong>
          </p>
        )}

        <p>
          El equipo de JGTravel verificará disponibilidad y precio antes de
          confirmar la reserva.
        </p>

        <button
          type="button"
          className="package-reserve-button"
          onClick={onClose}
        >
          Cerrar
        </button>
      </div>
    );
  }

  return (
    <form className="booking-form" onSubmit={handleSubmit}>
      <h4>Solicitar reserva</h4>

      <p className="booking-package-name">
        {travelPackage.name} · {travelPackage.currency}{" "}
        {travelPackage.price.toLocaleString("es-AR")}
      </p>

      <label>
        Nombre y apellido
        <input
          type="text"
          value={fullName}
          onChange={(event) => setFullName(event.target.value)}
          required
        />
      </label>

      <label>
        Email
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </label>

      <label>
        Teléfono
        <input
          type="tel"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
        />
      </label>

      <label>
        Viajeros
        <input
          type="number"
          min="1"
          max="20"
          value={travelers}
          onChange={(event) => setTravelers(Number(event.target.value))}
          required
        />
      </label>

      <label>
        Observaciones
        <textarea
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
          rows={3}
          placeholder="Equipaje, menores, necesidades especiales..."
        />
      </label>

      {error && <p className="booking-error">{error}</p>}

      <div className="booking-form-actions">
        <button
          type="button"
          className="package-secondary-button"
          onClick={onClose}
          disabled={submitting}
        >
          Cancelar
        </button>

        <button
          type="submit"
          className="package-reserve-button"
          disabled={submitting}
        >
          {submitting ? "Enviando..." : "Enviar solicitud"}
        </button>
      </div>
    </form>
  );
}
