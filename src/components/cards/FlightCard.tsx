import { useState } from "react";

import FlightRequestModal
  from "../forms/FlightRequestModal";

import "./FlightCard.css";


interface Flight {
  id: string;

  airline: string;
  airline_name?: string;

  flight_number: number;

  origin: string;
  destination: string;

  departure_date: string;
  departure_time: string;

  arrival_date?: string;
  arrival_time: string;

  duration: string;

  stops: number;

  fare_family: string;

  price: number;
  currency: string;
}


interface SearchDetails {
  adults: number;
  children: number;
  infants: number;
  pets: number;

  cabinClass: string;

  needsAssistance: boolean;

  assistanceType: string;

  voucher?: string;
}


interface FlightCardProps {
  flight: Flight;

  searchDetails: SearchDetails;
}


export default function FlightCard({
  flight,
  searchDetails,
}: FlightCardProps) {

  const [
    showRequestModal,
    setShowRequestModal,
  ] = useState(false);


  // =========================================
  // PRECIO
  // =========================================

  const formattedPrice =
    new Intl.NumberFormat(
      "es-AR",
      {
        style: "currency",
        currency:
          flight.currency,
        minimumFractionDigits: 2,
      }
    ).format(
      flight.price
    );


  // =========================================
  // FECHA
  // =========================================

  const formattedDate =
    new Intl.DateTimeFormat(
      "es-AR",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
        timeZone: "UTC",
      }
    ).format(
      new Date(
        `${flight.departure_date}T00:00:00Z`
      )
    );


  // =========================================
  // RENDER
  // =========================================

  return (
    <>

      <article className="flight-card">

        {/* =====================================
            CABECERA
        ====================================== */}

        <div className="flight-card__header">

          <div className="flight-card__airline">

            <img
              src="/image/joy.jpg"
              alt="Logo de JOY"
              className="flight-card__logo"
            />

            <div>

              <strong>
                {flight.airline_name ||
                  flight.airline}
              </strong>

              <span>
                {flight.airline}
                {" "}
                {flight.flight_number}
              </span>

            </div>

          </div>


          <span className="flight-card__fare">
            {flight.fare_family}
          </span>

        </div>


        {/* =====================================
            FECHA
        ====================================== */}

        <div className="flight-card__date">
          {formattedDate}
        </div>


        {/* =====================================
            RUTA
        ====================================== */}

        <div className="flight-card__route">


          {/* SALIDA */}

          <div className="flight-card__airport">

            <strong>
              {flight.departure_time}
            </strong>

            <span>
              {flight.origin}
            </span>

          </div>


          {/* TRAYECTO */}

          <div className="flight-card__journey">

            <span className="flight-card__duration">
              {flight.duration}
            </span>

            <div className="flight-card__line">
              <span />
            </div>

            <span className="flight-card__stops">

              {flight.stops === 0
                ? "Directo"
                : `${flight.stops} escala${
                    flight.stops !== 1
                      ? "s"
                      : ""
                  }`}

            </span>

          </div>


          {/* LLEGADA */}

          <div className="flight-card__airport">

            <strong>
              {flight.arrival_time}
            </strong>

            <span>
              {flight.destination}
            </span>

          </div>

        </div>


        {/* =====================================
            FOOTER
        ====================================== */}

        <div className="flight-card__footer">

          <div className="flight-card__price">

            <span>
              Precio de referencia
            </span>

            <strong>
              {formattedPrice}
            </strong>

            <small>
              Tarifa y disponibilidad sujetas
              a confirmación por JGTravel.
            </small>

          </div>


          <button
            type="button"
            className="flight-card__button"
            onClick={() =>
              setShowRequestModal(
                true
              )
            }
          >
            Solicitar vuelo
          </button>

        </div>

      </article>


      {/* =====================================
          MODAL DE SOLICITUD
      ====================================== */}

      {showRequestModal && (

        <FlightRequestModal
          flight={flight}

          adults={
            searchDetails.adults
          }

          children={
            searchDetails.children
          }

          infants={
            searchDetails.infants
          }

          pets={
            searchDetails.pets
          }

          cabinClass={
            searchDetails.cabinClass
          }

          needsAssistance={
            searchDetails.needsAssistance
          }

          assistanceType={
            searchDetails.assistanceType
          }

          voucher={
            searchDetails.voucher
          }

          onClose={() =>
            setShowRequestModal(
              false
            )
          }
        />

      )}

    </>
  );
}