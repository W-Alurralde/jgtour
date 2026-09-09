import { useEffect, useMemo, useState } from "react";

import { useSearchParams } from "react-router-dom";

import { getFlights } from "../../api/flights";

import FlightCard from "../../components/cards/FlightCard";

import "./Flights.css";

// =========================================
// TIPO DE VUELO
// Se obtiene automáticamente desde getFlights()
// =========================================

type Flight = Awaited<ReturnType<typeof getFlights>>[number];

// =========================================
// ETIQUETAS DE CLASE
// =========================================

const cabinClassLabels: Record<string, string> = {
  economy: "Económica",
  "premium-economy": "Premium Economy",
  business: "Ejecutiva / Business",
  first: "Primera clase",
  "premium-business": "Premium Business",
  "premium-first": "Premium First",
};

// =========================================
// ETIQUETAS DE ASISTENCIA
// =========================================

const assistanceLabels: Record<string, string> = {
  wheelchair: "Silla de ruedas",
  "reduced-mobility": "Movilidad reducida",
  crutches: "Uso de muletas",
  "boarding-assistance": "Embarque / desembarque",
  "visual-assistance": "Asistencia visual",
  "hearing-assistance": "Asistencia auditiva",
  other: "Otra",
};

export default function Flights() {
  const [searchParams] = useSearchParams();

  const [flights, setFlights] = useState<Flight[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  // =========================================
  // PARÁMETROS DE BÚSQUEDA
  // =========================================

  const tripType = searchParams.get("tripType") || "oneway";

  const origin = (searchParams.get("origin") || "").toUpperCase();

  const destination = (searchParams.get("destination") || "").toUpperCase();

  const departureDate = searchParams.get("departureDate") || "";

  const returnDate = searchParams.get("returnDate") || "";

  // =========================================
  // VIAJEROS
  // =========================================

  const adults = Number(searchParams.get("adults") || 1);

  const children = Number(searchParams.get("children") || 0);

  const infants = Number(searchParams.get("infants") || 0);

  const pets = Number(searchParams.get("pets") || 0);

  // =========================================
  // CLASE
  // =========================================

  const cabinClass = searchParams.get("cabinClass") || "economy";

  // =========================================
  // ASISTENCIA
  // =========================================

  const needsAssistance = searchParams.get("needsAssistance") === "true";

  const assistanceType = searchParams.get("assistanceType") || "";

  // =========================================
  // VOUCHER
  // =========================================

  const voucher = searchParams.get("voucher") || "";

  // =========================================
  // CARGAR VUELOS
  // =========================================

  useEffect(() => {
    async function loadFlights() {
      try {
        setLoading(true);

        setError(null);

        const data = await getFlights();

        setFlights(data);
      } catch (err) {
        console.error(err);

        setError(err instanceof Error ? err.message : "Error al cargar vuelos");
      } finally {
        setLoading(false);
      }
    }

    loadFlights();
  }, []);

  // =========================================
  // FILTRAR RESULTADOS
  // =========================================

  const filteredFlights = useMemo(() => {
    return flights.filter((flight) => {
      const sameOrigin = !origin || flight.origin.toUpperCase() === origin;

      const sameDestination =
        !destination || flight.destination.toUpperCase() === destination;

      const sameDate =
        !departureDate || flight.departure_date === departureDate;

      return sameOrigin && sameDestination && sameDate;
    });
  }, [flights, origin, destination, departureDate]);

  // =========================================
  // RESUMEN DE VIAJEROS
  // =========================================

  const travelerParts: string[] = [];

  if (adults > 0) {
    travelerParts.push(`${adults} adulto${adults !== 1 ? "s" : ""}`);
  }

  if (children > 0) {
    travelerParts.push(`${children} niño${children !== 1 ? "s" : ""}`);
  }

  if (infants > 0) {
    travelerParts.push(`${infants} bebé${infants !== 1 ? "s" : ""}`);
  }

  if (pets > 0) {
    travelerParts.push(`${pets} mascota${pets !== 1 ? "s" : ""}`);
  }

  const travelersSummary = travelerParts.join(" · ");

  // =========================================
  // CLASE - TEXTO
  // =========================================

  const cabinClassLabel = cabinClassLabels[cabinClass] || cabinClass;

  // =========================================
  // ASISTENCIA - TEXTO
  // =========================================

  const assistanceLabel = assistanceType
    ? assistanceLabels[assistanceType] || assistanceType
    : "";

  // =========================================
  // LOADING
  // =========================================

  if (loading) {
    return (
      <main className="flights-page">
        <p className="flights-page__status">Buscando vuelos disponibles...</p>
      </main>
    );
  }

  // =========================================
  // ERROR
  // =========================================

  if (error) {
    return (
      <main className="flights-page">
        <div className="flights-page__error">
          <strong>No pudimos cargar los vuelos.</strong>

          <span>{error}</span>
        </div>
      </main>
    );
  }

  // =========================================
  // RENDER
  // =========================================

  return (
    <main className="flights-page">
      {/* =====================================
          HEADER
      ====================================== */}

      <header className="flights-page__header">
        <span className="flights-page__eyebrow">JGTravel · Vuelos</span>

        <h1>Vuelos disponibles</h1>

        <p>
          Consultá nuestras opciones de vuelo y solicitá la confirmación a
          JGTravel.
        </p>
      </header>

      {/* =====================================
          RESUMEN DE BÚSQUEDA
      ====================================== */}

      {(origin || destination) && (
        <section className="flights-page__search-summary">
          {/* RUTA */}

          <div>
            <span>Ruta</span>

            <strong>
              {origin || "—"}
              {" → "}
              {destination || "—"}
            </strong>
          </div>

          {/* IDA */}

          <div>
            <span>Ida</span>

            <strong>{departureDate || "—"}</strong>
          </div>

          {/* REGRESO */}

          {tripType === "roundtrip" && (
            <div>
              <span>Regreso</span>

              <strong>{returnDate || "—"}</strong>
            </div>
          )}

          {/* VIAJEROS */}

          <div>
            <span>Viajeros</span>

            <strong>{travelersSummary || "1 adulto"}</strong>
          </div>

          {/* CLASE */}

          <div>
            <span>Clase</span>

            <strong>{cabinClassLabel}</strong>
          </div>

          {/* ASISTENCIA */}

          {needsAssistance && (
            <div>
              <span>Asistencia</span>

              <strong>{assistanceLabel || "Solicitada"}</strong>
            </div>
          )}

          {/* VOUCHER */}

          {voucher && (
            <div>
              <span>Voucher</span>

              <strong>{voucher}</strong>
            </div>
          )}
        </section>
      )}

      {/* =====================================
          RESULTADOS
      ====================================== */}

      <section className="flights-page__results">
        {filteredFlights.length === 0 ? (
          <div className="flights-page__empty">
            <strong>No encontramos vuelos para esta búsqueda.</strong>

            <p>Probá con otra combinación de origen, destino o fecha.</p>
          </div>
        ) : (
          filteredFlights.map((flight) => (
            <FlightCard
              key={flight.id}
              flight={flight}
              searchDetails={{
                adults,
                children,
                infants,
                pets,

                cabinClass,

                needsAssistance,

                assistanceType,

                voucher: voucher || undefined,
              }}
            />
          ))
        )}
      </section>
    </main>
  );
}
