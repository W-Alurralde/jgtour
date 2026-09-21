import { useState } from "react";
import { AlertTriangle, X } from "lucide-react";
import "./CancellationModal.css";
import {
  CANCELLATION_REASONS,
  createCancellation,
} from "@/features/packages/services/cancellationService";

import type {
  Cancellation,
  CancellationReasonCode,
} from "@/features/packages/services/cancellationService";

import type {
  TripItemType,
} from "@/features/trip/types/trip.types";

interface CancellationModalProps {
  bookingId: string;
  itemId: string;
  itemType: TripItemType;
  onClose: () => void;
  onSuccess: (
    cancellation: Cancellation
  ) => void;
}

export default function CancellationModal({
  bookingId,
  itemId,
  itemType,
  onClose,
  onSuccess,
}: CancellationModalProps) {
  const [reasonCode, setReasonCode] =
    useState<CancellationReasonCode | "">("");

  const [reasonDetail, setReasonDetail] =
    useState("");

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!reasonCode) {
      setError(
        "Seleccioná un motivo para continuar."
      );

      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const cancellation =
        await createCancellation({
          bookingId,
          itemId,
          itemType,
          reasonCode,
          reasonDetail,
        });

      onSuccess(cancellation);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "No se pudo registrar la solicitud de cancelación.";

      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleBackdropClick(
    event: React.MouseEvent<HTMLDivElement>
  ) {
    if (
      event.target === event.currentTarget &&
      !isSubmitting
    ) {
      onClose();
    }
  }

  return (
    <div
      className="cancellation-modal-backdrop"
      role="presentation"
      onMouseDown={handleBackdropClick}
    >
      <section
        className="cancellation-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cancellation-modal-title"
      >
        <button
          type="button"
          className="cancellation-modal-close"
          onClick={onClose}
          disabled={isSubmitting}
          aria-label="Cerrar"
        >
          <X size={20} />
        </button>

        <div className="cancellation-modal-icon">
          <AlertTriangle size={26} />
        </div>

        <div className="cancellation-modal-heading">
          <span>JGTravel</span>

          <h2 id="cancellation-modal-title">
            Solicitar cancelación
          </h2>

          <p>
            Enviaremos tu solicitud para revisión.
            La reserva no se cancelará automáticamente
            hasta que JGTravel o el proveedor confirme
            la gestión.
          </p>
        </div>

        <div className="cancellation-modal-reference">
          <span>Referencia de reserva</span>

          <code>{bookingId}</code>
        </div>

        <form
          className="cancellation-modal-form"
          onSubmit={handleSubmit}
        >
          <label
            className="cancellation-modal-field"
            htmlFor="cancellation-reason"
          >
            <span>
              Motivo de la cancelación
            </span>

            <select
              id="cancellation-reason"
              value={reasonCode}
              onChange={(event) => {
                setReasonCode(
                  event.target.value as
                    | CancellationReasonCode
                    | ""
                );

                setError(null);
              }}
              disabled={isSubmitting}
              required
            >
              <option value="">
                Seleccioná un motivo
              </option>

              {CANCELLATION_REASONS.map(
                (reason) => (
                  <option
                    key={reason.value}
                    value={reason.value}
                  >
                    {reason.label}
                  </option>
                )
              )}
            </select>
          </label>

          <label
            className="cancellation-modal-field"
            htmlFor="cancellation-detail"
          >
            <span>
              Comentario adicional
            </span>

            <textarea
              id="cancellation-detail"
              value={reasonDetail}
              onChange={(event) =>
                setReasonDetail(
                  event.target.value
                )
              }
              placeholder="Contanos brevemente el motivo de la solicitud..."
              rows={4}
              maxLength={500}
              disabled={isSubmitting}
            />

            <small>
              {reasonDetail.length}/500
            </small>
          </label>

          {error && (
            <div
              className="cancellation-modal-error"
              role="alert"
            >
              {error}
            </div>
          )}

          <div className="cancellation-modal-warning">
            <AlertTriangle size={18} />

            <p>
              Enviar esta solicitud no garantiza una
              cancelación inmediata. Pueden aplicarse
              condiciones del servicio o del proveedor.
            </p>
          </div>

          <div className="cancellation-modal-actions">
            <button
              type="button"
              className="cancellation-modal-secondary"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Volver
            </button>

            <button
              type="submit"
              className="cancellation-modal-submit"
              disabled={
                isSubmitting ||
                !reasonCode
              }
            >
              {isSubmitting
                ? "Enviando..."
                : "Solicitar cancelación"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}