export type CancellationReasonCode =
  | "CHANGE_OF_PLANS"
  | "DATE_CHANGE"
  | "PRICE"
  | "DUPLICATE"
  | "PERSONAL_REASON"
  | "OTHER";

export type CancellationStatus =
  | "requested"
  | "approved"
  | "rejected";

export interface CreateCancellationInput {
  bookingId: string;

  itemId: string;

  itemType:
    | "flight"
    | "hotel"
    | "car"
    | "bus"
    | "cruise"
    | "disney"
    | "restaurant"
    | "experience"
    | "package";

  reasonCode: CancellationReasonCode;

  reasonDetail?: string;
}

export interface Cancellation {
  id: string;

  bookingId: string;

  itemId: string;

  itemType: string;

  reasonCode: CancellationReasonCode;

  reasonDetail?: string;

  bookingStatusBefore: string;

  status: CancellationStatus;

  createdAt: string;
}

interface CreateCancellationResponse {
  success: boolean;

  cancellation?: Cancellation;

  error?: string;
}

const API_URL =
  import.meta.env.VITE_PACKAGES_API_URL;

/*
 * =====================================================
 * CREAR SOLICITUD DE CANCELACIÓN
 * =====================================================
 *
 * Registra una solicitud en la hoja
 * Cancellations.
 *
 * IMPORTANTE:
 * solicitar una cancelación NO significa
 * que la reserva ya esté cancelada.
 *
 * cancellation.status = requested
 */
export async function createCancellation(
  data: CreateCancellationInput
): Promise<Cancellation> {
  if (!API_URL) {
    throw new Error(
      "Falta la variable VITE_PACKAGES_API_URL"
    );
  }

  if (!data.bookingId.trim()) {
    throw new Error(
      "Falta el ID de la reserva"
    );
  }

  if (!data.itemId.trim()) {
    throw new Error(
      "Falta el ID del servicio"
    );
  }

  if (!data.reasonCode) {
    throw new Error(
      "Seleccioná un motivo de cancelación"
    );
  }

  const response = await fetch(API_URL, {
    method: "POST",

    headers: {
      "Content-Type":
        "text/plain;charset=utf-8",
    },

    body: JSON.stringify({
      action: "createCancellation",

      data: {
        bookingId:
          data.bookingId.trim(),

        itemId:
          data.itemId.trim(),

        itemType:
          data.itemType,

        reasonCode:
          data.reasonCode,

        reasonDetail:
          data.reasonDetail?.trim() || "",
      },
    }),
  });

  if (!response.ok) {
    throw new Error(
      `Error solicitando cancelación: ${response.status}`
    );
  }

  const result: CreateCancellationResponse =
    await response.json();

  if (
    !result.success ||
    !result.cancellation
  ) {
    throw new Error(
      result.error ||
        "No se pudo registrar la solicitud de cancelación"
    );
  }

  return result.cancellation;
}

/*
 * =====================================================
 * MOTIVOS DISPONIBLES
 * =====================================================
 *
 * Guardamos códigos estables en Google Sheets
 * y mostramos textos amigables al usuario.
 */

export const CANCELLATION_REASONS: Array<{
  value: CancellationReasonCode;
  label: string;
}> = [
  {
    value: "CHANGE_OF_PLANS",
    label: "Cambio de planes",
  },
  {
    value: "DATE_CHANGE",
    label: "Necesito cambiar las fechas",
  },
  {
    value: "PRICE",
    label: "Precio / presupuesto",
  },
  {
    value: "DUPLICATE",
    label: "Reserva duplicada",
  },
  {
    value: "PERSONAL_REASON",
    label: "Motivos personales",
  },
  {
    value: "OTHER",
    label: "Otro motivo",
  },
];