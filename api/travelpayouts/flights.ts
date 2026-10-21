
import type { VercelRequest, VercelResponse } from "@vercel/node";

const TRAVELPAYOUTS_URL =
  "https://api.travelpayouts.com/aviasales/v3/prices_for_dates";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({
      success: false,
      error: "Método no permitido",
    });
  }

  const token = process.env.TRAVELPAYOUTS_API_TOKEN;

  if (!token) {
    return res.status(503).json({
      success: false,
      error: "Travelpayouts no está configurado",
    });
  }

  const origin = String(req.query.origin || "")
    .trim()
    .toUpperCase();

  const destination = String(req.query.destination || "")
    .trim()
    .toUpperCase();

  const departureDate = String(
    req.query.departureDate || ""
  ).trim();

  if (
    !/^[A-Z]{3}$/.test(origin) ||
    !/^[A-Z]{3}$/.test(destination) ||
    origin === destination
  ) {
    return res.status(400).json({
      success: false,
      error: "Origen o destino inválido",
    });
  }

  if (
    departureDate &&
    !/^\d{4}-\d{2}-\d{2}$/.test(departureDate)
  ) {
    return res.status(400).json({
      success: false,
      error: "Fecha inválida",
    });
  }

  const params = new URLSearchParams({
    origin,
    destination,
    currency: "usd",
    limit: "10",
    one_way: "true",
  });

  if (departureDate) {
    params.set("departure_at", departureDate);
  }

  try {
    const response = await fetch(
      `${TRAVELPAYOUTS_URL}?${params.toString()}`,
      {
        headers: {
          "X-Access-Token": token,
        },
        signal: AbortSignal.timeout(10000),
      }
    );

    if (!response.ok) {
      return res.status(502).json({
        success: false,
        error: "No se pudo consultar Travelpayouts",
      });
    }

    const result = await response.json();

    if (result.success !== true) {
      return res.status(502).json({
        success: false,
        error: "Travelpayouts rechazó la consulta",
      });
    }

    res.setHeader(
      "Cache-Control",
      "public, s-maxage=300, stale-while-revalidate=600"
    );

    return res.status(200).json({
      success: true,
      source: "travelpayouts",
      priceType: "reference",
      currency: result.currency || "usd",
      flights: Array.isArray(result.data)
        ? result.data
        : [],
    });
  } catch (error) {
    console.error("Travelpayouts API error:", error);

    return res.status(502).json({
      success: false,
      error: "Error de conexión con Travelpayouts",
    });
  }
}
