
import { strict as assert } from "node:assert";
import { test } from "node:test";

import { prepareInventoryBatch } from "../api/_lib/inventorySync.js";
import type { Inventory } from "../api/_lib/inventoryTypes.js";

/**
 * JGTravel - Prueba aislada de inventario vacío.
 *
 * No consulta Google Sheets.
 * No consulta Firestore.
 * No modifica reservas.
 */

test("Inventario vacío: no hay operaciones pendientes", () => {
  // Simulamos una hoja inventory sin registros.
  const rows = [];

  // Simulamos una colección Firestore vacía.
  const existingById = new Map<string, Inventory>();

  // Simulamos un catálogo sin productos.
  const validProductIds = new Set<string>();

  const items = prepareInventoryBatch(
    rows,
    existingById,
    validProductIds
  );

  const result = {
    success: true,
    total: items.length,
    create: items.filter(
      (item) => item.operation === "create"
    ).length,
    update: items.filter(
      (item) => item.operation === "update"
    ).length,
    items,
  };

  assert.deepEqual(result, {
    success: true,
    total: 0,
    create: 0,
    update: 0,
    items: [],
  });
});

test("Prepara una promoción de 20 plazas sin guardar datos", () => {
  const rows = [
    {
      inventoryId: "TEST-SALTA-001",
      productId: "SALTA001",
      productType: "package",
      departureId: "SALTA-SALIDA-001",
      mode: "instant",
      status: "published",
      capacityTotal: "20",
      saleStartsAt: "2026-10-16T00:00:00-03:00",
      saleEndsAt: "2026-10-31T23:59:00-03:00",
      visibilityEndsAt: "2026-11-01T23:59:00-03:00",
      timezone: "America/Argentina/Salta",
      holdMinutes: "15",
      soldOutBehavior: "sold_out",
    },
  ];

  const existingById = new Map<string, Inventory>();
  const validProductIds = new Set(["SALTA001"]);

  const items = prepareInventoryBatch(
    rows,
    existingById,
    validProductIds
  );

  assert.equal(items.length, 1);
  assert.equal(items[0].operation, "create");
  assert.equal(items[0].inventory.capacityTotal, 20);
  assert.equal(items[0].inventory.held, 0);
  assert.equal(items[0].inventory.confirmed, 0);
});

test("Rechaza reducir la capacidad por debajo de las plazas comprometidas", () => {
  const now = new Date("2026-10-16T12:00:00-03:00");

  const existingInventory: Inventory = {
    inventoryId: "TEST-SALTA-001",
    productId: "SALTA001",
    productType: "package",
    departureId: "SALTA-SALIDA-001",
    mode: "instant",
    status: "published",
    capacityTotal: 20,
    held: 5,
    confirmed: 10,
    saleStartsAt: "2026-10-16T00:00:00-03:00",
    saleEndsAt: "2026-10-31T23:59:00-03:00",
    visibilityEndsAt: "2026-11-01T23:59:00-03:00",
    timezone: "America/Argentina/Salta",
    holdMinutes: 15,
    soldOutBehavior: "sold_out",
    createdAt: "2026-10-15T12:00:00Z",
    updatedAt: "2026-10-15T12:00:00Z",
  };

  const rows = [
    {
      inventoryId: "TEST-SALTA-001",
      productId: "SALTA001",
      productType: "package",
      departureId: "SALTA-SALIDA-001",
      mode: "instant",
      status: "published",
      capacityTotal: "12",
      saleStartsAt: "2026-10-16T00:00:00-03:00",
      saleEndsAt: "2026-10-31T23:59:00-03:00",
      visibilityEndsAt: "2026-11-01T23:59:00-03:00",
      timezone: "America/Argentina/Salta",
      holdMinutes: "15",
      soldOutBehavior: "sold_out",
    },
  ];

  const existingById = new Map<string, Inventory>([
    ["TEST-SALTA-001", existingInventory],
  ]);

  const validProductIds = new Set(["SALTA001"]);

  assert.throws(
    () =>
      prepareInventoryBatch(
        rows,
        existingById,
        validProductIds,
        now
      ),
    /La capacidad no puede ser menor que las plazas comprometidas/
  );
});

test("Rechaza cambiar el tipo de producto de un inventario existente", () => {
  const existingInventory: Inventory = {
    inventoryId: "TEST-SALTA-001",
    productId: "SALTA001",
    productType: "flight",
    departureId: "SALTA-SALIDA-001",
    mode: "instant",
    status: "published",
    capacityTotal: 20,
    held: 0,
    confirmed: 0,
    saleStartsAt: "2026-10-16T00:00:00-03:00",
    saleEndsAt: "2026-10-31T23:59:00-03:00",
    visibilityEndsAt: "2026-11-01T23:59:00-03:00",
    timezone: "America/Argentina/Salta",
    holdMinutes: 15,
    soldOutBehavior: "sold_out",
    createdAt: "2026-10-15T12:00:00Z",
    updatedAt: "2026-10-15T12:00:00Z",
  };

  const rows = [
    {
      inventoryId: "TEST-SALTA-001",
      productId: "SALTA001",
      productType: "package",
      departureId: "SALTA-SALIDA-001",
      mode: "instant",
      status: "published",
      capacityTotal: "20",
      saleStartsAt: "2026-10-16T00:00:00-03:00",
      saleEndsAt: "2026-10-31T23:59:00-03:00",
      visibilityEndsAt: "2026-11-01T23:59:00-03:00",
      timezone: "America/Argentina/Salta",
      holdMinutes: "15",
      soldOutBehavior: "sold_out",
    },
  ];

  const existingById = new Map<string, Inventory>([
    ["TEST-SALTA-001", existingInventory],
  ]);

  const validProductIds = new Set(["SALTA001"]);

  assert.throws(
    () =>
      prepareInventoryBatch(
        rows,
        existingById,
        validProductIds
      ),
    /No se puede cambiar el tipo de producto/
  );
});
