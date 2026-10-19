
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getFirebaseAdminAuth } from "../_lib/firebaseAdmin.js";

const VALID_STATUSES = [
  "pending",
  "confirmed",
  "paid",
  "cancelled",
] as const;

interface UserBooking {
  id: string;
  packageId: string;
  packageName: string;
  price: number;
  currency: string;
  origin: string;
  destination: string;
  departureDate: string;
  returnDate: string;
  status: string;
  createdAt: string;
}

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

  let uid: string;

  try {
    const token = authorization.slice(7).trim();
    const decoded = await getFirebaseAdminAuth().verifyIdToken(token);
    uid = decoded.uid;
  } catch {
    return res.status(401).json({
      success: false,
      error: "Sesión inválida o vencida",
    });
  }

  try {
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
        action: "getBookingsForUser",
        serverSecret,
        userId: uid,
      }),
      redirect: "follow",
      signal: AbortSignal.timeout(15000),
    });

    if (!gasResponse.ok) {
      throw new Error("GAS_BOOKINGS_REQUEST_FAILED");
    }

    const result = await gasResponse.json();

    if (
      result.success !== true ||
      !Array.isArray(result.bookings)
    ) {
      throw new Error("GAS_BOOKINGS_INVALID_RESPONSE");
    }

    const bookings: UserBooking[] = result.bookings.map(
      (booking: UserBooking) => {
        if (
          !booking ||
          typeof booking.id !== "string" ||
          !booking.id.trim() ||
          !VALID_STATUSES.some(
            (status) => status === booking.status
          )
        ) {
          throw new Error("GAS_BOOKINGS_INVALID_BOOKING");
        }

        return {
          id: booking.id,
          packageId: booking.packageId,
          packageName: booking.packageName,
          price: booking.price,
          currency: booking.currency,
          origin: booking.origin,
          destination: booking.destination,
          departureDate: booking.departureDate,
          returnDate: booking.returnDate,
          status: booking.status,
          createdAt: booking.createdAt,
        };
      }
    );

    return res.status(200).json({
      success: true,
      bookings,
    });
  } catch (error) {
    console.error("Error recuperando reservas:", error);

    return res.status(503).json({
      success: false,
      error: "No se pudieron recuperar las reservas",
    });
  }
}
