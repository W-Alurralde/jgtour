
import type {
  Inventory,
  InventoryMode,
  InventoryStatus,
  ProductType,
  SoldOutBehavior,
} from "./inventoryTypes.js";

import {
  DEFAULT_HOLD_MINUTES,
} from "./inventoryTypes.js";

/**
 * JGTravel - Preparación de sincronización de inventario.
 *
 * Google Sheets define la configuración comercial.
 * Firestore conserva los contadores operativos.
 *
 * Este módulo valida y prepara datos.
 * NO realiza escrituras en Firestore.
 */

export type InventorySheetRow = Record<string, unknown>;

export interface InventorySyncResult {
  inventory: Inventory;
  operation: "create" | "update";
}

const PRODUCT_TYPES: ProductType[] = [
  "package",
  "flight",
  "hotel",
  "experience",
  "gastronomy",
  "transport",
];

const MODES: InventoryMode[] = [
  "instant",
  "on_request",
];

const STATUSES: InventoryStatus[] = [
  "draft",
  "published",
  "paused",
  "archived",
];

const SOLD_OUT_BEHAVIORS: SoldOutBehavior[] = [
  "hide",
  "sold_out",
  "inquiry",
  "waitlist",
];

function text(value: unknown): string {
  return typeof value === "string"
    ? value.trim()
    : String(value ?? "").trim();
}


function validIsoDate(value: string): boolean {
  const isoPattern =
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/;

  return (
    isoPattern.test(value) &&
    Number.isFinite(Date.parse(value))
  );
}


function requireEnum<T extends string>(
  value: string,
  allowed: readonly T[],
  field: string
): T {
  if (!allowed.includes(value as T)) {
    throw new Error(
      `Valor inválido en ${field}: ${value}`
    );
  }

  return value as T;
}

function nonNegativeInteger(
  value: unknown,
  field: string
): number {
  const raw = text(value);

  if (!/^\d+$/.test(raw)) {
    throw new Error(
      `${field} debe ser un número entero no negativo`
    );
  }

  const number = Number(raw);

  if (!Number.isSafeInteger(number)) {
    throw new Error(
      `${field} supera el rango permitido`
    );
  }

  return number;
}

function positiveInteger(
  value: unknown,
  field: string
): number {
  const number = nonNegativeInteger(value, field);

  if (number === 0) {
    throw new Error(
      `${field} debe ser mayor que cero`
    );
  }

  return number;
}

/**
 * Valida una fila del catálogo comercial.
 *
 * existingInventory representa el documento
 * que ya existe en Firestore, si lo hay.
 *
 * El productId debe verificarse además contra
 * el catálogo de paquetes o productos.
 */
export function prepareInventorySync(
  row: InventorySheetRow,
  existingInventory: Inventory | null,
  validProductIds: ReadonlySet<string>,
  now: Date = new Date()
): InventorySyncResult {
  const inventoryId = text(row.inventoryId);
  const productId = text(row.productId);
  const departureId = text(row.departureId);

  if (!inventoryId || !productId || !departureId) {
    throw new Error(
      "Faltan inventoryId, productId o departureId"
    );
  }

  if (
    inventoryId.includes("/") ||
    inventoryId === "." ||
    inventoryId === ".."
  ) {
    throw new Error("inventoryId inválido");
  }

  if (!validProductIds.has(productId)) {
    throw new Error(
      `El producto ${productId} no existe en el catálogo`
    );
  }

  const productType = requireEnum(
    text(row.productType),
    PRODUCT_TYPES,
    "productType"
  );

  const mode = requireEnum(
    text(row.mode),
    MODES,
    "mode"
  );

  const status = requireEnum(
    text(row.status),
    STATUSES,
    "status"
  );

  const soldOutBehavior = requireEnum(
    text(row.soldOutBehavior),
    SOLD_OUT_BEHAVIORS,
    "soldOutBehavior"
  );

  const capacityTotal = nonNegativeInteger(
    row.capacityTotal,
    "capacityTotal"
  );

  if (mode === "instant" && capacityTotal === 0) {
    throw new Error(
      "El inventario instantáneo necesita capacidad"
    );
  }

  const holdMinutes =
    text(row.holdMinutes) === ""
      ? DEFAULT_HOLD_MINUTES
      : positiveInteger(row.holdMinutes, "holdMinutes");

  if (holdMinutes > 1440) {
    throw new Error(
      "holdMinutes no puede superar 1440"
    );
  }

  const saleStartsAt = text(row.saleStartsAt);
  const saleEndsAt = text(row.saleEndsAt);
  const visibilityEndsAt = text(row.visibilityEndsAt);

  for (const [field, value] of [
    ["saleStartsAt", saleStartsAt],
    ["saleEndsAt", saleEndsAt],
    ["visibilityEndsAt", visibilityEndsAt],
  ]) {
    if (!validIsoDate(value)) {
      throw new Error(
        `${field} debe incluir fecha, hora y zona horaria`
      );
    }
  }

  if (Date.parse(saleStartsAt) >= Date.parse(saleEndsAt)) {
    throw new Error(
      "saleEndsAt debe ser posterior a saleStartsAt"
    );
  }

  if (
    Date.parse(visibilityEndsAt) <
    Date.parse(saleEndsAt)
  ) {
    throw new Error(
      "visibilityEndsAt no puede ser anterior a saleEndsAt"
    );
  }

  const timezone = text(row.timezone);

  try {
    new Intl.DateTimeFormat("es-AR", {
      timeZone: timezone,
    });
  } catch {
    throw new Error("Zona horaria inválida");
  }

  if (
    existingInventory &&
    existingInventory.inventoryId !== inventoryId
  ) {
    throw new Error(
      "El identificador no coincide con el inventario existente"
    );
  }

  if (
    existingInventory &&
    existingInventory.productId !== productId
  ) {
    throw new Error(
      "No se puede cambiar el producto de un inventario existente"
    );
  }

if (
  existingInventory &&
  existingInventory.productType !== productType
) {
  throw new Error(
    "No se puede cambiar el tipo de producto de un inventario existente"
  );
}

  if (
    existingInventory &&
    existingInventory.departureId !== departureId
  ) {
    throw new Error(
      "No se puede cambiar la salida de un inventario existente"
    );
  }

  const held = existingInventory?.held ?? 0;
  const confirmed = existingInventory?.confirmed ?? 0;

  if (
    !Number.isSafeInteger(held) ||
    !Number.isSafeInteger(confirmed) ||
    held < 0 ||
    confirmed < 0
  ) {
    throw new Error(
      "El inventario existente tiene contadores inválidos"
    );
  }

  if (capacityTotal < held + confirmed) {
    throw new Error(
      "La capacidad no puede ser menor que las plazas comprometidas"
    );
  }

  const nowIso = now.toISOString();

  const inventory: Inventory = {
    inventoryId,
    productId,
    productType,
    departureId,

    mode,
    status,

    capacityTotal,

    // Nunca se reinician los contadores existentes.
    held,
    confirmed,

    saleStartsAt,
    saleEndsAt,
    visibilityEndsAt,
    timezone,

    holdMinutes,
    soldOutBehavior,

    createdAt: existingInventory?.createdAt ?? nowIso,
    updatedAt: nowIso,
  };

  return {
    inventory,
    operation: existingInventory
      ? "update"
      : "create",
  };
}

/**
 * Valida un conjunto de filas y detecta IDs duplicados.
 *
 * existingById debe contener los inventarios
 * actuales obtenidos de Firestore.
 *
 * Esta función NO guarda cambios.
 */
export function prepareInventoryBatch(
  rows: InventorySheetRow[],
  existingById: ReadonlyMap<string, Inventory>,
  validProductIds: ReadonlySet<string>,
  now: Date = new Date()
): InventorySyncResult[] {
  const seenIds = new Set<string>();

  return rows.map((row, index) => {
    const inventoryId = text(row.inventoryId);

    if (seenIds.has(inventoryId)) {
      throw new Error(
        `inventoryId duplicado en la fila ${index + 2}: ${inventoryId}`
      );
    }

    seenIds.add(inventoryId);

    try {
      return prepareInventorySync(
        row,
        existingById.get(inventoryId) ?? null,
        validProductIds,
        now
      );
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Error desconocido";

      throw new Error(
        `Error en fila ${index + 2}: ${message}`
      );
    }
  });
}
