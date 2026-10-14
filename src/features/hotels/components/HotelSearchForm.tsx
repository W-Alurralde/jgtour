import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  hotelSearchSchema,
  type HotelSearchFormData,
} from "../schemas/hotelSearch.schema";

import { useHotelSearch } from "../hooks/useHotelSearch";
import type { HotelSearchState } from "../types/hotelSearch.types";

export default function HotelSearchForm() {
  const { searchHotels } = useHotelSearch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<HotelSearchFormData>({
    resolver: zodResolver(hotelSearchSchema),
    defaultValues: {
      city: "Salta",
      checkIn: "",
      checkOut: "",
      guests: 2,
    },
  });

  const onSubmit = (data: HotelSearchFormData) => {
    const search: HotelSearchState = {
      destination: data.city.trim(),
      checkIn: data.checkIn,
      checkOut: data.checkOut,
      rooms: [
        {
          id: 1,
          adults: data.guests,
          children: 0,
        },
      ],
    };

    searchHotels(search);
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
        <div>
          <input
            aria-label="Ciudad de destino"
            placeholder="Ciudad"
            {...register("city")}
          />
          {errors.city && <p role="alert">{errors.city.message}</p>}
        </div>

        <div>
          <input
            aria-label="Fecha de entrada"
            type="date"
            {...register("checkIn")}
          />
          {errors.checkIn && <p role="alert">{errors.checkIn.message}</p>}
        </div>

        <div>
          <input
            aria-label="Fecha de salida"
            type="date"
            {...register("checkOut")}
          />
          {errors.checkOut && <p role="alert">{errors.checkOut.message}</p>}
        </div>

        <div>
          <input
            aria-label="Cantidad de huéspedes"
            type="number"
            min={1}
            max={10}
            {...register("guests", {
              valueAsNumber: true,
            })}
          />
          {errors.guests && <p role="alert">{errors.guests.message}</p>}
        </div>

        <button type="submit">Buscar hoteles</button>
      </form>
    </section>
  );
}
