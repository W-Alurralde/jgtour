
import type {
  VercelRequest,
  VercelResponse,
} from "@vercel/node";

import {
  requireAdmin,
  AdminAccessError,
} from "../../_lib/requireAdmin.js";

import {
  generateInventoryPreview,
} from "../../_lib/inventoryPreview.js";


/**
 * JGTravel - Vista previa administrativa de inventario.
 *
 * GET /api/admin/inventory/preview
 *
 * Requiere Firebase ID Token con admin=true.
 * No realiza escrituras en Firestore ni Google Sheets.
 */
export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");

    return res.status(405).json({
      success: false,
      error: "Método no permitido",
    });
  }

  try {
    // 1. Verificar identidad y permisos.
    await requireAdmin(req);

    // 2. Generar vista previa sin guardar cambios.
    const preview = await generateInventoryPreview();

    // 3. Devolver resultados al administrador.
    return res.status(200).json(preview);

  } catch (error) {
    if (error instanceof AdminAccessError) {
      return res.status(error.statusCode).json({
        success: false,
        error: error.message,
      });
    }

    console.error(
      "[JGTravel] Error generando vista previa de inventario:",
      error
    );

    return res.status(500).json({
      success: false,
      error: "No se pudo generar la vista previa del inventario",
    });
  }
}
