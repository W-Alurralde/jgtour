import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  hotelSearchSchema,
  type HotelSearchFormData,
} from "../schemas/hotelSearch.schema";

import { useHotelSearch } from "../hooks/useHotelSearch";
import HotelResults from "./HotelResults";

export default function HotelSearchForm() {
  const [searchParams, setSearchParams] = useState<
    HotelSearchFormData | undefined
  >();

  const { register, handleSubmit } = useForm<HotelSearchFormData>({
    resolver: zodResolver(hotelSearchSchema),
    defaultValues: {
      city: "Salta",
      checkIn: "2026-08-05",
      checkOut: "2026-08-10",
      guests: 2,
    },
  });

  const { data: hotels = [], isLoading } = useHotelSearch(searchParams);

  const onSubmit = (data: HotelSearchFormData) => {
    setSearchParams(data);
  };

  return (
    <section style={{ display: "grid", gap: 24 }}>
      <h2>Buscar hoteles 🏨</h2>

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
        <input placeholder="Ciudad" {...register("city")} />
        <input type="date" {...register("checkIn")} />
        <input type="date" {...register("checkOut")} />
        <input
          type="number"
          min={1}
          max={10}
          {...register("guests", { valueAsNumber: true })}
        />
        <button type="submit">Buscar hoteles</button>
      </form>

      {isLoading ? (
        <p>Buscando hoteles...</p>
      ) : (
        <HotelResults hotels={hotels} />
      )}
    </section>
  );
}
