
import { useState } from "react";
import { createCancellation } from "../services/cancellationService";

export default function CancellationSecurityTest() {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  async function runTest() {
    if (loading) return;

    const confirmed = window.confirm(
      "Esta prueba enviará una solicitud de cancelación " +
      "para una reserva de Testing. ¿Continuar?"
    );

    if (!confirmed) return;

    setLoading(true);
    setResult("");

    try {
      const cancellation = await createCancellation({
        bookingId: "cc5a4984-e62b-4598-8108-c3c23e78b9f8",
        itemId: "SALTA001",
        itemType: "package",
        reasonCode: "OTHER",
        reasonDetail: "Prueba de autorización del Usuario B",
      });

      setResult(
        `ATENCIÓN: el servidor aceptó la solicitud ${cancellation.id}`
      );
    } catch (error) {
      setResult(
        error instanceof Error
          ? `Respuesta del servidor: ${error.message}`
          : "Error desconocido"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section>
      <h2>Prueba de seguridad — Testing</h2>

      <p>
        Ejecutar exclusivamente con el Usuario B.
        No utilizar con el titular de la reserva.
      </p>

      <button type="button" onClick={runTest} disabled={loading}>
        {loading ? "Verificando..." : "Probar autorización"}
      </button>

      {result && <p role="status">{result}</p>}
    </section>
  );
}
