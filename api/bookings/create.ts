import type { VercelRequest, VercelResponse } from "@vercel/node";
import {
  claimBookingRequest,
  completeBookingRequest,
  hashBookingPayload,
  markBookingRequestUncertain,
} from "../_lib/bookingIdempotency.js";

type BookingInput = {
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
  requestId: string;
};

type CatalogPackage = Record<string, unknown>;

function requiredString(value: unknown, max = 200): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

function isValidDate(value: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(value));
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
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
      error: "Debés iniciar sesión para reservar",
    });
  }

  const token = authorization.slice(7).trim();

  if (!token) {
    return res.status(401).json({
      success: false,
      error: "Token de autenticación requerido",
    });
  }

  try {
    const { getFirebaseAdminAuth } = await import("../_lib/firebaseAdmin.js");

    const decoded = await getFirebaseAdminAuth().verifyIdToken(token);

    const userId = decoded.uid;

    const raw = req.body?.data ?? req.body;

    if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
      return res.status(400).json({
        success: false,
        error: "Datos de reserva inválidos",
      });
    }

    const data: BookingInput = {
      packageId: requiredString(raw.packageId, 100),
      packageName: requiredString(raw.packageName),
      price: Number(raw.price),
      currency: requiredString(raw.currency, 10),
      origin: requiredString(raw.origin),
      destination: requiredString(raw.destination),
      departureDate: requiredString(raw.departureDate, 20),
      returnDate: requiredString(raw.returnDate, 20),
      fullName: requiredString(raw.fullName),
      email: requiredString(raw.email, 254),
      phone: requiredString(raw.phone, 50),
      travelers: Number(raw.travelers),
      notes: requiredString(raw.notes, 1000),
      requestId: requiredString(raw.requestId, 100),
    };

    if (
      !data.packageId ||
      !data.fullName ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) ||
      !Number.isInteger(data.travelers) ||
      data.travelers < 1 ||
      data.travelers > 20 ||
      !isValidDate(data.departureDate) ||
      !isValidDate(data.returnDate) ||
      !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
        data.requestId,
      ) ||
      data.returnDate < data.departureDate
    ) {
      return res.status(400).json({
        success: false,
        error: "Revisá los datos de la reserva",
      });
    }

    const apiUrl = process.env.GOOGLE_APPS_SCRIPT_URL;
    const serverSecret = process.env.JGTRAVEL_API_SECRET;

    if (!apiUrl || !serverSecret) {
      console.error("Falta configuración privada de reservas");

      return res.status(503).json({
        success: false,
        error: "Servicio de reservas no disponible",
      });
    }

    // Consultar el catálogo desde el servidor.
    const catalogUrl = new URL(apiUrl);
    catalogUrl.searchParams.set("action", "packages");

    const catalogResponse = await fetch(catalogUrl.toString(), {
      method: "GET",
      redirect: "follow",
      signal: AbortSignal.timeout(15000),
    });

    if (!catalogResponse.ok) {
      throw new Error("No se pudo consultar el catálogo");
    }

    const catalogResult = await catalogResponse.json();

    if (!catalogResult.success || !Array.isArray(catalogResult.packages)) {
      throw new Error("Respuesta inválida del catálogo");
    }

    const selected = (catalogResult.packages as CatalogPackage[]).find(
      (item) =>
        String(item.id ?? item.packageId ?? "").trim() === data.packageId,
    );

    if (!selected) {
      return res.status(400).json({
        success: false,
        error: "El paquete ya no está disponible",
      });
    }

    // El precio debe proceder del catálogo, nunca del navegador.
    const catalogPrice = Number(selected.price);
    const catalogCurrency = requiredString(selected.currency, 10);

    if (
      !Number.isFinite(catalogPrice) ||
      catalogPrice <= 0 ||
      !catalogCurrency
    ) {
      console.error("Precio o moneda inválidos en el catálogo", data.packageId);

      return res.status(503).json({
        success: false,
        error: "No se pudo verificar el precio del paquete",
      });
    }

    if (
      data.price !== catalogPrice ||
      data.currency.toUpperCase() !== catalogCurrency.toUpperCase()
    ) {
      return res.status(409).json({
        success: false,
        error: "El precio cambió. Actualizá el paquete antes de reservar.",
      });
    }

    // Tomar los datos comerciales del catálogo.

    const bookingData = {
      ...data,

      packageName: requiredString(selected.name),

      price: catalogPrice,
      currency: catalogCurrency,

      origin: requiredString(selected.origin),
      destination: requiredString(selected.destination),

      departureDate: requiredString(selected.departureDate, 20),

      returnDate: requiredString(selected.returnDate, 20),

      userId,
    };

    const payloadHash = hashBookingPayload({
      ...bookingData,
      userId,
    });

    if (process.env.BOOKINGS_WRITE_ENABLED !== "true") {
      return res.status(200).json({
        success: true,
        simulation: true,
        booking: {
          id: "DEMO-BOOKING",
          status: "pending",
        },
      });
    }

    const claim = await claimBookingRequest(
      userId,
      data.requestId,
      payloadHash,
    );

    if (!claim.claimed) {
      if (claim.record.status === "completed") {
        return res.status(200).json({
          success: true,
          booking: {
            id: claim.record.bookingId,
            status: "pending",
          },
        });
      }

      return res.status(409).json({
        success: false,
        error:
          "Esta solicitud ya está en procesamiento. Consultá su estado antes de reintentar.",
      });
    }

    // A partir de este punto, GAS podría haber recibido
    // y registrado la solicitud, incluso si falla la red.

    try {
      const gasResponse = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify({
          action: "createBooking",
          serverSecret,
          data: bookingData,
        }),
        redirect: "follow",
        signal: AbortSignal.timeout(20000),
      });

      if (!gasResponse.ok) {
        throw new Error("GAS_RESPONSE_NOT_OK");
      }

      const result = await gasResponse.json();

      if (!result.success || !result.booking?.id) {
        throw new Error("GAS_RESULT_NOT_CONFIRMED");
      }

      const bookingId = String(result.booking.id);

      await completeBookingRequest(
        userId,
        data.requestId,
        bookingId
      );

      return res.status(201).json({
        success: true,
        booking: {
          id: bookingId,
          status: "pending",
        },
      });

    } catch (gasError) {
      console.error(
        "Resultado de reserva pendiente de conciliación:",
        gasError
      );

      try {
        await markBookingRequestUncertain(
          userId,
          data.requestId
        );
      } catch (markError) {
        console.error(
          "No se pudo marcar la solicitud como incierta:",
          markError
        );
      }

      return res.status(202).json({
        success: false,
        uncertain: true,
        error:
          "No pudimos confirmar el resultado de tu solicitud. No la envíes nuevamente; contactá a JGTravel con tu referencia de seguimiento.",
        requestId: data.requestId,
      });
    }

  } catch (error) {
    console.error("Error en creación de reserva:", error);

    return res.status(500).json({
      success: false,
      error: "No se pudo completar la reserva",
    });
  }
}
