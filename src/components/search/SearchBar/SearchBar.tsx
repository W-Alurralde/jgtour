import { useState } from "react";

import TravelersPopover from "./components/TravelersPopover";
import "./SearchBar.css";

import { useFlightSearch } from "@/features/flights/hooks/useFlightSearch";
import { useHotelSearch } from "@/features/hotels/hooks/useHotelSearch";

import type {
  AssistanceType,
  CabinClass,
  FlightSearchState,
} from "@/features/flights/types/flightSearch.types";

import type { HotelSearchState } from "@/features/hotels/types/hotelSearch.types";

import { searchCategories } from "./categories";


const airports = [
  {
    code: "AEP",
    city: "BUENOS AIRES",
    airport: "AEROPARQUE JORGE NEWBERY",
    country: "AR ARGENTINA",
  },
  {
    code: "COR",
    city: "CORDOBA",
    airport: "PAJAS BLANCAS",
    country: "AR ARGENTINA",
  },
  {
    code: "JUJ",
    city: "JUJUY",
    airport: "EL CADILLAL",
    country: "AR ARGENTINA",
  },
];


interface TravelersState {
  adults: number;
  children: number;
  infants: number;
  pets: number;

  cabinClass: CabinClass;

  needsAssistance: boolean;
  assistanceType: AssistanceType | "";
}


export default function SearchBar() {

  const [showTravelers, setShowTravelers] =
    useState(false);

  const [activeCategory, setActiveCategory] =
    useState("flights");


  // =========================================
  // VUELOS
  // =========================================

  const [tripType, setTripType] =
    useState<"oneway" | "roundtrip">("oneway");

  const [origin, setOrigin] =
    useState("");

  const [destination, setDestination] =
    useState("");

  const [checkIn, setCheckIn] =
    useState("");

  const [checkOut, setCheckOut] =
    useState("");

  const [voucher, setVoucher] =
    useState("");


  // =========================================
  // VIAJEROS
  // =========================================

  const [travelers, setTravelers] =
    useState<TravelersState>({
      adults: 1,
      children: 0,
      infants: 0,
      pets: 0,

      cabinClass: "economy",

      needsAssistance: false,
      assistanceType: "",
    });


  const { searchFlights } =
    useFlightSearch();

  const { searchHotels } =
    useHotelSearch();


  // =========================================
  // RESUMEN DE VIAJEROS
  // =========================================

  const summaryParts = [
    `${travelers.adults} adulto${
      travelers.adults !== 1 ? "s" : ""
    }`,
  ];


  if (travelers.children > 0) {

    summaryParts.push(
      `${travelers.children} niño${
        travelers.children !== 1
          ? "s"
          : ""
      }`
    );

  }


  if (travelers.infants > 0) {

    summaryParts.push(
      `${travelers.infants} bebé${
        travelers.infants !== 1
          ? "s"
          : ""
      }`
    );

  }


  if (travelers.pets > 0) {

    summaryParts.push(
      `${travelers.pets} mascota${
        travelers.pets !== 1
          ? "s"
          : ""
      }`
    );

  }


  const cabinLabels: Record<
    CabinClass,
    string
  > = {
    economy: "Económica",
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


  summaryParts.push(
    cabinLabels[
      travelers.cabinClass
    ]
  );


  if (
    travelers.needsAssistance
  ) {

    summaryParts.push(
      "Asistencia"
    );

  }


  const summary =
    summaryParts.join(" · ");


  // =========================================
  // CAMBIO DE CATEGORÍA
  // =========================================

  const handleCategoryChange =
    (categoryId: string) => {

      setActiveCategory(
        categoryId
      );

      setShowTravelers(
        false
      );

    };


  // =========================================
  // TIPO DE VIAJE
  // =========================================

  const handleTripTypeChange =
    (
      type:
        | "oneway"
        | "roundtrip"
    ) => {

      setTripType(type);

      if (
        type === "oneway"
      ) {

        setCheckOut("");

      }

    };


  // =========================================
  // BUSCAR
  // =========================================

  const handleSearch = () => {

    // =========================================
    // VUELOS
    // =========================================

    if (
      activeCategory === "flights"
    ) {

      if (
        !origin ||
        !destination ||
        !checkIn
      ) {

        alert(
          "Completá origen, destino y fecha de ida."
        );

        return;

      }


      if (
        origin === destination
      ) {

        alert(
          "El origen y el destino no pueden ser iguales."
        );

        return;

      }


      if (
        tripType === "roundtrip" &&
        !checkOut
      ) {

        alert(
          "Seleccioná la fecha de regreso."
        );

        return;

      }


      if (
        tripType === "roundtrip" &&
        checkOut < checkIn
      ) {

        alert(
          "La fecha de regreso no puede ser anterior a la fecha de ida."
        );

        return;

      }


      if (
        travelers.needsAssistance &&
        !travelers.assistanceType
      ) {

        alert(
          "Seleccioná el tipo de asistencia requerida."
        );

        return;

      }


      const flightSearch:
        FlightSearchState = {

        tripType,

        origin:
          origin.toUpperCase(),

        destination:
          destination.toUpperCase(),

        departureDate:
          checkIn,

        returnDate:
          tripType ===
          "roundtrip"
            ? checkOut
            : undefined,


        // =====================================
        // PASAJEROS
        // =====================================

        passengers: {

          adults:
            travelers.adults,

          children:
            travelers.children,

          infants:
            travelers.infants,

          pets:
            travelers.pets,

        },


        // =====================================
        // CLASE
        // =====================================

        cabinClass:
          travelers.cabinClass,


        // =====================================
        // ASISTENCIA
        // =====================================

        assistance: {

          needed:
            travelers.needsAssistance,

          type:
            travelers.needsAssistance &&
            travelers.assistanceType
              ? travelers.assistanceType
              : undefined,

        },


        // =====================================
        // VOUCHER
        // =====================================

        voucher:
          voucher.trim() ||
          undefined,

      };


      searchFlights(
        flightSearch
      );

      return;

    }


    // =========================================
    // HOTELES
    // =========================================

    if (
      activeCategory === "hotels"
    ) {

      if (
        !destination ||
        !checkIn ||
        !checkOut
      ) {

        alert(
          "Completá destino, check-in y check-out."
        );

        return;

      }


      if (
        checkOut <= checkIn
      ) {

        alert(
          "El check-out debe ser posterior al check-in."
        );

        return;

      }


      const hotelSearch:
        HotelSearchState = {

        destination,

        checkIn,

        checkOut,

        rooms: [
          {
            id: 1,

            adults:
              travelers.adults,

            children:
              travelers.children,
          },
        ],

        voucher:
          voucher.trim() ||
          undefined,

      };


      searchHotels(
        hotelSearch
      );

      return;

    }


    // =========================================
    // RESTO DE CATEGORÍAS
    // =========================================

    alert(
      `La categoría ${activeCategory} se conectará próximamente.`
    );

  };


  return (

    <div className="search-bar">

      {/* =========================================
          CATEGORÍAS
      ========================================= */}

      <div className="category-strip">

        {searchCategories.map(
          (category) => (

            <button
              key={
                category.id
              }
              type="button"
              className={`category-pill ${
                activeCategory ===
                category.id
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                handleCategoryChange(
                  category.id
                )
              }
            >

              <span className="category-icon">

                {category.id ===
                  "flights" &&
                  "✈"}

                {category.id ===
                  "hotels" &&
                  "⌂"}

                {category.id ===
                  "buses" &&
                  "▣"}

                {category.id ===
                  "cruises" &&
                  "≋"}

                {category.id ===
                  "food" &&
                  "◇"}

                {category.id ===
                  "cars" &&
                  "▱"}

                {category.id ===
                  "experiences" &&
                  "◆"}

                {category.id ===
                  "disney" &&
                  "D"}

              </span>

              {category.label}

            </button>

          )
        )}

      </div>


      {/* =========================================
          SEARCH PANEL
      ========================================= */}

      <div className="search-panel">

        {/* =========================================
            VUELOS
        ========================================= */}

        {activeCategory ===
          "flights" && (

          <>

            {/* TIPO DE VIAJE */}

            <div className="trip-type-selector">

              <label className="trip-type-option">

                <input
                  type="radio"
                  name="tripType"
                  value="oneway"
                  checked={
                    tripType ===
                    "oneway"
                  }
                  onChange={() =>
                    handleTripTypeChange(
                      "oneway"
                    )
                  }
                />

                <span className="trip-type-custom-radio" />

                <span>
                  Sólo ida
                </span>

              </label>


              <label className="trip-type-option">

                <input
                  type="radio"
                  name="tripType"
                  value="roundtrip"
                  checked={
                    tripType ===
                    "roundtrip"
                  }
                  onChange={() =>
                    handleTripTypeChange(
                      "roundtrip"
                    )
                  }
                />

                <span className="trip-type-custom-radio" />

                <span>
                  Ida y vuelta
                </span>

              </label>

            </div>


            {/* ORIGEN */}

            <div className="search-field">

              <label>
                Origen
              </label>

              <select
                value={origin}
                onChange={(
                  event
                ) =>
                  setOrigin(
                    event.target
                      .value
                  )
                }
              >

                <option value="">
                  Seleccionar origen
                </option>

                {airports.map(
                  (airport) => (

                    <option
                      key={
                        airport.code
                      }
                      value={
                        airport.code
                      }
                    >

                      {airport.code}
                      {" · "}
                      {airport.city}

                    </option>

                  )
                )}

              </select>

            </div>


            {/* DESTINO */}

            <div className="search-field">

              <label>
                Destino
              </label>

              <select
                value={
                  destination
                }
                onChange={(
                  event
                ) =>
                  setDestination(
                    event.target
                      .value
                  )
                }
              >

                <option value="">
                  Seleccionar destino
                </option>

                {airports
                  .filter(
                    (airport) =>
                      airport.code !==
                      origin
                  )
                  .map(
                    (airport) => (

                      <option
                        key={
                          airport.code
                        }
                        value={
                          airport.code
                        }
                      >

                        {
                          airport.code
                        }
                        {" · "}
                        {
                          airport.city
                        }

                      </option>

                    )
                  )}

              </select>

            </div>


            {/* IDA */}

            <div className="search-field">

              <label>
                Ida
              </label>

              <input
                type="date"
                value={checkIn}
                onChange={(
                  event
                ) =>
                  setCheckIn(
                    event.target
                      .value
                  )
                }
              />

            </div>


            {/* REGRESO */}

            <div
              className={`search-field ${
                tripType ===
                "oneway"
                  ? "search-field--disabled"
                  : ""
              }`}
            >

              <label>
                Regreso
              </label>

              <input
                type="date"
                value={
                  checkOut
                }
                disabled={
                  tripType ===
                  "oneway"
                }
                min={
                  checkIn ||
                  undefined
                }
                onChange={(
                  event
                ) =>
                  setCheckOut(
                    event.target
                      .value
                  )
                }
              />

            </div>

          </>

        )}


        {/* =========================================
            HOTELES
        ========================================= */}

        {activeCategory ===
          "hotels" && (

          <>

            <div className="search-field">

              <label>
                Destino
              </label>

              <input
                value={
                  destination
                }
                onChange={(
                  event
                ) =>
                  setDestination(
                    event.target
                      .value
                  )
                }
                placeholder="Ej. Salta, Argentina"
              />

            </div>


            <div className="search-field">

              <label>
                Check-in
              </label>

              <input
                type="date"
                value={
                  checkIn
                }
                onChange={(
                  event
                ) =>
                  setCheckIn(
                    event.target
                      .value
                  )
                }
              />

            </div>


            <div className="search-field">

              <label>
                Check-out
              </label>

              <input
                type="date"
                value={
                  checkOut
                }
                onChange={(
                  event
                ) =>
                  setCheckOut(
                    event.target
                      .value
                  )
                }
              />

            </div>

          </>

        )}


        {/* =========================================
            RESTO
        ========================================= */}

        {![
          "flights",
          "hotels",
        ].includes(
          activeCategory
        ) && (

          <>

            <div className="search-field">

              <label>
                Lugar
              </label>

              <input
                value={
                  destination
                }
                onChange={(
                  event
                ) =>
                  setDestination(
                    event.target
                      .value
                  )
                }
                placeholder="Salta, Argentina"
              />

            </div>


            <div className="search-field">

              <label>
                Desde
              </label>

              <input
                type="date"
                value={
                  checkIn
                }
                onChange={(
                  event
                ) =>
                  setCheckIn(
                    event.target
                      .value
                  )
                }
              />

            </div>


            <div className="search-field">

              <label>
                Hasta
              </label>

              <input
                type="date"
                value={
                  checkOut
                }
                onChange={(
                  event
                ) =>
                  setCheckOut(
                    event.target
                      .value
                  )
                }
              />

            </div>

          </>

        )}


        {/* =========================================
            VIAJEROS
        ========================================= */}

        <div className="search-field travelers-trigger-wrapper">

          <label>
            Viajeros y clase
          </label>

          <button
            type="button"
            className="travelers-trigger"
            onClick={() =>
              setShowTravelers(
                (previous) =>
                  !previous
              )
            }
          >
            {summary}
          </button>


          {showTravelers && (

            <TravelersPopover
              {...travelers}
              onChange={
                setTravelers
              }
              onApply={() =>
                setShowTravelers(
                  false
                )
              }
            />

          )}

        </div>


        {/* =========================================
            VOUCHER
        ========================================= */}

        <div className="search-field">

          <label>
            Voucher / Cupón
          </label>

          <input
            value={voucher}
            onChange={(
              event
            ) =>
              setVoucher(
                event.target
                  .value
              )
            }
            placeholder="Código opcional"
          />

        </div>


        {/* =========================================
            BUSCAR
        ========================================= */}

        <button
          className="search-submit"
          type="button"
          onClick={
            handleSearch
          }
          aria-label="Buscar"
        >

          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >

            <circle
              cx="11"
              cy="11"
              r="7"
            />

            <path
              d="m20 20-4-4"
            />

          </svg>

          <span>
            Buscar
          </span>

        </button>

      </div>

    </div>

  );
}