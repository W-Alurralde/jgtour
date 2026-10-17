import { createHash } from "node:crypto";
import { getFirebaseAdminDb } from "./firebaseAdmin.js";

export type BookingRequestStatus = "processing" | "completed" | "uncertain";

export interface BookingRequestRecord {
  userId: string;
  requestId: string;
  payloadHash: string;
  status: BookingRequestStatus;
  bookingId?: string;
  createdAt: string;
  updatedAt: string;
}

export function hashBookingPayload(payload: Record<string, unknown>): string {
  return createHash("sha256").update(JSON.stringify(payload)).digest("hex");
}

export async function claimBookingRequest(
  userId: string,
  requestId: string,
  payloadHash: string,
): Promise<{
  claimed: boolean;
  record: BookingRequestRecord;
}> {
  const db = getFirebaseAdminDb();

  const ref = db.collection("bookingRequests").doc(`${userId}_${requestId}`);

  return db.runTransaction(async (transaction) => {
    const snapshot = await transaction.get(ref);

    if (snapshot.exists) {
      const existing = snapshot.data() as BookingRequestRecord;

      if (existing.payloadHash !== payloadHash) {
        throw new Error("REQUEST_ID_PAYLOAD_MISMATCH");
      }

      return {
        claimed: false,
        record: existing,
      };
    }

    const now = new Date().toISOString();

    const record: BookingRequestRecord = {
      userId,
      requestId,
      payloadHash,
      status: "processing",
      createdAt: now,
      updatedAt: now,
    };

    transaction.create(ref, record);

    return {
      claimed: true,
      record,
    };
  });
}
export async function completeBookingRequest(
  userId: string,
  requestId: string,
  bookingId: string,
): Promise<void> {
  const db = getFirebaseAdminDb();

  const ref = db.collection("bookingRequests").doc(`${userId}_${requestId}`);

  await db.runTransaction(async (transaction) => {
    const snapshot = await transaction.get(ref);

    if (!snapshot.exists) {
      throw new Error("BOOKING_REQUEST_NOT_FOUND");
    }

    const record = snapshot.data() as BookingRequestRecord;

    if (record.status === "completed" && record.bookingId !== bookingId) {
      throw new Error("BOOKING_ID_CONFLICT");
    }

    transaction.update(ref, {
      status: "completed",
      bookingId,
      updatedAt: new Date().toISOString(),
    });
  });
}
export async function markBookingRequestUncertain(
  userId: string,
  requestId: string,
): Promise<void> {
  const db = getFirebaseAdminDb();

  const ref = db.collection("bookingRequests").doc(`${userId}_${requestId}`);

  await db.runTransaction(async (transaction) => {
    const snapshot = await transaction.get(ref);

    if (!snapshot.exists) {
      throw new Error("BOOKING_REQUEST_NOT_FOUND");
    }

    const record = snapshot.data() as BookingRequestRecord;

    // Nunca retroceder una reserva completada.
    if (record.status === "completed") {
      return;
    }

    if (record.status === "uncertain") {
      return;
    }

    transaction.update(ref, {
      status: "uncertain",
      updatedAt: new Date().toISOString(),
    });
  });
}
