
import type {
  VercelRequest,
  VercelResponse,
} from "@vercel/node";

export default function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({
      success: false,
      error: "Método no permitido",
    });
  }

  return res.status(200).json({
    success: true,
    service: "JGTravel API",
    status: "online",
  });
}
