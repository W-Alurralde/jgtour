import {
  createContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import type {
  NewTripItem,
  TripContextValue,
  TripItem,
  TripItemType,
} from "../types/trip.types";

const STORAGE_KEY = "jgtravel-trip";

export const TripContext =
  createContext<TripContextValue | undefined>(
    undefined
  );

interface TripProviderProps {
  children: ReactNode;
}

function loadStoredTrip(): TripItem[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const stored =
      window.localStorage.getItem(
        STORAGE_KEY
      );

    if (!stored) {
      return [];
    }

    const parsed: unknown =
      JSON.parse(stored);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed as TripItem[];
  } catch (error) {
    console.error(
      "No se pudo recuperar Mi Viaje:",
      error
    );

    return [];
  }
}

export function TripProvider({
  children,
}: TripProviderProps) {
  const [items, setItems] =
    useState<TripItem[]>(loadStoredTrip);

  /*
   * Persistimos Mi Viaje cada vez
   * que cambia la selección.
   */
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(items)
      );
    } catch (error) {
      console.error(
        "No se pudo guardar Mi Viaje:",
        error
      );
    }
  }, [items]);

  function addItem(
    item: NewTripItem
  ) {
    setItems((currentItems) => {
      /*
       * No permitimos agregar dos veces
       * el mismo producto del mismo tipo.
       */
      const alreadyExists =
        currentItems.some(
          (currentItem) =>
            currentItem.id === item.id &&
            currentItem.type === item.type
        );

      if (alreadyExists) {
        return currentItems;
      }

      const newItem: TripItem = {
        ...item,
        addedAt:
          new Date().toISOString(),
      };

      return [
        ...currentItems,
        newItem,
      ];
    });
  }

  function removeItem(
    id: string,
    type: TripItemType
  ) {
    setItems((currentItems) =>
      currentItems.filter(
        (item) =>
          !(
            item.id === id &&
            item.type === type
          )
      )
    );
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

  function clearTrip() {
    setItems([]);
  }

  /*
   * Detectamos las monedas presentes
   * en Mi Viaje.
   */
  const currencies = useMemo(
    () =>
      [
        ...new Set(
          items
            .map((item) =>
              item.currency
            )
            .filter(
              (
                currency
              ): currency is string =>
                Boolean(currency)
            )
        ),
      ],
    [items]
  );

  /*
   * Sólo definimos una moneda general
   * cuando todos los precios utilizan
   * la misma moneda.
   */
  const currency =
    currencies.length === 1
      ? currencies[0]
      : null;

  /*
   * Nunca sumamos monedas diferentes.
   */
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

  const value =
    useMemo<TripContextValue>(
      () => ({
        items,
        itemCount,
        total,
        currency,

        addItem,
        removeItem,
        hasItem,
        clearTrip,
      }),
      [
        items,
        itemCount,
        total,
        currency,
      ]
    );

  return (
    <TripContext.Provider
      value={value}
    >
      {children}
    </TripContext.Provider>
  );
}