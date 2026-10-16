
import {
  getFirestore,
  FieldValue,
  Timestamp,
} from "firebase-admin/firestore";

import {
  getInventoryAvailability,
  DEFAULT_HOLD_MINUTES,
  type Inventory,
  type InventoryBooking,
} from "./inventoryTypes.js";

import { getFirebaseAdminAuth } from "./firebaseAdmin.js";

/**
 * Inicializa Firebase Admin antes de acceder a Firestore.
 * La aplicación Admin se reutiliza entre solicitudes.
 */
function getDb() {
  getFirebaseAdminAuth();
  return getFirestore();
}

type HoldResult = {
  bookingId: string;
  inventoryId: string;
  travelers: number;
  status: "held";
  holdExpiresAt: string;
};

export async function holdInventory(params: {
  bookingId: string;
  inventoryId: string;
  userId: string;
  travelers: number;
}): Promise<HoldResult> {
  const {
    bookingId,
    inventoryId,
    userId,
    travelers,
  } = params;

  if (
    !bookingId ||
    !inventoryId ||
    !userId ||
    !Number.isInteger(travelers) ||
    travelers < 1
  ) {
    throw new Error("Datos de reserva inválidos");
  }

  const db = getDb();

  const inventoryRef = db
    .collection("inventory")
    .doc(inventoryId);

  const bookingRef = db
    .collection("bookings")
    .doc(bookingId);

  const now = new Date();

  const result = await db.runTransaction(
    async (transaction): Promise<HoldResult> => {
      const inventorySnap =
        await transaction.get(inventoryRef);

      const existingBooking =
        await transaction.get(bookingRef);

      if (!inventorySnap.exists) {
        throw new Error("Inventario no encontrado");
      }

      if (existingBooking.exists) {
        throw new Error("La reserva ya existe");
      }

      const inventory =
        inventorySnap.data() as Inventory;

      const availability =
        getInventoryAvailability(inventory, now);

      if (!availability.canBookInstantly) {
        throw new Error(
          "El producto no admite reserva inmediata"
        );
      }

      if (availability.available < travelers) {
        throw new Error(
          "No hay suficientes plazas disponibles"
        );
      }

      const holdMinutes =
        Number.isInteger(inventory.holdMinutes) &&
        inventory.holdMinutes > 0
          ? inventory.holdMinutes
          : DEFAULT_HOLD_MINUTES;

      const holdExpiresAt = new Date(
        now.getTime() + holdMinutes * 60_000
      ).toISOString();

      const booking: InventoryBooking = {
        bookingId,
        userId,
        inventoryId,
        productId: inventory.productId,
        travelers,
        status: "held",
        holdExpiresAt,
        createdAt: now.toISOString(),
        updatedAt: now.toISOString(),
      };

      transaction.update(inventoryRef, {
        held: FieldValue.increment(travelers),
        updatedAt: Timestamp.fromDate(now),
      });

      transaction.create(bookingRef, booking);

      return {
        bookingId,
        inventoryId,
        travelers,
        status: "held",
        holdExpiresAt,
      };
    }
  );

  return result;
}

/**
 * Confirma un bloqueo vigente.
 *
 * Esta operación deberá ser llamada exclusivamente
 * desde un proceso autenticado y autorizado.
 */
export async function confirmInventoryHold(
  bookingId: string
): Promise<void> {
  const db = getDb();
  const bookingRef = db
    .collection("bookings")
    .doc(bookingId);

  await db.runTransaction(async (transaction) => {
    const bookingSnap =
      await transaction.get(bookingRef);

    if (!bookingSnap.exists) {
      throw new Error("Reserva no encontrada");
    }

    const booking =
      bookingSnap.data() as InventoryBooking;

    if (booking.status !== "held") {
      throw new Error(
        "La reserva no tiene un bloqueo vigente"
      );
    }

    if (
      !booking.holdExpiresAt ||
      Date.parse(booking.holdExpiresAt) <= Date.now()
    ) {
      throw new Error("El bloqueo ha vencido");
    }

    const inventoryRef = db
      .collection("inventory")
      .doc(booking.inventoryId);

    const inventorySnap =
      await transaction.get(inventoryRef);

    if (!inventorySnap.exists) {
      throw new Error("Inventario no encontrado");
    }

    transaction.update(inventoryRef, {
      held: FieldValue.increment(-booking.travelers),
      confirmed: FieldValue.increment(booking.travelers),
      updatedAt: FieldValue.serverTimestamp(),
    });

    transaction.update(bookingRef, {
      status: "confirmed",
      holdExpiresAt: null,
      updatedAt: FieldValue.serverTimestamp(),
    });
  });
}

/**
 * Libera un bloqueo todavía retenido.
 *
 * Puede utilizarse cuando:
 * - el cliente cancela antes de confirmar;
 * - vence el plazo;
 * - falla una operación comercial.
 *
 * Debe invocarse desde una API autorizada.
 */
export async function releaseInventoryHold(
  bookingId: string
): Promise<void> {
  const db = getDb();
  const bookingRef = db
    .collection("bookings")
    .doc(bookingId);

  await db.runTransaction(async (transaction) => {
    const bookingSnap =
      await transaction.get(bookingRef);

    if (!bookingSnap.exists) {
      throw new Error("Reserva no encontrada");
    }

    const booking =
      bookingSnap.data() as InventoryBooking;

    if (booking.status !== "held") {
      return;
    }

    const inventoryRef = db
      .collection("inventory")
      .doc(booking.inventoryId);

    const inventorySnap =
      await transaction.get(inventoryRef);

    if (!inventorySnap.exists) {
      throw new Error("Inventario no encontrado");
    }

    transaction.update(inventoryRef, {
      held: FieldValue.increment(-booking.travelers),
      updatedAt: FieldValue.serverTimestamp(),
    });

    transaction.update(bookingRef, {
      status: "expired",
      holdExpiresAt: null,
      updatedAt: FieldValue.serverTimestamp(),
    });
  });
}
