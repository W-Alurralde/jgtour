import { auth } from "@/config/firebase";

export interface CreateBookingInput {
  packageId: string;
  packageName: string;

  price: number;
  currency: string;

  origin: string;
  destination: string;

  departureDate: string;
  returnDate: string;

  fullName: string;
  email: string;
  phone?: string;
  travelers: number;
  notes?: string;
  requestId?: string;
}

/*
 * Estados que actualmente reconoce
 * Mi Viaje.
 */
export type BookingStatus = "pending" | "confirmed" | "paid" | "cancelled";

/*
 * Respuesta al crear una reserva.
 */
interface BookingResponse {
  success: boolean;
  simulation?: boolean;

  booking?: {
    id: string;
    status: string;
  };

  error?: string;
}

/*
 * Reserva recuperada desde Google Sheets
 * a través de Apps Script.
 */
export interface Booking {
  id: string;

  packageId: string;
  packageName: string;

  price: number;
  currency: string;

  origin: string;
  destination: string;

  departureDate: string;
  returnDate: string;

  fullName: string;
  email: string;
  phone?: string;

  travelers: number;
  notes?: string;

  status: BookingStatus;

  createdAt?: string;
}
/*
 * =====================================================
 * CREAR RESERVA
 * =====================================================
 */

export async function createBooking(
  data: CreateBookingInput,
): Promise<BookingResponse> {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("Debés iniciar sesión para solicitar una reserva");
  }

  const token = await user.getIdToken();

  const response = await fetch("/api/bookings/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ data }),
  });

  const result: BookingResponse = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.error || "No se pudo enviar la solicitud");
  }

  if (!result.booking?.id) {
    throw new Error("El servidor no devolvió una referencia de reserva");
  }

  return result;
}

/*
 * =====================================================
 * CONSULTAR RESERVA
 * =====================================================
 *
 * Consulta Apps Script utilizando el UUID
 * generado cuando se creó la reserva.
 *
 * Google Sheets queda como fuente del
 * estado actual de la operación.
 */

export async function getBookingById(
  bookingId: string,
): Promise<Pick<Booking, "id" | "status">> {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("Debés iniciar sesión para consultar tu reserva");
  }

  const id = bookingId.trim();

  if (!id) {
    throw new Error("Falta el ID de la reserva");
  }

  const token = await user.getIdToken();

  const response = await fetch("/api/bookings/status", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ bookingId: id }),
    cache: "no-store",
  });

  const result: {
    success: boolean;
    booking?: Pick<Booking, "id" | "status">;
    error?: string;
  } = await response.json();

  if (!response.ok || !result.success || !result.booking) {
    throw new Error(result.error || "No se pudo consultar la reserva");
  }

  return result.booking;
}

/*
 * =====================================================
 * MIS RESERVAS
 * =====================================================
 */

export type MyBooking = Pick<
  Booking,
  | "id"
  | "packageId"
  | "packageName"
  | "price"
  | "currency"
  | "origin"
  | "destination"
  | "departureDate"
  | "returnDate"
  | "status"
  | "createdAt"
>;

export async function getMyBookings(): Promise<MyBooking[]> {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("Debés iniciar sesión para consultar tus reservas");
  }

  const token = await user.getIdToken();

  const response = await fetch("/api/bookings/mine", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  const result: {
    success: boolean;
    bookings?: MyBooking[];
    error?: string;
  } = await response.json();

  if (!response.ok || !result.success || !Array.isArray(result.bookings)) {
    throw new Error(result.error || "No se pudieron recuperar tus reservas");
  }

  return result.bookings;
}
