
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getFirebaseAdminAuth } from "../_lib/firebaseAdmin.js";

const REASONS = new Set([
  "CHANGE_OF_PLANS",
  "DATE_CHANGE",
  "PRICE",
  "DUPLICATE",
  "PERSONAL_REASON",
  "OTHER",
]);

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

    const data = req.body?.data;

    if (!data || typeof data !== "object") {
      return res.status(400).json({
        success: false,
        error: "Datos de cancelación inválidos",
      });
    }

    const bookingId =
      typeof data.bookingId === "string" ? data.bookingId.trim() : "";

    const itemId =
      typeof data.itemId === "string" ? data.itemId.trim() : "";

    const itemType =
      typeof data.itemType === "string" ? data.itemType.trim() : "";

    const reasonCode =
      typeof data.reasonCode === "string" ? data.reasonCode.trim() : "";

    const reasonDetail =
      typeof data.reasonDetail === "string"
        ? data.reasonDetail.trim()
        : "";

    const allowedItemTypes = new Set([
      "flight", "hotel", "car", "bus", "cruise",
      "disney", "restaurant", "experience", "package",
    ]);

    if (
      !bookingId ||
      bookingId.length > 128 ||
      !itemId ||
      itemId.length > 128 ||
      !allowedItemTypes.has(itemType) ||
      !REASONS.has(reasonCode) ||
      reasonDetail.length > 500
    ) {
      return res.status(400).json({
        success: false,
        error: "Datos de cancelación inválidos",
      });
    }

    const apiUrl = process.env.GOOGLE_APPS_SCRIPT_URL;
    const serverSecret = process.env.JGTRAVEL_API_SECRET;

    if (!apiUrl || !serverSecret) {
      return res.status(503).json({
        success: false,
        error: "Servicio de cancelaciones no configurado",
      });
    }

    const gasResponse = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify({
        action: "createCancellation",
        serverSecret,
        data: {
          bookingId,
          itemId,
          itemType,
          reasonCode,
          reasonDetail,
          userId: decoded.uid,
        },
      }),
      redirect: "follow",
      signal: AbortSignal.timeout(15000),
    });

    if (!gasResponse.ok) {
      throw new Error("GAS_CANCELLATION_REQUEST_FAILED");
    }

    const result = await gasResponse.json();

    if (result.success !== true || !result.cancellation?.id) {
      return res.status(422).json({
        success: false,
        error: result.error || "No se pudo registrar la cancelación",
      });
    }

    return res.status(201).json({
      success: true,
      cancellation: result.cancellation,
    });
  } catch (error) {
    console.error("Error de cancelación:", error);

    return res.status(503).json({
      success: false,
      error: "No se pudo verificar el resultado de la cancelación",
    });
  }
}
