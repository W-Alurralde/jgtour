export type TripItemType =
  | "flight"
  | "hotel"
  | "car"
  | "bus"
  | "cruise"
  | "disney"
  | "restaurant"
  | "experience"
  | "package";

export interface TripItem {
  id: string;

  type: TripItemType;

  title: string;

  subtitle?: string;

  price?: number;

  currency?: string;

  image?: string;

  provider?: string;

  details?: Record<string, unknown>;

  addedAt: string;
}

export type NewTripItem =
  Omit<TripItem, "addedAt">;

export interface TripContextValue {
  items: TripItem[];

  itemCount: number;

  total: number;

  currency: string | null;

  addItem: (item: NewTripItem) => void;

  removeItem: (
    id: string,
    type: TripItemType
  ) => void;

  hasItem: (
    id: string,
    type: TripItemType
  ) => boolean;

  clearTrip: () => void;
}