
import type { IncomingMessage } from "node:http";

import { getFirebaseAdminAuth } from "./firebaseAdmin.js";

export interface AdminIdentity {
  uid: string;
  email: string | null;
}

export class AdminAccessError extends Error {
  constructor(
    message: string,
    public readonly statusCode: 401 | 403
  ) {
    super(message);
    this.name = "AdminAccessError";
  }
}

/**
 * Verifica que la solicitud incluya un Firebase ID Token
 * válido y que el usuario tenga el Custom Claim admin=true.
 *
 * No confía en datos de autorización enviados en el body.
 */
export async function requireAdmin(
  request: IncomingMessage
): Promise<AdminIdentity> {
  const authorization = request.headers.authorization;

  if (
    typeof authorization !== "string" ||
    !authorization.startsWith("Bearer ")
  ) {
    throw new AdminAccessError(
      "Se requiere autenticación",
      401
    );
  }

  const token = authorization.slice(7).trim();

  if (!token) {
    throw new AdminAccessError(
      "Token de autenticación vacío",
      401
    );
  }

  const auth = getFirebaseAdminAuth();

  let decodedToken;

  try {
    decodedToken = await auth.verifyIdToken(token, true);
  } catch {
    throw new AdminAccessError(
      "Token inválido o revocado",
      401
    );
  }

  if (decodedToken.admin !== true) {
    throw new AdminAccessError(
      "No tenés permisos de administrador",
      403
    );
  }

  return {
    uid: decodedToken.uid,
    email: decodedToken.email ?? null,
  };
}
