import { useState } from "react";
import type {
  FlightSearchState,
  TripType,
  CabinClass,
} from "../types/flightSearch.types";

import "./FlightLinearForm.css";

const cabinOptions: { value: CabinClass; label: string }[] = [
  { value: "economy", label: "Económica" },
  { value: "premium-economy", label: "Premium Economy" },
  { value: "business", label: "Ejecutiva / Business" },
  { value: "first", label: "Primera clase" },
  { value: "premium-business", label: "Premium Business" },
  { value: "premium-first", label: "Premium Primera clase" },
];

export default function FlightLinearForm() {
  const [form, setForm] = useState<FlightSearchState>({
    tripType: "roundtrip",
    origin: "SLA",
    destination: "AEP",
    departureDate: "2026-08-05",
    returnDate: "2026-08-15",
    passengers: {
      adults: 2,
      children: 1,
      infants: 0,
    },
    cabinClass: "economy",
    voucher: "",
  });

  const updateField = <K extends keyof FlightSearchState>(
    key: K,
    value: FlightSearchState[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const updatePassengers = (
    key: keyof FlightSearchState["passengers"],
    value: number
  ) => {
    setForm((prev) => ({
      ...prev,
      passengers: {
        ...prev.passengers,
        [key]: Math.max(0, value),
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Buscar vuelos", form);
  };

  return (
    <form className="flight-search" onSubmit={handleSubmit}>
      <div className="flight-trip-type">
        <button
          type="button"
          className={form.tripType === "roundtrip" ? "active" : ""}
          onClick={() => updateField("tripType", "roundtrip")}
        >
          Ida y vuelta
        </button>

        <button
          type="button"
          className={form.tripType === "oneway" ? "active" : ""}
          onClick={() => updateField("tripType", "oneway")}
        >
          Solo ida
        </button>

        <button
          type="button"
          className={form.tripType === "multicity" ? "active" : ""}
          onClick={() => updateField("tripType", "multicity")}
        >
          Multidestino
        </button>
      </div>

      {form.tripType === "multicity" ? (
        <div className="flight-placeholder">
          🚧 Próximamente: búsqueda multidestino
        </div>
      ) : (
        <div className="flight-search-panel">
          <div className="flight-field">
            <label>Origen</label>
            <input
              value={form.origin}
              onChange={(e) => updateField("origin", e.target.value.toUpperCase())}
              placeholder="SLA"
            />
          </div>

          <div className="flight-field">
            <label>Destino</label>
            <input
              value={form.destination}
              onChange={(e) =>
                updateField("destination", e.target.value.toUpperCase())
              }
              placeholder="AEP"
            />
          </div>

          <div className="flight-field">
            <label>Fecha ida</label>
            <input
              type="date"
              value={form.departureDate}
              onChange={(e) => updateField("departureDate", e.target.value)}
            />
          </div>

          {form.tripType === "roundtrip" && (
            <div className="flight-field">
              <label>Fecha vuelta</label>
              <input
                type="date"
                value={form.returnDate}
                onChange={(e) => updateField("returnDate", e.target.value)}
              />
            </div>
          )}

          <div className="flight-field passengers-field">
            <label>Pasajeros</label>

            <div className="passenger-row">
              <span>Adultos</span>
              <div className="counter">
                <button
                  type="button"
                  onClick={() =>
                    updatePassengers("adults", form.passengers.adults - 1)
                  }
                >
                  −
                </button>
                <strong>{form.passengers.adults}</strong>
                <button
                  type="button"
                  onClick={() =>
                    updatePassengers("adults", form.passengers.adults + 1)
                  }
                >
                  +
                </button>
              </div>
            </div>

            <div className="passenger-row">
              <span>Menores</span>
              <div className="counter">
                <button
                  type="button"
                  onClick={() =>
                    updatePassengers("children", form.passengers.children - 1)
                  }
                >
                  −
                </button>
                <strong>{form.passengers.children}</strong>
                <button
                  type="button"
                  onClick={() =>
                    updatePassengers("children", form.passengers.children + 1)
                  }
                >
                  +
                </button>
              </div>
            </div>

            <div className="passenger-row">
              <span>Bebés</span>
              <div className="counter">
                <button
                  type="button"
                  onClick={() =>
                    updatePassengers("infants", form.passengers.infants - 1)
                  }
                >
                  −
                </button>
                <strong>{form.passengers.infants}</strong>
                <button
                  type="button"
                  onClick={() =>
                    updatePassengers("infants", form.passengers.infants + 1)
                  }
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div className="flight-field">
            <label>Clase</label>
            <select
              value={form.cabinClass}
              onChange={(e) =>
                updateField("cabinClass", e.target.value as CabinClass)
              }
            >
              {cabinOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flight-field">
            <label>Voucher / Cupón</label>
            <input
              value={form.voucher}
              onChange={(e) => updateField("voucher", e.target.value)}
              placeholder="JGT2026"
            />
          </div>

          <button className="flight-submit" type="submit">
            🔍 Buscar vuelos
          </button>
        </div>
      )}
    </form>
  );
}