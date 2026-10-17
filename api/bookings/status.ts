
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getFirebaseAdminAuth } from "../_lib/firebaseAdmin.js";

const VALID_STATUSES = [
  "pending",
  "confirmed",
  "paid",
  "cancelled",
];

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      error: "Método no permitido",
    });
  }

  try {
    const authorization = req.headers.authorization;

    if (
      typeof authorization !== "string" ||
      !authorization.startsWith("Bearer ")
    ) {
      return res.status(401).json({
        success: false,
        error: "Autenticación requerida",
      });
    }

    const token = authorization.slice(7).trim();

    const decoded = await getFirebaseAdminAuth().verifyIdToken(token);

    const bookingId = req.body?.bookingId;

    if (
      typeof bookingId !== "string" ||
      !bookingId.trim() ||
      bookingId.length > 128
    ) {
      return res.status(400).json({
        success: false,
        error: "Identificador de reserva inválido",
      });
    }

    const apiUrl = process.env.GOOGLE_APPS_SCRIPT_URL;
    const serverSecret = process.env.JGTRAVEL_API_SECRET;

    if (!apiUrl || !serverSecret) {
      return res.status(503).json({
        success: false,
        error: "Servicio de reservas no configurado",
      });
    }

    const gasResponse = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify({
        action: "getBookingStatusForUser",
        serverSecret,
        userId: decoded.uid,
        bookingId: bookingId.trim(),
      }),
      redirect: "follow",
      signal: AbortSignal.timeout(15000),
    });

    if (!gasResponse.ok) {
      throw new Error("GAS_STATUS_REQUEST_FAILED");
    }

    const result = await gasResponse.json();

    if (result.success !== true) {
      throw new Error("GAS_STATUS_INVALID_RESPONSE");
    }

    if (!result.found) {
      return res.status(404).json({
        success: false,
        error: "Reserva no encontrada",
      });
    }

    const booking = result.booking;

    if (
      !booking ||
      booking.id !== bookingId.trim() ||
      !VALID_STATUSES.includes(booking.status)
    ) {
      throw new Error("GAS_STATUS_INVALID_BOOKING");
    }

    return res.status(200).json({
      success: true,
      booking: {
        id: booking.id,
        status: booking.status,
      },
    });

  } catch (error) {
    console.error("Error consultando reserva:", error);

    return res.status(503).json({
      success: false,
      error: "No se pudo consultar el estado de la reserva",
    });
  }
}
