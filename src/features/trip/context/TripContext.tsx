
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { AuthContext } from "../../../contexts/AuthContext";

import {
  addTripItem,
  clearStoredTrip,
  removeTripItem,
  subscribeToTrip,
} from "../services/tripFirestoreService";

import type {
  NewTripItem,
  TripContextValue,
  TripItem,
  TripItemType,
  UpdateTripBookingInput,
  TripBooking,
} from "../types/trip.types";

export const TripContext =
  createContext<TripContextValue | undefined>(
    undefined
  );

interface TripProviderProps {
  children: ReactNode;
}

const LEGACY_STORAGE_KEY = "jgtravel-trip";

function bookingStorageKey(uid: string) {
  return `jgtravel-bookings-${uid}`;
}

type BookingReferences = Record<
  string,
  TripBooking
>;

function itemKey(
  id: string,
  type: TripItemType
) {
  return JSON.stringify([type, id]);
}

function loadBookingReferences(
  uid: string
): BookingReferences {
  try {
    const stored = localStorage.getItem(
      bookingStorageKey(uid)
    );

    if (!stored) return {};

    const parsed: unknown = JSON.parse(stored);

    if (
      parsed === null ||
      typeof parsed !== "object" ||
      Array.isArray(parsed)
    ) {
      return {};
    }

    return parsed as BookingReferences;
  } catch {
    return {};
  }
}

export function TripProvider({
  children,
}: TripProviderProps) {
  const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error(
      "TripProvider debe estar dentro de AuthProvider."
    );
  }

  const { user, loading: authLoading } = auth;

  const uid = user?.uid ?? null;

  const [remoteItems, setRemoteItems] =
    useState<TripItem[]>([]);

  const [activeUid, setActiveUid] =
    useState<string | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  const [bookingReferences, setBookingReferences] =
    useState<BookingReferences>({});

  /*
   * Cada sesión utiliza su propio carrito.
   * No recuperamos automáticamente el carrito
   * antiguo porque no estaba asociado a un UID.
   */
  useEffect(() => {
    setRemoteItems([]);
    setActiveUid(null);
    setBookingReferences({});
    setError(null);

    if (authLoading) {
      setLoading(true);
      return;
    }

    if (!uid) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setBookingReferences(
      loadBookingReferences(uid)
    );

    const unsubscribe = subscribeToTrip(
      uid,
      (items) => {
        setRemoteItems(items);
        setActiveUid(uid);
        setLoading(false);
      },
      (snapshotError) => {
        setError(snapshotError.message);
        setLoading(false);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [uid, authLoading]);

  /*
   * Fusionamos servicios de Firestore
   * con referencias locales de reservas.
   */
  const items = useMemo(() => {
    if (!uid || activeUid !== uid) {
      return [];
    }

    return remoteItems.map((item) => {
      const booking = bookingReferences[
        itemKey(item.id, item.type)
      ];

      return booking
        ? { ...item, booking }
        : item;
    });
  }, [
    remoteItems,
    bookingReferences,
    uid,
    activeUid,
  ]);

  function ensureReady(): string | null {
    if (!uid) {
      setError(
        "Iniciá sesión para agregar servicios a Mi Viaje."
      );
      return null;
    }

    if (loading || activeUid !== uid) {
      setError(
        "Esperá a que termine de cargar Mi Viaje."
      );
      return null;
    }

    return uid;
  }

  /*
   * Guarda un servicio en Firestore.
   */
  function addItem(item: NewTripItem) {
    const currentUid = ensureReady();

    if (!currentUid) return;

    setError(null);

    void addTripItem(currentUid, item).catch(
      (operationError: unknown) => {
        setError(
          operationError instanceof Error
            ? operationError.message
            : "No se pudo agregar el servicio."
        );
      }
    );
  }

  /*
   * Elimina un servicio en Firestore.
   */
  function removeItem(
    id: string,
    type: TripItemType
  ) {
    const currentUid = ensureReady();

    if (!currentUid) return;

    setError(null);

    void removeTripItem(
      currentUid,
      id,
      type
    ).catch((operationError: unknown) => {
      setError(
        operationError instanceof Error
          ? operationError.message
          : "No se pudo eliminar el servicio."
      );
    });
  }

  function hasItem(
    id: string,
    type: TripItemType
  ) {
    return items.some(
      (item) =>
        item.id === id &&
        item.type === type
    );
  }

  /*
   * Conserva temporalmente la referencia
   * de la reserva por usuario.
   *
   * El estado no es una fuente confiable:
   * debe verificarse con el backend.
   */
  function updateBooking({
    itemId,
    itemType,
    booking,
  }: UpdateTripBookingInput) {
    if (!uid) return;

    const next = {
      ...loadBookingReferences(uid),
      [itemKey(itemId, itemType)]: booking,
    };

    try {
      localStorage.setItem(
        bookingStorageKey(uid),
        JSON.stringify(next)
      );

      setBookingReferences(next);
    } catch {
      setError(
        "No se pudo guardar la referencia de la reserva."
      );
    }
  }

  /*
   * Vacía el carrito remoto.
   */
  function clearTrip() {
    const currentUid = ensureReady();

    if (!currentUid) return;

    setError(null);

    void clearStoredTrip(currentUid).catch(
      (operationError: unknown) => {
        setError(
          operationError instanceof Error
            ? operationError.message
            : "No se pudo vaciar Mi Viaje."
        );
      }
    );
  }

  const currencies = useMemo(
    () => [
      ...new Set(
        items
          .map((item) => item.currency)
          .filter(
            (currency): currency is string =>
              Boolean(currency)
          )
      ),
    ],
    [items]
  );

  const currency =
    currencies.length === 1
      ? currencies[0]
      : null;

  const total = useMemo(() => {
    if (currencies.length !== 1) {
      return 0;
    }

    return items.reduce(
      (sum, item) =>
        sum + (item.price ?? 0),
      0
    );
  }, [items, currencies]);

  const itemCount = items.length;

  const value = useMemo<TripContextValue>(
    () => ({
      items,
      itemCount,
      total,
      currency,
      loading,
      error,
      addItem,
      removeItem,
      hasItem,
      updateBooking,
      clearTrip,
    }),
    [
      items,
      itemCount,
      total,
      currency,
      loading,
      error,
    ]
  );

  return (
    <TripContext.Provider value={value}>
      {children}
    </TripContext.Provider>
  );
}
