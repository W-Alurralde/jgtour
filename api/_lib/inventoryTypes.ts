
/**
 * JGTravel - Modelo de inventario turístico
 *
 * Define los tipos compartidos por el backend.
 * No realiza operaciones sobre Firestore.
 */

export type ProductType =
  | "package"
  | "flight"
  | "hotel"
  | "experience"
  | "gastronomy"
  | "transport";

export type InventoryMode =
  | "instant"
  | "on_request";

export type InventoryStatus =
  | "draft"
  | "published"
  | "paused"
  | "archived";

export type SoldOutBehavior =
  | "hide"
  | "sold_out"
  | "inquiry"
  | "waitlist";

export type InventoryBookingStatus =
  | "held"
  | "pending_supplier"
  | "confirmed"
  | "paid"
  | "cancelled"
  | "expired";

export type InventoryMovementType =
  | "hold"
  | "confirm"
  | "release"
  | "cancel"
  | "adjustment";

export interface Inventory {
  inventoryId: string;
  productId: string;
  productType: ProductType;

  // Permite distinguir fechas, salidas o turnos.
  departureId: string;

  mode: InventoryMode;
  status: InventoryStatus;

  // Capacidad total y unidades comprometidas.
  capacityTotal: number;
  held: number;
  confirmed: number;

  // Vigencia comercial.
  saleStartsAt: string;
  saleEndsAt: string;
  visibilityEndsAt: string;

  timezone: string;

  // Configuración de reserva.
  holdMinutes: number;
  soldOutBehavior: SoldOutBehavior;

  createdAt: string;
  updatedAt: string;
}

export interface InventoryBooking {
  bookingId: string;
  userId: string;

  inventoryId: string;
  productId: string;

  travelers: number;
  status: InventoryBookingStatus;

  // Solo se utiliza para bloqueos temporales.
  holdExpiresAt: string | null;

  createdAt: string;
  updatedAt: string;
}

export interface InventoryMovement {
  movementId: string;

  inventoryId: string;
  bookingId: string | null;

  type: InventoryMovementType;
  quantity: number;

  // UID del usuario o identificador del proceso.
  performedBy: string;

  createdAt: string;
}

export interface InventoryAvailability {
  inventoryId: string;

  capacityTotal: number;
  held: number;
  confirmed: number;
  available: number;

  isOnSale: boolean;
  isVisible: boolean;

  canBookInstantly: boolean;
  requiresInquiry: boolean;
}

export const DEFAULT_HOLD_MINUTES = 15;

/**
 * Calcula la disponibilidad a partir de contadores.
 *
 * IMPORTANTE:
 * Este cálculo no reserva plazas.
 * Las operaciones reales deben ejecutarse mediante
 * transacciones de Firestore en el servidor.
 */
export function calculateAvailable(
  inventory: Pick<
    Inventory,
    "capacityTotal" | "held" | "confirmed"
  >
): number {
  return Math.max(
    0,
    inventory.capacityTotal -
      inventory.held -
      inventory.confirmed
  );
}

/**
 * Comprueba si una promoción está vigente.
 *
 * Las fechas deben almacenarse en formato ISO 8601
 * con zona horaria explícita.
 */
export function isInventoryOnSale(
  inventory: Pick<
    Inventory,
    "status" | "saleStartsAt" | "saleEndsAt"
  >,
  now: Date = new Date()
): boolean {
  if (inventory.status !== "published") {
    return false;
  }

  const start = Date.parse(inventory.saleStartsAt);
  const end = Date.parse(inventory.saleEndsAt);
  const current = now.getTime();

  if (
    !Number.isFinite(start) ||
    !Number.isFinite(end)
  ) {
    return false;
  }

  return current >= start && current < end;
}

/**
 * Determina si la oferta debe seguir visible.
 */
export function isInventoryVisible(
  inventory: Pick<
    Inventory,
    "status" | "visibilityEndsAt"
  >,
  now: Date = new Date()
): boolean {
  if (inventory.status !== "published") {
    return false;
  }

  const end = Date.parse(inventory.visibilityEndsAt);

  return Number.isFinite(end) &&
    now.getTime() < end;
}

/**
 * Devuelve el estado comercial del inventario.
 */
export function getInventoryAvailability(
  inventory: Inventory,
  now: Date = new Date()
): InventoryAvailability {
  const available = calculateAvailable(inventory);

  const isOnSale = isInventoryOnSale(
    inventory,
    now
  );

  const isVisible = isInventoryVisible(
    inventory,
    now
  );

  return {
    inventoryId: inventory.inventoryId,

    capacityTotal: inventory.capacityTotal,
    held: inventory.held,
    confirmed: inventory.confirmed,
    available,

    isOnSale,
    isVisible,

    canBookInstantly:
      inventory.mode === "instant" &&
      isOnSale &&
      available > 0,

    requiresInquiry:
      inventory.mode === "on_request" &&
      isOnSale,
  };
}
