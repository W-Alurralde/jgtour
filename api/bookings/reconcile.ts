
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getFirebaseAdminAuth, getFirebaseAdminDb } from "../_lib/firebaseAdmin.js";
import {
  completeBookingRequest,
  type BookingRequestRecord,
} from "../_lib/bookingIdempotency.js";

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

  try {
    const token = authorization.slice(7).trim();

    const decoded = await getFirebaseAdminAuth().verifyIdToken(token);
    const userId = decoded.uid;

    const requestId = String(req.body?.requestId || "").trim();

    if (
      !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
        requestId
      )
    ) {
      return res.status(400).json({
        success: false,
        error: "requestId inválido",
      });
    }

    const db = getFirebaseAdminDb();

    const ref = db
      .collection("bookingRequests")
      .doc(`${userId}_${requestId}`);

    const snapshot = await ref.get();

    if (!snapshot.exists) {
      return res.status(404).json({
        success: false,
        error: "Solicitud no encontrada",
      });
    }

    const record = snapshot.data() as BookingRequestRecord;

    if (record.userId !== userId || record.requestId !== requestId) {
      return res.status(403).json({
        success: false,
        error: "Acceso no autorizado",
      });
    }

    if (record.status === "completed" && record.bookingId) {
      return res.status(200).json({
        success: true,
        status: "completed",
        bookingId: record.bookingId,
      });
    }

    const apiUrl = process.env.GOOGLE_APPS_SCRIPT_URL;
    const serverSecret = process.env.JGTRAVEL_API_SECRET;

    if (!apiUrl || !serverSecret) {
      return res.status(503).json({
        success: false,
        error: "Servicio de conciliación no disponible",
      });
    }

    const gasResponse = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify({
        action: "findBookingByRequestId",
        serverSecret,
        userId,
        requestId,
      }),
      redirect: "follow",
      signal: AbortSignal.timeout(15000),
    });

    if (!gasResponse.ok) {
      throw new Error("GAS_RECONCILIATION_FAILED");
    }

    const result = await gasResponse.json();

    if (!result.success) {
      throw new Error("GAS_RECONCILIATION_INVALID_RESPONSE");
    }

    if (result.found && result.booking?.id) {
      const bookingId = String(result.booking.id);

      await completeBookingRequest(userId, requestId, bookingId);

      return res.status(200).json({
        success: true,
        status: "completed",
        bookingId,
      });
    }

    return res.status(202).json({
      success: false,
      status: record.status,
      uncertain: true,
      requestId,
      message:
        "La solicitud continúa pendiente de verificación. No generes una nueva reserva.",
    });

  } catch (error) {
    console.error("Error de conciliación:", error);

    return res.status(503).json({
      success: false,
      error: "No se pudo verificar el estado de la reserva",
    });
  }
}
