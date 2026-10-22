
import type { TravelPayoutsOffer } from "../services/travelPayoutsOffersService";
import "../../../components/cards/FlightCard.css";

interface Props {
  offer: TravelPayoutsOffer;
}

export default function TravelPayoutsOfferCard({ offer }: Props) {
  const departure = new Date(offer.departure_at);
  const validDate = !Number.isNaN(departure.getTime());

  const date = validDate
    ? new Intl.DateTimeFormat("es-AR", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        timeZone: "UTC",
      }).format(departure)
    : "Fecha por confirmar";

  const departureTime = validDate
    ? new Intl.DateTimeFormat("es-AR", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "America/Argentina/Buenos_Aires",
      }).format(departure)
    : "--:--";

  const duration =
    Number.isFinite(offer.duration) && offer.duration > 0
      ? `${Math.floor(offer.duration / 60)} h ${offer.duration % 60} min`
      : "Duración por confirmar";

  const stops =
    offer.transfers === 0
      ? "Directo"
      : `${offer.transfers} escala${offer.transfers === 1 ? "" : "s"}`;

  const price = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(offer.price);

  const airlineCode = offer.airline?.trim().toUpperCase() || "—";

  return (
    <article className="flight-card">
      <div className="flight-card__header">
        <div className="flight-card__airline">
          <div className="travelpayouts-airline-logo">
            {airlineCode}
          </div>

          <div>
            <strong>Aerolínea {airlineCode}</strong>
            <span>Vuelo {offer.flight_number}</span>
          </div>
        </div>

        <span className="flight-card__fare">
          Oferta externa
        </span>
      </div>

      <div className="flight-card__date">{date}</div>

      <div className="flight-card__route">
        <div className="flight-card__airport">
          <strong>{departureTime}</strong>
          <span>{offer.origin_airport || offer.origin}</span>
        </div>

        <div className="flight-card__journey">
          <span className="flight-card__duration">{duration}</span>

          <div className="flight-card__line">
            <span />
          </div>

          <span className="flight-card__stops">{stops}</span>
        </div>

        <div className="flight-card__airport">
          <strong>--:--</strong>
          <span>{offer.destination_airport || offer.destination}</span>
        </div>
      </div>

      <div className="flight-card__footer">
        <div className="flight-card__price">
          <span>Precio de referencia</span>
          <strong>{price}</strong>
          <small>
            Precio orientativo sujeto a cambios.
            Disponibilidad y tarifa final por confirmar.
          </small>
        </div>

        <span className="travelpayouts-provider">
          Proveedor: {offer.gate || "Travelpayouts"}
        </span>
      </div>
    </article>
  );
}
