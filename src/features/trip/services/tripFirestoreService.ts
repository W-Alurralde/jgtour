
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  runTransaction,
  writeBatch,
  type Unsubscribe,
} from "firebase/firestore";

import { db } from "@/config/firebase";

import type {
  NewTripItem,
  TripItem,
  TripItemType,
} from "../types/trip.types";

const TRIPS_COLLECTION = "trips";
const ITEMS_COLLECTION = "items";
const MAX_ITEMS = 30;

/**
 * Referencia a la subcolección privada
 * del usuario autenticado.
 */
function getItemsCollection(uid: string) {
  if (!uid.trim()) {
    throw new Error("El usuario no está autenticado.");
  }

  return collection(
    db,
    TRIPS_COLLECTION,
    uid,
    ITEMS_COLLECTION,
  );
}

/**
 * Genera un identificador estable por servicio.
 * Evita duplicados del mismo tipo e ID.
 */
function getItemDocId(
  id: string,
  type: TripItemType,
): string {
  return `${type}_${encodeURIComponent(id)}`;
}

/**
 * Elimina propiedades undefined.
 * Firestore no admite estos valores.
 */
function removeUndefined(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(removeUndefined);
  }

  if (value !== null && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value)
        .filter(([, entry]) => entry !== undefined)
        .map(([key, entry]) => [
          key,
          removeUndefined(entry),
        ]),
    );
  }

  return value;
}

/**
 * Excluye booking y conserva únicamente
 * los datos permitidos por las reglas.
 */
function normalizeItem(item: TripItem): TripItem {
  const {
    id,
    type,
    title,
    subtitle,
    price,
    currency,
    image,
    provider,
    details,
    addedAt,
  } = item;

  return removeUndefined({
    id,
    type,
    title,
    subtitle,
    price,
    currency,
    image,
    provider,
    details,
    addedAt,
  }) as TripItem;
}

/**
 * Valida los datos básicos recuperados.
 */
function parseItem(value: unknown): TripItem | null {
  if (value === null || typeof value !== "object") {
    return null;
  }

  const item = value as Record<string, unknown>;

  if (
    typeof item.id !== "string" ||
    typeof item.type !== "string" ||
    typeof item.title !== "string" ||
    typeof item.addedAt !== "string"
  ) {
    return null;
  }

  return item as unknown as TripItem;
}

/**
 * Escucha cambios en tiempo real.
 */
export function subscribeToTrip(
  uid: string,
  onChange: (items: TripItem[]) => void,
  onError: (error: Error) => void,
): Unsubscribe {
  return onSnapshot(
    getItemsCollection(uid),
    (snapshot) => {
      const items = snapshot.docs
        .map((document) =>
          parseItem(document.data()),
        )
        .filter(
          (item): item is TripItem => item !== null,
        )
        .sort((a, b) =>
          a.addedAt.localeCompare(b.addedAt),
        );

      onChange(items);
    },
    onError,
  );
}

/**
 * Agrega un servicio al carrito.
 */
export async function addTripItem(
  uid: string,
  item: NewTripItem,
): Promise<void> {
  const itemsCollection = getItemsCollection(uid);

  const itemReference = doc(
    itemsCollection,
    getItemDocId(item.id, item.type),
  );

  await runTransaction(db, async (transaction) => {
    const snapshot = await transaction.get(itemReference);

    if (snapshot.exists()) {
      return;
    }

    const newItem = normalizeItem({
      ...item,
      addedAt: new Date().toISOString(),
    });

    transaction.set(itemReference, newItem);
  });
}

/**
 * Elimina un servicio del carrito.
 */
export async function removeTripItem(
  uid: string,
  id: string,
  type: TripItemType,
): Promise<void> {
  const itemReference = doc(
    getItemsCollection(uid),
    getItemDocId(id, type),
  );

  await deleteDoc(itemReference);
}

/**
 * Vacía el carrito del usuario.
 */
export async function clearStoredTrip(
  uid: string,
): Promise<void> {
  const snapshot = await getDocs(
    getItemsCollection(uid),
  );

  if (snapshot.empty) {
    return;
  }

  const batch = writeBatch(db);

  snapshot.docs.forEach((document) => {
    batch.delete(document.ref);
  });

  await batch.commit();
}
