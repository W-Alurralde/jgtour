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

/*
 * Estados posibles de una reserva.
 *
 * pending:
 *   solicitud enviada, esperando verificación.
 *
 * confirmed:
 *   disponibilidad/precio confirmados.
 *
 * paid:
 *   pago acreditado.
 *
 * cancelled:
 *   reserva cancelada.
 */
export type BookingStatus =
  | "pending"
  | "confirmed"
  | "paid"
  | "cancelled";

/*
 * Información de la reserva asociada
 * a un elemento de Mi Viaje.
 */
export interface TripBooking {
  id: string;
  status: BookingStatus;
  createdAt: string;
}

/*
 * Elemento almacenado en Mi Viaje.
 */
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

  /*
   * Solo existe después de enviar
   * correctamente una solicitud.
   */
  booking?: TripBooking;

  addedAt: string;
}

/*
 * Elemento nuevo.
 *
 * addedAt se genera automáticamente
 * dentro de TripContext.
 */
export type NewTripItem =
  Omit<TripItem, "addedAt">;

/*
 * Datos necesarios para asociar una
 * reserva existente a un TripItem.
 */
export interface UpdateTripBookingInput {
  itemId: string;
  itemType: TripItemType;
  booking: TripBooking;
}

/*
 * API pública de TripContext.
 */
export interface TripContextValue {
  items: TripItem[];

  itemCount: number;

  total: number;

  currency: string | null;

  addItem: (
    item: NewTripItem
  ) => void;

  removeItem: (
    id: string,
    type: TripItemType
  ) => void;

  hasItem: (
    id: string,
    type: TripItemType
  ) => boolean;

  /*
   * Actualiza el estado de reserva
   * de un elemento existente.
   */
  updateBooking: (
    input: UpdateTripBookingInput
  ) => void;

  clearTrip: () => void;
}