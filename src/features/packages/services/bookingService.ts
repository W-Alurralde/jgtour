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

interface BookingResponse {
  success: boolean;
  booking?: {
    id: string;
    status: string;
  };
  error?: string;
}

const API_URL =
  import.meta.env.VITE_PACKAGES_API_URL;

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
      "Content-Type": "text/plain;charset=utf-8",
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
      result.error || "No se pudo crear la reserva"
    );
  }

  return result;
}