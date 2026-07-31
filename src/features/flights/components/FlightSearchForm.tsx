import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  flightSearchSchema,
  type FlightSearchFormData,
} from "../schemas/flightSearch.schema";

import { useFlightSearch } from "../hooks/useFlightSearch";
import FlightResults from "./FlightResults";

export default function FlightSearchForm() {
  const [searchParams, setSearchParams] = useState<
    FlightSearchFormData | undefined
  >();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FlightSearchFormData>({
    resolver: zodResolver(flightSearchSchema),
    defaultValues: {
      origin: "SLA",
      destination: "AEP",
      departureDate: "2026-08-05",
    },
  });

  const { data: flights = [], isLoading } = useFlightSearch(searchParams);

  const onSubmit = (data: FlightSearchFormData) => {
    setSearchParams(data);
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
        <input
          placeholder="Origen (SLA)"
          {...register("origin")}
          style={{ padding: 12, borderRadius: 8, border: "1px solid #cbd5e1" }}
        />

        <input
          placeholder="Destino (AEP)"
          {...register("destination")}
          style={{ padding: 12, borderRadius: 8, border: "1px solid #cbd5e1" }}
        />

        <input
          type="date"
          {...register("departureDate")}
          style={{ padding: 12, borderRadius: 8, border: "1px solid #cbd5e1" }}
        />

        <button
          type="submit"
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

      {isLoading ? (
        <p>Buscando vuelos...</p>
      ) : (
        <FlightResults flights={flights} />
      )}
    </section>
  );
}
