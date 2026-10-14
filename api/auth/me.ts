
import type {
  VercelRequest,
  VercelResponse,
} from "@vercel/node";

import { getFirebaseAdminAuth } from "../_lib/firebaseAdmin.js";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "GET") {
    return res.status(405).json({
      success: false,
      error: "Metodo no permitido",
    });
  }

  const authorization = req.headers.authorization;

  if (
    typeof authorization !== "string" ||
    !authorization.startsWith("Bearer ")
  ) {
    return res.status(401).json({
      success: false,
      error: "Token de autenticacion requerido",
    });
  }

  const token = authorization.slice(7).trim();

  if (!token) {
    return res.status(401).json({
      success: false,
      error: "Token vacio",
    });
  }

  try {
    const decodedToken =
      await getFirebaseAdminAuth().verifyIdToken(token);

    return res.status(200).json({
      success: true,
      user: {
        uid: decodedToken.uid,
        email: decodedToken.email ?? null,
        emailVerified: decodedToken.email_verified ?? false,
      },
    });
  } catch (error) {
    console.error("Error verificando autenticacion:", error);

    return res.status(401).json({
      success: false,
      error: "Token invalido o no verificable",
    });
  }
}
