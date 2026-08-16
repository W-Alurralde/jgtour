import { useState } from "react";

import TravelersPopover from "./components/TravelersPopover";
import "./SearchBar.css";

import { useFlightSearch } from "@/features/flights/hooks/useFlightSearch";
import { useHotelSearch } from "@/features/hotels/hooks/useHotelSearch";

import type { FlightSearchState } from "@/features/flights/types/flightSearch.types";
import type { HotelSearchState } from "@/features/hotels/types/hotelSearch.types";

import { searchCategories } from "./categories";

export default function SearchBar() {
  const [showTravelers, setShowTravelers] = useState(false);

  const [activeCategory, setActiveCategory] = useState("flights");

  const [origin, setOrigin] = useState("SLA");
  const [destination, setDestination] = useState("AEP");

  const [checkIn, setCheckIn] = useState("2026-08-05");
  const [checkOut, setCheckOut] = useState("2026-08-15");

  const [voucher, setVoucher] = useState("");

  const [travelers, setTravelers] = useState({
    adults: 2,
    children: 1,
    pets: 1,
    cabinClass: "economy" as const,
  });

  const { searchFlights } = useFlightSearch();
  const { searchHotels } = useHotelSearch();

  const summary = `${travelers.adults} adultos · ${travelers.children} niño · ${travelers.pets} mascota · Económica`;

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);

    // Cerrar cualquier popover abierto
    setShowTravelers(false);
  };

  const handleSearch = () => {
    if (activeCategory === "flights") {
      if (!origin || !destination || !checkIn) {
        alert("Completá origen, destino y fecha de salida.");
        return;
      }

      if (checkOut < checkIn) {
        alert("La fecha de vuelta no puede ser anterior a la fecha de salida.");
        return;
      }

      const flightSearch: FlightSearchState = {
        tripType: "roundtrip",

        origin: origin.toUpperCase(),

        destination: destination.toUpperCase(),

        departureDate: checkIn,

        returnDate: checkOut,

        passengers: {
          adults: travelers.adults,
          children: travelers.children,
          infants: 0,
          pets: travelers.pets,
        },

        cabinClass: travelers.cabinClass,

        voucher: voucher.trim() || undefined,
      };

      searchFlights(flightSearch);

      return;
    }

    if (activeCategory === "hotels") {
      if (!destination || !checkIn || !checkOut) {
        alert("Completá destino, check-in y check-out.");
        return;
      }

      if (checkOut <= checkIn) {
        alert("El check-out debe ser posterior al check-in.");
        return;
      }

      const hotelSearch: HotelSearchState = {
        destination,

        checkIn,

        checkOut,

        rooms: [
          {
            id: 1,
            adults: travelers.adults,
            children: travelers.children,
          },
        ],

        voucher: voucher.trim() || undefined,
      };

      searchHotels(hotelSearch);

      return;
    }

    alert(
      `La categoría ${activeCategory} se conectará próximamente.`
    );
  };

  return (
    <div className="search-bar">

      {/* =========================
          CATEGORÍAS
      ========================== */}

      <div className="category-strip">
        {searchCategories.map((category) => (
          <button
            key={category.id}
            type="button"
            className={`category-pill ${
              activeCategory === category.id ? "active" : ""
            }`}
            onClick={() => handleCategoryChange(category.id)}
          >
            <span className="category-icon">
              {category.id === "flights" && "✈"}
              {category.id === "hotels" && "⌂"}
              {category.id === "buses" && "▣"}
              {category.id === "cruises" && "≋"}
              {category.id === "food" && "◇"}
              {category.id === "cars" && "▱"}
              {category.id === "experiences" && "◆"}
              {category.id === "disney" && "D"}
            </span>

            {category.label}
          </button>
        ))}
      </div>

      {/* =========================
          SEARCH PANEL
      ========================== */}

      <div className="search-panel">

        {/* VUELOS */}

        {activeCategory === "flights" && (
          <>
            <div className="search-field">
              <label>Origen</label>

              <input
                value={origin}
                onChange={(event) =>
                  setOrigin(event.target.value)
                }
                placeholder="Ej. SLA"
              />
            </div>

            <div className="search-field">
              <label>Destino</label>

              <input
                value={destination}
                onChange={(event) =>
                  setDestination(event.target.value)
                }
                placeholder="Ej. AEP"
              />
            </div>

            <div className="search-field">
              <label>Desde</label>

              <input
                type="date"
                value={checkIn}
                onChange={(event) =>
                  setCheckIn(event.target.value)
                }
              />
            </div>

            <div className="search-field">
              <label>Hasta</label>

              <input
                type="date"
                value={checkOut}
                onChange={(event) =>
                  setCheckOut(event.target.value)
                }
              />
            </div>
          </>
        )}

        {/* HOTELES */}

        {activeCategory === "hotels" && (
          <>
            <div className="search-field">
              <label>Destino</label>

              <input
                value={destination}
                onChange={(event) =>
                  setDestination(event.target.value)
                }
                placeholder="Ej. Salta, Argentina"
              />
            </div>

            <div className="search-field">
              <label>Check-in</label>

              <input
                type="date"
                value={checkIn}
                onChange={(event) =>
                  setCheckIn(event.target.value)
                }
              />
            </div>

            <div className="search-field">
              <label>Check-out</label>

              <input
                type="date"
                value={checkOut}
                onChange={(event) =>
                  setCheckOut(event.target.value)
                }
              />
            </div>
          </>
        )}

        {/* RESTO DE CATEGORÍAS */}

        {!["flights", "hotels"].includes(activeCategory) && (
          <>
            <div className="search-field">
              <label>Lugar</label>

              <input
                value={destination}
                onChange={(event) =>
                  setDestination(event.target.value)
                }
                placeholder="Salta, Argentina"
              />
            </div>

            <div className="search-field">
              <label>Desde</label>

              <input
                type="date"
                value={checkIn}
                onChange={(event) =>
                  setCheckIn(event.target.value)
                }
              />
            </div>

            <div className="search-field">
              <label>Hasta</label>

              <input
                type="date"
                value={checkOut}
                onChange={(event) =>
                  setCheckOut(event.target.value)
                }
              />
            </div>
          </>
        )}

        {/* VIAJEROS */}

        <div className="search-field travelers-trigger-wrapper">
          <label>Viajeros y clase</label>

          <button
            type="button"
            className="travelers-trigger"
            onClick={() =>
              setShowTravelers((previous) => !previous)
            }
          >
            {summary}
          </button>

          {showTravelers && (
            <TravelersPopover
              {...travelers}
              onChange={setTravelers}
              onApply={() => setShowTravelers(false)}
            />
          )}
        </div>

        {/* VOUCHER */}

        <div className="search-field">
          <label>Voucher / Cupón</label>

          <input
            value={voucher}
            onChange={(event) =>
              setVoucher(event.target.value)
            }
            placeholder="JGT2026"
          />
        </div>

        {/* BUSCAR */}

        <button
          className="search-submit"
          type="button"
          onClick={handleSearch}
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
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-4-4" />
          </svg>

          <span>Buscar</span>
        </button>

      </div>
    </div>
  );
}