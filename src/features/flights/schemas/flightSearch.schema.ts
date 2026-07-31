import { z } from "zod";

export const flightSearchSchema = z.object({
  origin: z.string().min(3, "Origen requerido"),
  destination: z.string().min(3, "Destino requerido"),
  departureDate: z.string().min(1, "Fecha requerida"),
});

export type FlightSearchFormData = z.infer<typeof flightSearchSchema>;