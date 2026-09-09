import { useNavigate } from "react-router-dom";
import type { FlightSearchState } from "../types/flightSearch.types";


export function useFlightSearch() {

  const navigate = useNavigate();


  const searchFlights = (
    search: FlightSearchState
  ) => {

    const params =
      new URLSearchParams();


    // =========================================
    // TIPO DE VIAJE
    // =========================================

    params.set(
      "tripType",
      search.tripType
    );


    // =========================================
    // RUTA
    // =========================================

    params.set(
      "origin",
      search.origin
    );

    params.set(
      "destination",
      search.destination
    );


    // =========================================
    // FECHAS
    // =========================================

    params.set(
      "departureDate",
      search.departureDate
    );


    if (search.returnDate) {

      params.set(
        "returnDate",
        search.returnDate
      );

    }


    // =========================================
    // PASAJEROS
    // =========================================

    params.set(
      "adults",
      String(
        search.passengers.adults
      )
    );

    params.set(
      "children",
      String(
        search.passengers.children
      )
    );

    params.set(
      "infants",
      String(
        search.passengers.infants
      )
    );

    params.set(
      "pets",
      String(
        search.passengers.pets
      )
    );


    // =========================================
    // CLASE
    // =========================================

    params.set(
      "cabinClass",
      search.cabinClass
    );


    // =========================================
    // ASISTENCIA
    // =========================================

    params.set(
      "needsAssistance",
      String(
        search.assistance.needed
      )
    );


    if (
      search.assistance.needed &&
      search.assistance.type
    ) {

      params.set(
        "assistanceType",
        search.assistance.type
      );

    }


    // =========================================
    // VOUCHER
    // =========================================

    if (search.voucher) {

      params.set(
        "voucher",
        search.voucher
      );

    }


    // =========================================
    // NAVEGACIÓN
    // =========================================

    navigate(
      `/flights?${params.toString()}`
    );

  };


  return {
    searchFlights,
  };

}