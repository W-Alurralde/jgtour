import {
  useState,
} from "react";

import type {
  FormEvent,
} from "react";

import type {
  FlightRequest,
} from "../../types/flight";

import {
  createFlightRequest,
} from "../../api/flights";

import "./FlightRequestModal.css";


// =========================================
// TIPO DE VUELO
// =========================================

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


// =========================================
// PROPS
// =========================================

interface FlightRequestModalProps {

  flight: Flight;

  adults: number;
  children: number;
  infants: number;
  pets: number;

  cabinClass: string;

  needsAssistance: boolean;

  assistanceType: string;

  voucher?: string;

  onClose: () => void;
}


// =========================================
// ETIQUETAS DE CLASE
// =========================================

const cabinClassLabels: Record<string, string> = {

  economy:
    "Económica",

  "premium-economy":
    "Premium Economy",

  business:
    "Ejecutiva / Business",

  first:
    "Primera clase",

  "premium-business":
    "Premium Business",

  "premium-first":
    "Premium First",

};


// =========================================
// ETIQUETAS DE ASISTENCIA
// =========================================

const assistanceLabels: Record<string, string> = {

  wheelchair:
    "Silla de ruedas",

  "reduced-mobility":
    "Movilidad reducida",

  crutches:
    "Uso de muletas",

  "boarding-assistance":
    "Asistencia para embarque / desembarque",

  "visual-assistance":
    "Asistencia visual",

  "hearing-assistance":
    "Asistencia auditiva",

  other:
    "Otra",

};


export default function FlightRequestModal({

  flight,

  adults,

  children,

  infants,

  pets,

  cabinClass,

  needsAssistance,

  assistanceType,

  voucher,

  onClose,

}: FlightRequestModalProps) {


  // =========================================
  // DATOS DEL CLIENTE
  // =========================================

  const [
    customerName,
    setCustomerName,
  ] = useState("");


  const [
    customerEmail,
    setCustomerEmail,
  ] = useState("");


  const [
    customerPhone,
    setCustomerPhone,
  ] = useState("");


  const [
    additionalNotes,
    setAdditionalNotes,
  ] = useState("");


  // =========================================
  // ESTADO
  // =========================================

  const [
    loading,
    setLoading,
  ] = useState(false);


  const [
    error,
    setError,
  ] = useState<string | null>(
    null
  );


  const [
    result,
    setResult,
  ] = useState<FlightRequest | null>(
    null
  );


  // =========================================
  // TOTAL DE PASAJEROS
  // Mascotas NO cuentan como pasajeros.
  // =========================================

  const passengers =
    adults +
    children +
    infants;


  // =========================================
  // CLASE
  // =========================================

  const cabinClassLabel =
    cabinClassLabels[
      cabinClass
    ] || cabinClass;


  // =========================================
  // ASISTENCIA
  // =========================================

  const assistanceLabel =
    assistanceType
      ? (
          assistanceLabels[
            assistanceType
          ] ||
          assistanceType
        )
      : "Sin especificar";


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
      }
    ).format(
      flight.price
    );


  // =========================================
  // GENERAR NOTAS AUTOMÁTICAS
  // =========================================

  function buildRequestNotes() {

    const lines: string[] = [];


    // =====================================
    // VIAJEROS
    // =====================================

    lines.push(
      "DETALLE DE VIAJEROS"
    );

    lines.push("");

    lines.push(
      `Adultos (>12 años): ${adults}`
    );

    lines.push(
      `Niños (2 a 12 años): ${children}`
    );

    lines.push(
      `Bebés (<2 años): ${infants}`
    );

    lines.push(
      `Mascotas: ${pets}`
    );


    // =====================================
    // CLASE
    // =====================================

    lines.push("");

    lines.push(
      `Clase: ${cabinClassLabel}`
    );


    // =====================================
    // ASISTENCIA
    // =====================================

    lines.push("");

    lines.push(
      "ASISTENCIA ESPECIAL"
    );

    lines.push("");

    lines.push(
      `Requiere asistencia: ${
        needsAssistance
          ? "Sí"
          : "No"
      }`
    );


    if (
      needsAssistance
    ) {

      lines.push(
        `Tipo: ${assistanceLabel}`
      );

    }


    // =====================================
    // VOUCHER
    // =====================================

    if (voucher) {

      lines.push("");

      lines.push(
        "VOUCHER / CUPÓN"
      );

      lines.push("");

      lines.push(
        voucher
      );

    }


    // =====================================
    // OBSERVACIONES
    // =====================================

    lines.push("");

    lines.push(
      "OBSERVACIONES DEL CLIENTE"
    );

    lines.push("");

    lines.push(
      additionalNotes.trim()
        ? additionalNotes.trim()
        : "Sin observaciones adicionales."
    );


    return lines.join("\n");

  }


  // =========================================
  // ENVIAR SOLICITUD
  // =========================================

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {

    event.preventDefault();

    setError(null);


    // =====================================
    // VALIDACIONES
    // =====================================

    if (
      !customerName.trim()
    ) {

      setError(
        "Ingresá el nombre del pasajero."
      );

      return;

    }


    if (
      !customerEmail.trim()
    ) {

      setError(
        "Ingresá un correo electrónico."
      );

      return;

    }


    if (
      passengers < 1
    ) {

      setError(
        "Debe existir al menos un pasajero."
      );

      return;

    }


    try {

      setLoading(true);


      const request =
        await createFlightRequest({

          flight_id:
            flight.id,

          passengers,

          customer_name:
            customerName.trim(),

          customer_email:
            customerEmail.trim(),

          customer_phone:
            customerPhone.trim(),

          notes:
            buildRequestNotes(),

        });


      setResult(
        request
      );

    } catch (err) {

      console.error(err);


      setError(
        err instanceof Error
          ? err.message
          : "No pudimos enviar la solicitud."
      );

    } finally {

      setLoading(false);

    }

  }


  // ====================================================
  // SOLICITUD CREADA
  // ====================================================

  if (result) {

    return (

      <div className="flight-modal__overlay">

        <div className="flight-modal">


          <div className="flight-modal__success-icon">
            ✓
          </div>


          <h2>
            Solicitud recibida
          </h2>


          <p className="flight-modal__success-text">

            Tu solicitud fue enviada
            correctamente a JGTravel.

          </p>


          <div className="flight-modal__confirmation">


            <div>

              <span>
                Código
              </span>

              <strong>
                {result.request_id}
              </strong>

            </div>


            <div>

              <span>
                Vuelo
              </span>

              <strong>

                {result.airline}
                {" "}
                {result.flight_number}

              </strong>

            </div>


            <div>

              <span>
                Ruta
              </span>

              <strong>

                {result.origin}
                {" → "}
                {result.destination}

              </strong>

            </div>


            <div>

              <span>
                Salida
              </span>

              <strong>

                {result.departure_date}
                {" · "}
                {result.departure_time}

              </strong>

            </div>


            <div>

              <span>
                Pasajeros
              </span>

              <strong>
                {result.passengers}
              </strong>

            </div>


            <div>

              <span>
                Precio de referencia
              </span>

              <strong>

                {new Intl.NumberFormat(
                  "es-AR",
                  {
                    style:
                      "currency",

                    currency:
                      result.currency,
                  }
                ).format(
                  result.reference_price
                )}

              </strong>

            </div>

          </div>


          <div className="flight-modal__status">

            <span>
              Estado
            </span>

            <strong>
              Pendiente de confirmación
            </strong>

          </div>


          <p className="flight-modal__disclaimer">

            La tarifa y disponibilidad
            serán verificadas por JGTravel
            antes de confirmar la operación.

          </p>


          <button
            type="button"
            className="flight-modal__primary"
            onClick={onClose}
          >

            Finalizar

          </button>

        </div>

      </div>

    );

  }


  // ====================================================
  // FORMULARIO
  // ====================================================

  return (

    <div className="flight-modal__overlay">

      <div className="flight-modal">


        {/* =====================================
            CERRAR
        ====================================== */}

        <button
          type="button"
          className="flight-modal__close"
          onClick={onClose}
          aria-label="Cerrar"
        >
          ×
        </button>


        {/* =====================================
            HEADER
        ====================================== */}

        <div className="flight-modal__header">


          <img
            src="/image/joy.jpg"
            alt="JOY"
          />


          <div>

            <span>
              Solicitud de vuelo
            </span>


            <h2>

              {flight.origin}
              {" → "}
              {flight.destination}

            </h2>


            <p>

              {flight.airline_name ||
                flight.airline}

              {" · "}

              {flight.airline}
              {" "}
              {flight.flight_number}

            </p>

          </div>

        </div>


        {/* =====================================
            RESUMEN DEL VUELO
        ====================================== */}

        <div className="flight-modal__summary">


          <div>

            <span>
              Salida
            </span>

            <strong>
              {flight.departure_time}
            </strong>

            <small>
              {flight.departure_date}
            </small>

          </div>


          <div className="flight-modal__summary-route">

            <span>
              {flight.duration}
            </span>

            <div />

            <small>

              {flight.stops === 0
                ? "Directo"
                : `${flight.stops} escala${
                    flight.stops !== 1
                      ? "s"
                      : ""
                  }`}

            </small>

          </div>


          <div>

            <span>
              Llegada
            </span>

            <strong>
              {flight.arrival_time}
            </strong>

            <small>
              {flight.arrival_date || "—"}
            </small>

          </div>

        </div>


        {/* =====================================
            PRECIO
        ====================================== */}

        <div className="flight-modal__price">

          <span>
            Precio de referencia
          </span>

          <strong>
            {formattedPrice}
          </strong>

        </div>


        {/* =====================================
            DATOS DE LA BÚSQUEDA
        ====================================== */}

        <div className="flight-modal__confirmation">


          <div>

            <span>
              Adultos
            </span>

            <strong>
              {adults}
            </strong>

          </div>


          <div>

            <span>
              Niños
            </span>

            <strong>
              {children}
            </strong>

          </div>


          <div>

            <span>
              Bebés
            </span>

            <strong>
              {infants}
            </strong>

          </div>


          <div>

            <span>
              Mascotas
            </span>

            <strong>
              {pets}
            </strong>

          </div>


          <div>

            <span>
              Clase
            </span>

            <strong>
              {cabinClassLabel}
            </strong>

          </div>


          <div>

            <span>
              Asistencia
            </span>

            <strong>

              {needsAssistance
                ? assistanceLabel
                : "No"}

            </strong>

          </div>

        </div>


        {/* =====================================
            FORMULARIO
        ====================================== */}

        <form
          onSubmit={handleSubmit}
          className="flight-modal__form"
        >


          <label>

            Nombre y apellido *

            <input
              type="text"
              value={customerName}
              onChange={
                (event) =>
                  setCustomerName(
                    event.target.value
                  )
              }
              placeholder="Nombre completo"
            />

          </label>


          <label>

            Email *

            <input
              type="email"
              value={customerEmail}
              onChange={
                (event) =>
                  setCustomerEmail(
                    event.target.value
                  )
              }
              placeholder="nombre@email.com"
            />

          </label>


          <label>

            Teléfono

            <input
              type="tel"
              value={customerPhone}
              onChange={
                (event) =>
                  setCustomerPhone(
                    event.target.value
                  )
              }
              placeholder="+54 9 ..."
            />

          </label>


          {/* =====================================
              OBSERVACIONES
          ====================================== */}

          <label className="flight-modal__full">

            Observaciones adicionales

            <textarea
              rows={3}
              value={
                additionalNotes
              }
              onChange={
                (event) =>
                  setAdditionalNotes(
                    event.target.value
                  )
              }
              placeholder="Equipaje especial, preferencias, información adicional..."
            />

          </label>


          {/* =====================================
              ERROR
          ====================================== */}

          {error && (

            <div className="flight-modal__error">
              {error}
            </div>

          )}


          {/* =====================================
              AVISO
          ====================================== */}

          <div className="flight-modal__notice">

            <strong>
              Importante
            </strong>

            <p>

              Esta solicitud no representa
              una emisión ni una reserva aérea
              confirmada. JGTravel verificará
              disponibilidad y tarifa antes
              de confirmar.

            </p>

          </div>


          {/* =====================================
              ENVIAR
          ====================================== */}

          <button
            type="submit"
            className="flight-modal__primary"
            disabled={loading}
          >

            {loading
              ? "Enviando solicitud..."
              : "Enviar solicitud"}

          </button>

        </form>

      </div>

    </div>

  );

}