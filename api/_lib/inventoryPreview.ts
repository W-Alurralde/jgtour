
import { getFirestore } from "firebase-admin/firestore";

import { getFirebaseAdminAuth } from "./firebaseAdmin.js";

import { getInventoryFromSheets } from "./inventorySheets.js";

import { getValidPackageIds } from "./inventoryCatalog.js";

import {
  prepareInventoryBatch,
  type InventorySyncResult,
} from "./inventorySync.js";

import type { Inventory } from "./inventoryTypes.js";

export interface InventoryPreview {
  success: true;
  total: number;
  create: number;
  update: number;
  items: InventorySyncResult[];
}

/**
 * JGTravel - Vista previa de sincronización.
 *
 * Consulta Sheets, catálogo y Firestore.
 * NO realiza escrituras.
 *
 * Primera etapa: únicamente paquetes turísticos.
 */
export async function generateInventoryPreview(): Promise<InventoryPreview> {
  // 1. Consultar catálogo e inventario comercial.
  const [validProductIds, rows] = await Promise.all([
    getValidPackageIds(),
    getInventoryFromSheets(),
  ]);

  // 2. Restringir temporalmente a paquetes.
  for (const [index, row] of rows.entries()) {
    if (String(row.productType ?? "").trim() !== "package") {
      throw new Error(
        `Fila ${index + 2}: por ahora solo se admite productType="package"`
      );
    }
  }

  // 3. Inicializar Firebase Admin.
  getFirebaseAdminAuth();

  const db = getFirestore();

  // 4. Leer inventarios operativos existentes.
  const snapshot = await db.collection("inventory").get();

  const existingById = new Map<string, Inventory>();

  snapshot.forEach((doc) => {
    const data = doc.data() as Inventory;

    existingById.set(doc.id, {
      ...data,
      inventoryId: doc.id,
    });
  });

  // 5. Validar y preparar operaciones.
  const items = prepareInventoryBatch(
    rows,
    existingById,
    validProductIds
  );

  // 6. Resumir resultados.
  const create = items.filter(
    (item) => item.operation === "create"
  ).length;

  const update = items.filter(
    (item) => item.operation === "update"
  ).length;

  return {
    success: true,
    total: items.length,
    create,
    update,
    items,
  };
}
