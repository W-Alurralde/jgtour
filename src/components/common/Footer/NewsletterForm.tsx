import { useState, type FormEvent } from "react";
import { Mail, LockKeyhole } from "lucide-react";

import { subscribeNewsletter } from "@/services";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const normalizedEmail = email
      .trim()
      .toLowerCase();

    if (!normalizedEmail) {
      setIsError(true);
      setMessage(
        "Ingresá tu correo electrónico."
      );
      return;
    }

    try {
      setLoading(true);
      setMessage("");
      setIsError(false);

      const result =
        await subscribeNewsletter(
          normalizedEmail
        );

      if (
        result.subscriber?.alreadySubscribed
      ) {
        setMessage(
          "Este correo ya está suscripto a JGTravel."
        );

        setEmail("");
        return;
      }

      setMessage(
        "¡Listo! Te suscribiste a las novedades de JGTravel."
      );

      setEmail("");

    } catch (error) {
      console.error(
        "Error al suscribirse al newsletter:",
        error
      );

      setIsError(true);

      setMessage(
        error instanceof Error
          ? error.message
          : "No pudimos procesar la suscripción."
      );

    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="footer-newsletter-content">
      <div className="footer-newsletter-copy">
        <h2>
          Recibí ofertas y novedades de JGTravel
        </h2>

        <p>
          Inspiración, promociones y consejos para
          tu próximo viaje.
        </p>
      </div>

      <form
        className="footer-newsletter-form"
        onSubmit={handleSubmit}
      >
        <div className="footer-email-row">
          <div className="footer-email-control">
            <Mail
              size={21}
              aria-hidden="true"
            />

            <input
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              placeholder="Tu correo electrónico"
              aria-label="Correo electrónico"
              autoComplete="email"
              disabled={loading}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Enviando..."
              : "Suscribirme"}
          </button>
        </div>

        <div className="footer-newsletter-privacy">
          <LockKeyhole
            size={14}
            aria-hidden="true"
          />

          <span>
            No enviamos spam. Podés cancelar
            cuando quieras.
          </span>
        </div>

        {message && (
          <p
            className={
              isError
                ? "footer-newsletter-message footer-newsletter-message-error"
                : "footer-newsletter-message footer-newsletter-message-success"
            }
            role="status"
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
}