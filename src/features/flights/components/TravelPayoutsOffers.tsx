
import { useEffect, useState } from "react";
import {
  getTravelPayoutsOffers,
  type TravelPayoutsOffer,
} from "../services/travelPayoutsOffersService";

interface Props {
  origin: string;
  destination: string;
  departureDate?: string;
}

export default function TravelPayoutsOffers({
  origin,
  destination,
  departureDate,
}: Props) {
  const [offers, setOffers] = useState<TravelPayoutsOffer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!origin || !destination) {
      setOffers([]);
      return;
    }

    let cancelled = false;

    async function loadOffers() {
      setLoading(true);
      setError(null);

      try {
        const result = await getTravelPayoutsOffers(
          origin,
          destination,
          departureDate
        );

        if (!cancelled) {
          setOffers(result.flights);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "No se pudieron cargar las ofertas"
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadOffers();

    return () => {
      cancelled = true;
    };
  }, [origin, destination, departureDate]);

  if (!origin || !destination) return null;

  return (
    <section className="flights-page__results">
      <h2>Ofertas de vuelos · Travelpayouts</h2>

      <p>
        Precios orientativos obtenidos de un proveedor externo.
        Sujetos a cambios y confirmación.
      </p>

      {loading && <p>Consultando ofertas...</p>}

      {error && <p role="alert">{error}</p>}

      {!loading && !error && offers.length === 0 && (
        <p>No encontramos ofertas de referencia para esta ruta.</p>
      )}

      {!loading && !error && offers.length > 0 && (
        <div className="travelpayouts-offers">
          {offers.map((offer, index) => (
            <article
              key={`${offer.flight_number}-${offer.departure_at}-${index}`}
              className="travelpayouts-offer"
            >
              <h3>
                {offer.origin_airport} → {offer.destination_airport}
              </h3>

              <p>
                Salida:{" "}
                {new Date(offer.departure_at).toLocaleString("es-AR")}
              </p>

              <p>
                Aerolínea: {offer.airline}
              </p>

              <p>
                Escalas: {offer.transfers}
              </p>

              <strong>Desde USD {offer.price}</strong>

              <p>
                Precio de referencia. Verificar tarifa y disponibilidad
                con el proveedor.
              </p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
