
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  flightSearchSchema,
  type FlightSearchFormData,
} from "../schemas/flightSearch.schema";

import { useFlightSearch } from "../hooks/useFlightSearch";

import type { FlightSearchState } from "../types/flightSearch.types";

export default function FlightSearchForm() {
  const { searchFlights } = useFlightSearch();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FlightSearchFormData>({
    resolver: zodResolver(flightSearchSchema),
    defaultValues: {
      origin: "SLA",
      destination: "AEP",
      departureDate: "",
    },
  });

  const onSubmit = (data: FlightSearchFormData) => {
    const search: FlightSearchState = {
      tripType: "oneway",

      origin: data.origin.trim().toUpperCase(),
      destination: data.destination.trim().toUpperCase(),

      departureDate: data.departureDate,

      passengers: {
        adults: 1,
        children: 0,
        infants: 0,
        pets: 0,
      },

      cabinClass: "economy",

      assistance: {
        needed: false,
      },

      voucher: "",
    };

    searchFlights(search);
  };

  return (
    <section style={{ display: "grid", gap: 24 }}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          display: "grid",
          gap: 12,
          padding: 24,
          borderRadius: 16,
          background: "#f8fafc",
          border: "1px solid #e2e8f0",
        }}
      >
        <div>
          <input
            aria-label="Aeropuerto de origen"
            placeholder="Origen (SLA)"
            {...register("origin")}
            style={{
              padding: 12,
              borderRadius: 8,
              border: "1px solid #cbd5e1",
            }}
          />
          {errors.origin && (
            <p role="alert">{errors.origin.message}</p>
          )}
        </div>

        <div>
          <input
            aria-label="Aeropuerto de destino"
            placeholder="Destino (AEP)"
            {...register("destination")}
            style={{
              padding: 12,
              borderRadius: 8,
              border: "1px solid #cbd5e1",
            }}
          />
          {errors.destination && (
            <p role="alert">{errors.destination.message}</p>
          )}
        </div>

        <div>
          <input
            aria-label="Fecha de salida"
            type="date"
            {...register("departureDate")}
            style={{
              padding: 12,
              borderRadius: 8,
              border: "1px solid #cbd5e1",
            }}
          />
          {errors.departureDate && (
            <p role="alert">{errors.departureDate.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            padding: "12px 20px",
            borderRadius: 8,
            border: "none",
            background: "#0057B8",
            color: "white",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Buscar vuelos
        </button>
      </form>
    </section>
  );
}
