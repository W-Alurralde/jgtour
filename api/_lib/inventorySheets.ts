
import type { InventorySheetRow } from "./inventorySync.js";

interface InventoryApiResponse {
  success: boolean;
  inventory?: unknown;
  error?: string;
}

export async function getInventoryFromSheets(): Promise<
  InventorySheetRow[]
> {
  const apiUrl = process.env.GOOGLE_APPS_SCRIPT_URL;
  const serverSecret = process.env.JGTRAVEL_API_SECRET;

  if (!apiUrl || !serverSecret) {
    throw new Error(
      "Falta configurar la conexión privada con Google Apps Script"
    );
  }

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain;charset=utf-8",
    },
    body: JSON.stringify({
      action: "getInventory",
      serverSecret,
    }),
    redirect: "follow",
    cache: "no-store",
    signal: AbortSignal.timeout(15000),
  });

  if (!response.ok) {
    throw new Error(
      `Error HTTP consultando inventario: ${response.status}`
    );
  }

  const result: InventoryApiResponse = await response.json();

  if (!result.success) {
    throw new Error(
      result.error || "No se pudo consultar el inventario"
    );
  }

  if (!Array.isArray(result.inventory)) {
    throw new Error(
      "La respuesta de inventario no tiene un formato válido"
    );
  }

  return result.inventory.map((item, index) => {
    if (
      !item ||
      typeof item !== "object" ||
      Array.isArray(item)
    ) {
      throw new Error(
        `Formato inválido en la fila ${index + 2} de inventory`
      );
    }

    return item as InventorySheetRow;
  });
}
