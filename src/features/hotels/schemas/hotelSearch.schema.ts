import { z } from "zod";

export const hotelSearchSchema = z.object({
  city: z.string().min(2, "Ciudad requerida"),
  checkIn: z.string().min(1, "Check-in requerido"),
  checkOut: z.string().min(1, "Check-out requerido"),
  guests: z.number().min(1).max(10),
});

export type HotelSearchFormData = z.infer<typeof hotelSearchSchema>;