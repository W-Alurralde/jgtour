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
}

/*
 * Estados que actualmente reconoce
 * Mi Viaje.
 */
export type BookingStatus =
  | "pending"
  | "confirmed"
  | "paid"
  | "cancelled";

/*
 * Respuesta al crear una reserva.
 */
interface BookingResponse {
  success: boolean;

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
 * Respuesta del endpoint:
 *
 * ?action=booking&id=...
 */
interface GetBookingResponse {
  success: boolean;

  booking?: Booking;

  error?: string;
}

const API_URL =
  import.meta.env.VITE_PACKAGES_API_URL;

/*
 * =====================================================
 * CREAR RESERVA
 * =====================================================
 */

export async function createBooking(
  data: CreateBookingInput
): Promise<BookingResponse> {
  if (!API_URL) {
    throw new Error(
      "Falta la variable VITE_PACKAGES_API_URL"
    );
  }

  const response = await fetch(API_URL, {
    method: "POST",

    headers: {
      "Content-Type":
        "text/plain;charset=utf-8",
    },

    body: JSON.stringify({
      action: "createBooking",
      data,
    }),
  });

  if (!response.ok) {
    throw new Error(
      `Error creando reserva: ${response.status}`
    );
  }

  const result: BookingResponse =
    await response.json();

  if (!result.success) {
    throw new Error(
      result.error ||
        "No se pudo crear la reserva"
    );
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
  bookingId: string
): Promise<Booking> {
  if (!API_URL) {
    throw new Error(
      "Falta la variable VITE_PACKAGES_API_URL"
    );
  }

  const id = bookingId.trim();

  if (!id) {
    throw new Error(
      "Falta el ID de la reserva"
    );
  }

  const url =
    `${API_URL}` +
    `?action=booking` +
    `&id=${encodeURIComponent(id)}`;

  const response =
    await fetch(url, {
      method: "GET",
      cache: "no-store",
    });

  if (!response.ok) {
    throw new Error(
      `Error consultando reserva: ${response.status}`
    );
  }

  const result: GetBookingResponse =
    await response.json();

  if (
    !result.success ||
    !result.booking
  ) {
    throw new Error(
      result.error ||
        "No se pudo consultar la reserva"
    );
  }

  return result.booking;
}