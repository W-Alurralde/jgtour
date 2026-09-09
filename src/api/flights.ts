import type {
  Flight,
  FlightsResponse,
  FlightRequest,
  FlightRequestData,
  FlightRequestResponse
} from "../types/flight";


const API_URL =
  "https://script.google.com/macros/s/AKfycbzbPwIsidrhLdsZM5kCDmsR1go0GXWwJlbUrlt83047PkEp2DLWf7dQHB5sKJLHMpvrgQ/exec";


// ======================================================
// OBTENER VUELOS
// ======================================================

export async function getFlights(): Promise<Flight[]> {

  const response =
    await fetch(
      `${API_URL}?action=flights`
    );


  if (!response.ok) {
    throw new Error(
      "No se pudieron obtener los vuelos"
    );
  }


  const data: FlightsResponse =
    await response.json();


  if (!data.success) {
    throw new Error(
      data.error ||
      "Error al obtener los vuelos"
    );
  }


  return data.flights;
}


// ======================================================
// CREAR SOLICITUD DE VUELO
// ======================================================

export async function createFlightRequest(
  requestData: FlightRequestData
): Promise<FlightRequest> {

  const response =
    await fetch(API_URL, {

      method: "POST",

      headers: {
        /*
         * text/plain evita un preflight CORS innecesario
         * con Google Apps Script.
         *
         * El contenido sigue siendo JSON y nuestro GAS
         * lo interpreta mediante JSON.parse().
         */
        "Content-Type":
          "text/plain;charset=utf-8"
      },

      body: JSON.stringify({

        action:
          "createFlightRequest",

        data:
          requestData

      })

    });


  if (!response.ok) {

    throw new Error(
      "No se pudo enviar la solicitud de vuelo"
    );

  }


  const data: FlightRequestResponse =
    await response.json();


  if (!data.success || !data.request) {

    throw new Error(
      data.error ||
      "No se pudo crear la solicitud"
    );

  }


  return data.request;
}